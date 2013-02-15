#include "WiFly.h"
#include "Credentials.h"
 
int ledPin = 9;
 
WiFlyServer server(80);
 
void setup() {
 WiFly.begin();
 
 if (!WiFly.join(ssid, passphrase)) {
   while (1) {
   // Hang on failure.
   }
 }
 
 pinMode(ledPin,OUTPUT);
 server.begin(); // begin the server
 
 Serial.begin(9600);
 Serial.println(" ** Beginning Server ** ");
 Serial.print("IP: ");
 Serial.println(WiFly.ip());
 
 server.begin();
 
 Serial.println("Ready for commands");
 digitalWrite(ledPin, HIGH);
}
 
void loop() {
 
  Client client = server.available();
 
  //check if their is a connection
  if (client) {
     // an http request ends with a blank line
     boolean current_line_is_blank = true;
 
     while (client.connected()) {
        // Checks if connection is still available
        if (client.available()) {
            char c = client.read();
 
            if(c == '$')
            {
                Serial.print("Client says: ");
                Serial.print(c);
                // Read the character after the $
                c = client.read();
                switch(c)
                {
                    case '1':
                    digitalWrite(ledPin, LOW);
                    Serial.println("OFF");
                    break;
                    case '2':
                    digitalWrite(ledPin, HIGH);
                    Serial.println("ON");
                    break;
                }
                // Stop reading the packet if there is a comment? #
                if(c == '#')
                {
                  Serial.println(c);
                  break;
                }
            }
         }
        // give the web browser time to receive the data
        delay(10);
     }
  }
}
