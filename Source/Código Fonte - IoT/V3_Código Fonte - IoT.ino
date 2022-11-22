#include <Wire.h>
#include <WiFi.h>
#include <MFRC522.h>
#include <SPI.h>
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

void onFtmReport(arduino_event_t *event) {
  const char * status_str[5] = {"SUCCESS", "UNSUPPORTED", "CONF_REJECTED", "NO_RESPONSE", "FAIL"}; // As possibilidades do status do FTM
  wifi_event_ftm_report_t * report = &event->event_info.wifi_ftm_report; //Definindo o status do relatório global

  ftmSuccess = report->status == FTM_STATUS_SUCCESS;
  if (ftmSuccess) {
    //Em caso de sucesso, haverá o cálculo em metros da distância entre esp
    Serial.printf("FTM Estimate: Distance: %.2f m, Return Time: %u ns\n", (float)report->dist_est / 100.0 - 39.8, report->rtt_est); // Cálculo da distância.
    // Ponteiro para Relatório FTM com múltiplas entradas, vai ser liberado após o uso
    free(report->ftm_report_data);
  } else {
    Serial.print("FTM Error: "); // Em caso de não sucesso, haverá mensagem de Error
    Serial.println(status_str[report->status]);
    digitalWrite(led_red, HIGH);//PISCARÁ LED VERMELHO QUANDO NÃO CONECTAR
    delay(50);
    digitalWrite(led_red, LOW);//PISCARÁ LED VERMELHO QUANDO NÃO CONECTAR
    delay(50);

  }

  xSemaphoreGive(ftmSemaphore); //Sinal de que o relatório foi recebido
}

// Booleano que inicia sessão do FTM e espera pelo Relatório FTM
void getFtmReport(){
  if(!WiFi.initiateFTM(FTM_FRAME_COUNT, FTM_BURST_PERIOD)){
    Serial.println("FTM Error: Initiate Session Failed");
    // return false; // Em caso de não sucesso, irá retornar Error
    // Serial.println(status_str[report->status]);
    digitalWrite(led_red, HIGH);//PISCARÁ LED VERMELHO QUANDO NÃO CONECTAR
    delay(50);
    digitalWrite(led_red, LOW);//PISCARÁ LED VERMELHO QUANDO NÃO CONECTAR
    delay(50);
  }
  else{
    xSemaphoreTake(ftmSemaphore, portMAX_DELAY) == pdPASS && ftmSuccess;
  }//Em caso de sucesso irá aguardar o sinal de que o relatório foi recebido e retornar o verdadeiro.
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

    //
    void listI2CPorts(){
      Serial.println("\nI2C Scanner");
      byte error, address;
      int nDevices;
      Serial.println("Scanning...");
      nDevices = 0;
      for(address = 1; address < 127; address++ ) {
        Wire.beginTransmission(address);
        error = Wire.endTransmission();
        if (error == 0) {
          Serial.print("I2C device found at address 0x");
          if (address<16) {
            Serial.print("0");
          }
          Serial.println(address,HEX);
          nDevices++;
        }
        else if (error==4) {
          Serial.print("Unknow error at address 0x");
          if (address<16) {
            Serial.print("0");
          }
          Serial.println(address,HEX);
        }
      }
      
      if (nDevices == 0) {
        Serial.println("No I2C devices found\n");
      }
      else {
        Serial.println("done\n");
      }
    };
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
  ftmSemaphore = xSemaphoreCreateBinary();
  // Listen for FTM Report events
  WiFi.onEvent(onFtmReport, ARDUINO_EVENT_WIFI_FTM_REPORT);
  // Conecta ao AP que tem FTM Habilitado
  Serial.println("Connecting to FTM Responder");

  WiFi.begin("Rede_quarteto", "Rede_quarteto4"); // login e senha conforme o esp
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
      digitalWrite(led_red, HIGH);
      delay(80);
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
  // Solicita relatórios FTM até que um falhe
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