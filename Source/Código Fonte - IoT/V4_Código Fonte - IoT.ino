#include <Wire.h>
#include <WiFi.h>
#include <MFRC522.h>
#include <SPI.h>
#include <ThingSpeak.h>


// bibliotecas importadas

#define RFID_SS_SDA 21
#define RFID_RST 14 // definindo as entradas

#define led_blue 2
#define led_green 5
#define buzzer 18
#define led_red 7
// definindo os leds e buzzer

int iniciar = 0;

MFRC522 rfidBase = MFRC522(RFID_SS_SDA, RFID_RST);

// Organizando a configuração da conexão WiFi
// Número de quadros FTM solicitados em termos de 4 ou 8 rajadas (valores permitidos - 0 (sem pref), 16, 24, 32, 64)
const uint8_t FTM_FRAME_COUNT = 16; // Período de tempo solicitado entre rajadas FTM consecutivas em 100 milissegundos (valores permitidos - 0 (sem pref) ou 2-255)

const uint16_t FTM_BURST_PERIOD = 2; // Sinalizador o relatório FTM recebido

xSemaphoreHandle ftmSemaphore; // Status do FTM recebido

bool ftmSuccess = true; // Manipulador de relatório FTM com os dados calculados da viagem de ida e volta

float distancia = 0;


void onFtmReport(arduino_event_t *event) {
  const char * status_str[5] = {"SUCCESS", "UNSUPPORTED", "CONF_REJECTED", "NO_RESPONSE", "FAIL"}; // As possibilidades do status do FTM
  wifi_event_ftm_report_t * report = &event->event_info.wifi_ftm_report; //Definindo o status do relatório global

  ftmSuccess = report->status == FTM_STATUS_SUCCESS;
  if (ftmSuccess) {
    //Em caso de sucesso, haverá o cálculo em metros da distância entre esp
    Serial.printf("Distância Estimada: %.2f m, Tempo de Resposta: %u ns\n", (float)report->dist_est / 100.0 - 39.8, report->rtt_est);// Cálculo da distância.
    // distancia = (float)report->dist_est / 100.0 - 39.8, report->rtt_est);

    // Serial.println((float)(report->dist_est / 100.0 - 39.8) / 2.7); //Transformando distância em tempos estimado por m/s.
      
      if (((float)(report->dist_est / 100.0 - 39.8) / 2.7) < 0.30){
        Serial.println("veículo parado");
      }

      else if(((float)(report->dist_est / 100.0 - 39.8) / 2.7) > 0) {
        Serial.println((float)(report->dist_est / 100.0 - 39.8) / 2.7);
    }
    
    // Ponteiro para Relatório FTM com múltiplas entradas, vai ser liberado após o uso.
    delay(3000);
    free(report->ftm_report_data);

    // se a velocidade for menor que if((float)(report->dist_est / 100.0 - 39.8) / 2.7) > 2, pede para o esp parar, talvez com o break.
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
  }

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

  if(leitor->cartaoFoiLido()){
    Serial.println(leitor->tipoCartao());
    Serial.println(leitor->cartaoLido());
    
    leitor->resetarLeitura();
    delay(3000);
  }
  // loop de verificação da distância do Wifi
  getFtmReport();
  delay(200);


}