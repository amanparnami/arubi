#include <SPI.h>
#include <Ethernet.h>
#include <Stepper.h>

byte mac[] = { 0x90, 0xA2, 0xDA, 0x0D, 0x44, 0x48};
IPAddress ip(192,168,1,17);

// Initialize the Ethernet server library
// with the IP address and port you want to use 
// (port 80 is default for HTTP):
EthernetServer server(80);
String messageStr;

const int stepsPerRevolution = 500;  // change this to fit the number of steps per revolution
// for your motor

// initialize the stepper library on pins 8 through 11:
Stepper myStepper(stepsPerRevolution, 2,3,4,5);            

void setup() {
  // set the speed at 60 rpm:MM
  myStepper.setSpeed(10);
  // initialize the serial port:
  Serial.begin(9600);

  Ethernet.begin(mac, ip);
  server.begin();
  Serial.print("Server is at: ");
  Serial.println(Ethernet.localIP());
}

void loop() {

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
        // if you've gotten to the end of the line (received a newline
        // character) and the line is blank, the http request has ended,
        // so you can send a reply

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

    if(messageStr == "screenUp")
      myStepper.step(stepsPerRevolution);
    else if(messageStr == "screenDown")
      myStepper.step(-stepsPerRevolution);
    // step one revolution  in one direction:
    Serial.println(messageStr);

    delay(500); 
  }
}

