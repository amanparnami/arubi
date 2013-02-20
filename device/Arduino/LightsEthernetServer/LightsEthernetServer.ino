#include <SPI.h>
#include <Ethernet.h>

// Enter a MAC address and IP address for your controller below.
// The IP address will be dependent on your local network:
byte mac[] = {
  0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED};
IPAddress ip(192,168,1, 177);

// Initialize the Ethernet server library
// with the IP address and port you want to use 
// (port 80 is default for HTTP):
EthernetServer server(80);

// Initialize the message string
String messageStr;

// Define output pins
int pinOn = 3;
int pinOff = 2;

void setup() {
  
  // Define output pin modes
  pinMode(pinOn, OUTPUT);
  pinMode(pinOff, OUTPUT);

  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }

  // start the Ethernet connection and the server:
  Ethernet.begin(mac, ip);
  Serial.print("Server is at: ");
  Serial.println(Ethernet.localIP());
  server.begin();
}


void loop() {
  // listen for incoming clients
  EthernetClient client = server.available();
  if (client) {
    //Serial.println("new client");
    // an http request ends with a blank line
    boolean currentLineIsBlank = true;
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

        // if you've gotten to the end of the line (received a newline
        // character) and the line is blank, the http request has ended,
        // so you can send a reply
        if (c == '\n' && currentLineIsBlank) 
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
          // you're starting a new line
          currentLineIsBlank = true;
        } 
        else if (c != '\r') {
          // you've gotten a character on the current line
          currentLineIsBlank = false;
        }
      }
    }

    //decipher message string
    if(messageStr == "lightsOn")
      lightsOn();
    else if (messageStr == "lightsOff")
      lightsOff();

    // give the web browser time to receive the data
    delay(1);
    // close the connection:
    client.stop();
    //Serial.println("client disonnected");
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
