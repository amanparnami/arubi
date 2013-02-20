#include "SPI.h"
#include "WiFly.h"

#include "Credentials.h"

Client client("192.168.1.4", 80);

int pinOn = 3;
int pinOff = 2;
boolean lightOn = false;
// the setup routine runs once when you press reset:
void setup() 
{                
  // initialize the digital pin as an output.
  pinMode(pinOn, OUTPUT);     
  pinMode(pinOff, OUTPUT);
  Serial.begin(9600);

  WiFly.begin();

  if (!WiFly.join(ssid, passphrase)) {
    Serial.println("Association failed.");
    while (1) {
      // Hang on failure.
    }
  }  

  Serial.println("connecting...");


  //  if (client.connect()) {
  //    Serial.println("connected");
  //    client.println("GET /testconnection.php?sender=arduino&arg=0 HTTP/1.0");
  //    client.println();
  //  } 
  //  else {
  //    Serial.println("connection failed");
  //  }

}

uint32_t timeLastUpdated;
int count = 0;
void loop() 
{
  if (millis() - timeLastUpdated > TIMETOUPDATE)
  {  
    timeLastUpdated = millis();
    if (client.connect()) 
    {
//      Serial.println("connected");
      client.println("GET /server/www/arubi.php?sender=arduino&arg=0 HTTP/1.0");
      client.println();
      String mainStr = "";
      String str = "";

      delay(2000);
      while (client.connected()) 
      {
        if(client.available())
        {
          char c = client.read();
          if(c == '\n')
          {
            mainStr += str + "\n";
            str = "";
            //            Serial.println(str);
            if(str.indexOf("light") != -1)
              break;
          }
          else
          {   
            str += c;
          } 
        }
      }

      Serial.println(str);
      if(str == "lightsOn")
        lightsOn();
      else if(str == "lightsOff")
        lightsOff();
    } 
    else {
      Serial.println("connection failed");
    }
    if (client.connected()) {
      Serial.println("disconnecting.");
      client.stop();
      Serial.println("disconnected.");
    }
  }
}

// turn the lights on
void lightsOn()
{  
  digitalWrite(pinOff, LOW); 
  delay(100);
  digitalWrite(pinOn, HIGH);
  delay(200);
  digitalWrite(pinOn, LOW);
}

// turn the lights off
void lightsOff()
{
  digitalWrite(pinOn, LOW); 
  delay(100);
  digitalWrite(pinOff, HIGH);
  delay(200);
  digitalWrite(pinOff, LOW);
}

