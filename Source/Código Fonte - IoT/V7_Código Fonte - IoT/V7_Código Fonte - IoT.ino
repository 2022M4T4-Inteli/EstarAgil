// Bibliotecas importadas
#include <Wire.h>
#include <WiFi.h>
#include <MFRC522.h>
#include <SPI.h>
#include <HTTPClient.h>
#include <Arduino_JSON.h>

// Definindo as entradas
#define RFID_SS_SDA 21 // pin SDA do RFID
#define RFID_RST 14  // pin RST do RFID

// Definindo os leds e buzzer
#define led_blue 2 // pin do led azul
#define led_green 5 // pin do led verde
#define buzzer 18 // pin do buzzer
#define led_red 7 // pin do led vermelho
#define prism 666 // constante para o código do prisma

// Variaveis para receber valores dados pelo FTM
float distance; // variável para armazenar a distância medida pelo FTM
float estimateOrder; // variável para armazenar o tempo estimado para chegar até o objeto
int counter = 0; // variável que irá contar o número de leituras no RFID

char *rfid_code; // ponteiro para o código RFID lido pelo RFID

float i = 0; // Contador de tempo a cada 3 segundos

float index3; // Index da função count

// Transformar em JSON os valores recibidos por readJson
JSONVar readJson; // variável para armazenar o JSON recebido

// Estabelecendo conexões
const char *ssid = "Inteli-COLLEGE"; // SSID da rede WiFi para se conectar à API
const char *password = "QazWsx@123"; // senha da rede WiFi para se conectar à API
const char *serverName = "http://10.128.64.129:4005/api/addService"; // endereço da API

// const char *ssid = "SHARE-RESIDENTE";
// const char *password = "Share@residente";
// const char *serverName = "http://10.254.17.106:4005/api/addService";

const char *ssidFTM = "Rede_quarteto"; // SSID da rede WiFi para se conectar ao FTM
const char *passwordFTM = "Rede_quarteto4"; // senha da rede WiFi para se conectar ao FTM

// Funcao para conectar com a API
void apiConnect(const char *ssid, const char *password, const char *serverName, int prismCode, float distanceOrder, float estimateOrder, char *rfid_code,const char *ssidFTM, const char *passwordFTM){

  WiFi.disconnect();
  delay(3000);
  
  //Iniciando o WIFI Local
  WiFi.begin(ssid,password);
  Serial.print("Connecting to WiFi API");

  //Recebendo status enquanto estiver conectando
  while(WiFi.status() != WL_CONNECTED){
    Serial.print(".");
    delay(1000);
  }
  
  delay(3000);
  //Visualizando o status da conexecao e IP do wifi
  Serial.print("\Connected to WiFi ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  
  //Se o Wifi conectar criar o cliente para conectar com nossa API
  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;

    //Conectar URL
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");

    //JSON que serao enviados
    readJson["status"] = "ativo";
    readJson["estimate_time"] = estimateOrder;
    readJson["prism"]= prismCode;
    readJson["fk_rfid_code"]= rfid_code;
    readJson["distance"] = distanceOrder;
    
    //Transformar em um objeto json com todas informacoes lidas
    String httpRequestData = JSON.stringify(readJson);

    //Utilizar o metodo post no servidor
    int httpResponseCode = http.POST(httpRequestData);

    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    //Finalizar conexao
    http.end();
    delay(500);
    //Conecta com o Wi-Fi que mede distancia
    Serial.println("Connecting to FTM");

    WiFi.disconnect();
    
    delay(3000);

    WiFi.begin(ssidFTM, passwordFTM);
  }
  
}

int iniciar = 0;

MFRC522 rfidBase = MFRC522(RFID_SS_SDA, RFID_RST);

// Organizando a configuração da conexão WiFi
// Número de quadros FTM solicitados em termos de 4 ou 8 rajadas (valores permitidos - 0 (sem pref), 16, 24, 32, 64)
const uint8_t FTM_FRAME_COUNT = 16; // Período de tempo solicitado entre rajadas FTM consecutivas em 100 milissegundos (valores permitidos - 0 (sem pref) ou 2-255)

const uint16_t FTM_BURST_PERIOD = 2; // Sinalizador o relatório FTM recebido

xSemaphoreHandle ftmSemaphore; // Status do FTM recebido

bool ftmSuccess = true; // Manipulador de relatório FTM com os dados calculados da viagem de ida e volta


void onFtmReport(arduino_event_t *event) {
  const char * status_str[5] = {"SUCCESS", "UNSUPPORTED", "CONF_REJECTED", "NO_RESPONSE", "FAIL"}; // As possibilidades do status do FTM
  wifi_event_ftm_report_t * report = &event->event_info.wifi_ftm_report; //Definindo o status do relatório global

  ftmSuccess = report->status == FTM_STATUS_SUCCESS;
  if (ftmSuccess) {
    //Em caso de sucesso, haverá o cálculo em metros da distância entre esp
    distance = (float)report->dist_est / 100.0 - 39.8;

    Serial.printf("Distância Estimada: %.2f m, Tempo de Resposta: %u ns\n", distance , report->rtt_est);// Cálculo da distância.
    
    estimateOrder = (float)(report->dist_est / 100.0 - 39.8) / 2.7;
    
    // O veículo a 10km/h divido por 3,6 demonstra 2,7 m/s
    
    Serial.println(estimateOrder); //Transformando distância em tempos estimado por m/s.
    

    // Ponteiro para Relatório FTM com múltiplas entradas, vai ser liberado após o uso.
    delay(3000);
   // free(report->ftm_report_data);
  }

  else {
    Serial.print("FTM Error: "); // Em caso de não sucesso, haverá mensagem de Error
    Serial.println(status_str[report->status]);
    delay(1000);
    
    Serial.println(" ");
    Serial.println("---------------------");
    Serial.println("WiFi foi desconectado");
    Serial.println("---------------------");
    Serial.println(" ");
    
    digitalWrite(led_red, HIGH);//PISCARÁ LED VERMELHO QUANDO NÃO CONECTAR
    delay(50);
    tone(buzzer, 1000, 100); //toca quando não conectado no Wifi
    delay(1000);
    digitalWrite(led_red, LOW);//PISCARÁ LED VERMELHO QUANDO NÃO CONECTAR
    delay(50);
}

  xSemaphoreGive(ftmSemaphore); //Sinal de que o relatório foi recebido
}

// Função que inicia sessão do FTM e espera pelo Relatório FTM. Para saber se o ESP está conectado no WiFi
void getFtmReport(){
  if(WiFi.initiateFTM(FTM_FRAME_COUNT, FTM_BURST_PERIOD)){
    xSemaphoreTake(ftmSemaphore, portMAX_DELAY);
  }

  else if(WiFi.begin("Rede_quarteto","Rede_quarteto4") != WL_CONNECTED) {//Verifica se existe alguma conexão
    ftmSemaphore = xSemaphoreCreateBinary();
    // Listen for FTM Report events
    WiFi.onEvent(onFtmReport, ARDUINO_EVENT_WIFI_FTM_REPORT);
    // Conecta ao AP que tem FTM Habilitado
  }

  if(WiFi.begin() != WL_CONNECTED){ 
    Serial.println("Error ao iniciar sessão");
    delay(1000);

    digitalWrite(led_red, HIGH);//PISCARÁ LED VERMELHO QUANDO NÃO CONECTAR
    delay(25);
    digitalWrite(led_red, LOW);//PISCARÁ LED VERMELHO QUANDO NÃO CONECTAR
    delay(25);

  } //Em caso de sucesso irá aguardar o sinal de que o relatório foi recebido e retornar o verdadeiro.
  
  if(counter == 1){
    i++;
    delay(3000);
  }

  //Verificar contagem de leituras do rfid e tempo no serial
  Serial.print("i = ");
  Serial.println(i);
  Serial.print("counter = ");
  Serial.println(counter);
}

//Término das funções para reconhecer o Wifi.

//Começando a escrever o código para reocnhecer e ler o RFID.
class LeitorRFID{
  private:
    char codigoRFIDLido[100] = ""; //Observa o código do RFID
    char codigoRFIDEsperado[100] = ""; //Observa o código do RFID
    MFRC522 *rfid = NULL;
    int cartaoDetectado = 0;
    int cartaoJaLido = 0;

    void processaCodigoLido(){ //Código para processar o código lido 
      char codigo[3*rfid->uid.size+1];
      codigo[0] = 0;
      char temp[10];
      
      for(int i=0; i < rfid->uid.size; i++){
        sprintf(temp,"%X",rfid->uid.uidByte[i]);
        strcat(codigo,temp);
      }

      codigo[3*rfid->uid.size+1] = 0;
      strcpy(codigoRFIDLido,codigo);
      Serial.println(codigoRFIDLido);
    }

  public:
    LeitorRFID(MFRC522 *leitor){
      rfid = leitor;
      rfid->PCD_Init();
      Serial.printf("MOSI: %i MISO: %i SCK: %i SS: %i\n",MOSI,MISO,SCK,SS); //buscando as portas da MOSI, MISO, SCK e SS/SDA; Depois de encontradas 
    };
    char *tipoCartao(){
      MFRC522::PICC_Type piccType = rfid->PICC_GetType(rfid->uid.sak);
      Serial.println(rfid->PICC_GetTypeName(piccType));
      return((char *)rfid->PICC_GetTypeName(piccType));
    };

    int cartaoPresente(){
      return(cartaoDetectado);
    };

    int cartaoFoiLido(){
      return(cartaoJaLido);
    };
    
    void leCartao(){
      if (rfid->PICC_IsNewCardPresent()) { //definindo o novo cartão presente
        iniciar = 7;
        Serial.println("Cartao presente"); //Será printado no console
          while (iniciar != 0){ //piscará o led verde ao aproximar o cartão
            digitalWrite(led_green, HIGH);
            delay(50);
            digitalWrite(led_green, LOW);
            delay(50);
            iniciar -= 1;
          }
        cartaoDetectado = 1;
        if (rfid->PICC_ReadCardSerial()) { // NUID has been readed
          Serial.println("Cartao lido"); //Será printado no console
          digitalWrite(led_green, HIGH);
          cartaoJaLido = 1;

          processaCodigoLido();
          rfid->PICC_HaltA(); // halt PICC
          rfid->PCD_StopCrypto1(); // stop encryption on PCD
          tone(buzzer, 5000, 1200);
          delay(1000);
        }

      }else{
        cartaoDetectado = 0;
        iniciar = 10;
        digitalWrite(led_green, LOW);
      }

    };

    //código do cartão lido
    char *cartaoLido(){
      return(codigoRFIDLido);
    };

    //resetando a leitura
    void resetarLeitura(){
      cartaoDetectado = 0;
      cartaoJaLido = 0;
      iniciar = 10;
    }
};
LeitorRFID *leitor = NULL;
//////////////////////////////

//setup de definição de entrada e saída
void setup() {

  Serial.begin(115200);
  SPI.begin();
  pinMode(led_blue, OUTPUT);
  pinMode(led_green, OUTPUT);
  pinMode(buzzer, OUTPUT);
  pinMode(led_red, OUTPUT);
  digitalWrite(led_blue, HIGH);

  leitor = new LeitorRFID(&rfidBase);

  // Criar semáforo binário (inicializado obtido e pode ser obtido/fornecido de qualquer thread/ISR)

  //caso o ESP encontre a rede WiFi Rede_quarteto, ele se conecta e imprime a distância.
  if(WiFi.status() !=WL_CONNECTED){
    ftmSemaphore = xSemaphoreCreateBinary();
    // Listen for FTM Report events
    WiFi.onEvent(onFtmReport, ARDUINO_EVENT_WIFI_FTM_REPORT);
    // Conecta ao AP que tem FTM Habilitado
    Serial.println("Buscando Rede_quarteto");

    WiFi.begin("Rede_quarteto", "Rede_quarteto4"); // login e senha conforme o esp
  }
  //Se não, o ESP procura a rede estaparado, e se conecta e imprime a distância.
  else{
    getFtmReport();
  }

  while (WiFi.status() != WL_CONNECTED) {
  delay(500);
  Serial.print(".");
  digitalWrite(led_red, HIGH);
  delay(80);
  tone(buzzer, 1000, 100); //toca quando não conectado no Wifi
  delay(1000);
  digitalWrite(led_red, LOW);
  delay(80);
  } // caso o wi-fi não esteja conectado irá iniciar esse loop

  Serial.println("");
  Serial.println("WiFi Connected");
  Serial.print("Initiating FTM session with Frame Count ");
  Serial.print(FTM_FRAME_COUNT);
  Serial.print(" and Burst Period ");
  Serial.print(FTM_BURST_PERIOD * 100);
  Serial.println(" ms");
}
void loop() {
  //verificação da leitura de cartão
  leitor->leCartao();

  // leitor irá ler o cartão e quantas leituras realizadas nessa situação o carro está sendo pego para estacionar
  if(leitor->cartaoFoiLido() && counter == 0){
    counter++; // adicionar que foi lido uma vez
    Serial.println(leitor->tipoCartao()); // verificar tipo do cartão
    Serial.println(leitor->cartaoLido()); // verificar código do cartão lido
    leitor->cartaoLido(); // ler cartão
    leitor->resetarLeitura(); // resetar leitura
    delay(3000); // tempo para conectar e desconectar
  }
  // nessa situação o carro irá estar estacionado
  else if (leitor -> cartaoFoiLido() && counter == 1){
    counter++; // adicionar que foi lido uma vez
    float index3 = i; // salvar tempo em uma váriavel 
    rfid_code = leitor->cartaoLido(); // salvar código do rfid
    apiConnect(ssid,password,serverName,prism,distance,index3,rfid_code,ssidFTM,passwordFTM); // chamar função que conecta na api
    i = 0; // zerar a contagem, pois encerra o ciclo
    leitor->resetarLeitura();
    delay(3000); // tempo para conectar e desconectar
  }
  // nessa situação o carro irá ser devolvido
  else if (leitor -> cartaoFoiLido() && counter == 2){
    Serial.println(leitor->tipoCartao()); // verificar tipo do cartão
    Serial.println(leitor->cartaoLido()); // verificar código do cartão lido
    rfid_code = leitor->cartaoLido(); // salvar o código do rfid
    apiConnect(ssid,password,serverName,prism,distance,estimateOrder,rfid_code,ssidFTM,passwordFTM); // chamar função que conecta na api
    leitor->resetarLeitura(); // resetar leitura
    delay(3000); // tempo para conectar e desconectar
    counter = 0; // zerar a quantidade de leitura pelo encerramento do ciclo
  }

  // loop de verificação da distância do Wifi e tempo estimado
  getFtmReport();
  delay(200);
}