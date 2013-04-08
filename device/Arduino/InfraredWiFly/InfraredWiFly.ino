#include <SPI.h>
#include <WiFly.h>
#include <IRremote.h>

IRsend irsend;

long powerOn = 0xC1AA09F6;
long powerOff = 0xC1AA09F6;
long sourceComp = 0xC1AA29D6;
long sourceSvideo = 0xC1AAE916;
long sourceVideo = 0xC1AA6996;
long sourceSearch = 0xC1AA31CE;
long buttonUp = 0xC1AA0DF2;
long buttonDown = 0xC1AA4DB2;
long buttonRight = 0xC1AA8D72;
long buttonLeft = 0xC1AACD32;
long buttonMute = 0xC1AAC936;
long buttonMenu = 0xC1AA59A6;
long remoteCodes[12] = {
  powerOn, powerOff, sourceComp, sourceSvideo, sourceVideo, sourceSearch, buttonUp, buttonDown, buttonRight, buttonLeft, buttonMute, buttonMenu}; 

char ssid[] = "WiFly";

byte server[] = { 
  66, 249, 89, 104 };

WiFlyClient client("google.com", 80);

void setup() 
{

  Serial.begin(115200);
  Serial.println("WebClient example at 38400 baud.");

  WiFly.begin();

  if (!WiFly.join(ssid)) {
    Serial.println("Association failed.");
    while (1) {
      // Hang on failure.
    }
  }  

  Serial.println("connecting...");

  if (client.connect()) {
    Serial.println("connected");
    //    client.println("GET /search?q=arduino HTTP/1.1");
    //    client.println();
  } 
  else 
  {
    Serial.println("connection failed");
  }

}

int count = 0;

void loop() 
{
  irsend.sendNEC(powerOn,38);
  delay(1000);  
  
//  if (client.available()) {
//    char c = client.read();
//    Serial.print(c);
//    count++;
//    if (count > 80) {
//      count = 0;
//      Serial.println();
//    }
//  }
//
//  if (!client.connected()) {
//    Serial.println();
//    Serial.println("disconnecting.");
//    client.stop();
//    for(;;)
//      ;
//  }
}



