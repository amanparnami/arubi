#include "WiFly.h"
#include "Credentials.h"

Server server(80);
int pinOn = 3;
int pinOff = 2;
boolean lightOn = false;
String messageStr;

void setup() {

  pinMode(pinOn, OUTPUT);
  pinMode(pinOff, OUTPUT);

  Serial.begin(9600);
  while (!Serial){
    ;
  }

  WiFly.begin();

  if (!WiFly.join(ssid, passphrase)) {
    while (1) {
      // Hang on failure.
    }
  }

  Serial.print("Server is at: ");
  Serial.println(WiFly.ip());  
  server.begin();


}

void loop() {
  Client client = server.available();
  if (client) {
    // an http request ends with a blank line
    boolean current_line_is_blank = true;
    messageStr = "";
    String tempStr = "";

    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
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

        // if we've gotten to the end of the line (received a newline
        // character) and the line is blank, the http request has ended,
        // so we can send a reply
        if (c == '\n' && current_line_is_blank) 
        {
          // send a standard http response header
          client.println("HTTP/1.1 200 OK");
          client.println("Content-Type: text/html");
          client.println("Connnection: close");
          client.println();
          client.println("<!DOCTYPE HTML>");
          client.println("<html>");
          // add a meta refresh tag, so the browser pulls again every 5 seconds:
          client.println("<meta http-equiv=\"refresh\" content=\"5\">");
          // output the value of each analog input pin
          for (int analogChannel = 0; analogChannel < 6; analogChannel++) {
            int sensorReading = analogRead(analogChannel);
            client.print("analog input ");
            client.print(analogChannel);
            client.print(" is ");
            client.print(sensorReading);
            client.println("<br />");       
          }
          client.println("</html>");
          break;
        }
        if (c == '\n') {
          // we're starting a new line
          current_line_is_blank = true;
        } 
        else if (c != '\r') {
          // we've gotten a character on the current line
          current_line_is_blank = false;
        }
      }
    }

    // give the web browser time to receive the data
    delay(100);
    client.stop();


    //decipher message string
    if(messageStr == "lightsOn")
      lightsOn();
    else if(messageStr == "lightsOff")
      lightsOff();

    messageStr="";
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




