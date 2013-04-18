/*
 * Web Server
 *
 * (Based on Ethernet's WebServer Example)
 *
 * A simple web server that shows the value of the analog input pins.
 */

#include <SPI.h>
#include <WiFly.h>
#include "Credentials.h"

WiFlyServer server(80);

// Initialize the message string
String messageStr;

int pinOn = 3;
int pinOff = 2;

void setup() {
  
  pinMode(pinOn, OUTPUT);     
  pinMode(pinOff, OUTPUT);
  
  WiFly.begin();

  if (!WiFly.join(ssid)) {
    while (1) {
      // Hang on failure.
    }
  }

  Serial.begin(9600);
  Serial.print("IP: ");
  Serial.println(WiFly.ip());
  
  server.begin();
}

void loop() 
{  
  WiFlyClient client = server.available();
  if (client) 
  {
    // an http request ends with a blank line
    boolean current_line_is_blank = true;

    messageStr = "";
    String tempStr = "";
    
    while (client.connected()) 
    {
      if (client.available()) 
      {
        char c = client.read();
        // if we've gotten to the end of the line (received a newline
        // character) and the line is blank, the http request has ended,
        // so we can send a reply

        tempStr += c;
        //Serial.write(c);

        if (tempStr.indexOf("GET /?command=") != -1 && c == '\n')
        {
          int commandIdx, httpIdx;

          messageStr = tempStr;
          tempStr="";
          //Serial.println(messageStr);

          commandIdx = messageStr.indexOf("=");
          httpIdx = messageStr.indexOf("HTTP");
          messageStr = messageStr.substring(commandIdx+1, httpIdx-1);
          Serial.println(messageStr);
          //Serial.println(messageStr.length());
        }
        
        if (c == '\n' && current_line_is_blank) {
          // send a standard http response header
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/html");
          client.println();
          
//          // output the value of each analog input pin
//          for (int i = 0; i < 6; i++) {
//            client.print("analog input ");
//            client.print(i);
//            client.print(" is ");
//            client.print(analogRead(i));
//            client.println("<br />");
//          }
          break;
        }
        
        if (c == '\n') 
        {
          // we're starting a new line
          current_line_is_blank = true;
        } 
        else if (c != '\r') 
        {
          // we've gotten a character on the current line
          current_line_is_blank = false;
        }
      }
    }
  
    // give the web browser time to receive the data
    delay(100);
    client.stop();
  }

    //decipher message string
    if(messageStr == "lightsOn")
    {
      lightsOn();
      Serial.println("on");
    }
    else if (messageStr == "lightsOff")
    {
      lightsOff();
            Serial.println("off");
    }
      
    messageStr = "";
}

// turn the lights on
void lightsOn()
{  
  digitalWrite(pinOff, LOW); 
  delay(200);
  digitalWrite(pinOn, HIGH);
  delay(200);
  digitalWrite(pinOn, LOW);
}

// turn the lights off
void lightsOff()
{
  digitalWrite(pinOn, LOW); 
  delay(200);
  digitalWrite(pinOff, HIGH);
  delay(200);
  digitalWrite(pinOff, LOW);
}
