#include "WiFi.h"
// Change the SSID and PASSWORD here if needed
const char * WIFI_FTM_SSID = "Rede_quarteto"; //determinando login da rede
const char * WIFI_FTM_PASS = "Rede_quarteto4"; //senha da rede
void setup(){
  Serial.begin(115200);
  Serial.println("Starting SoftAP with FTM Responder support");
  // Enable AP with FTM support (last argument is 'true')
  WiFi.softAP(WIFI_FTM_SSID, WIFI_FTM_PASS, 1, 0, 4, true);
}
void loop(){
  delay(1000);
}