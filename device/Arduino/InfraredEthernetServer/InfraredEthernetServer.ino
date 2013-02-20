#include <SPI.h>
#include <Ethernet.h>
#include <IRremote.h>

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

// Initialize the IR led on pin 3
IRsend irsend; // pin 3

// Initialize the IR commands
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
long buttonEnter = 0xC1AAA15E;
long buttonMute = 0xC1AAC936;
long buttonMenu = 0xC1AA59A6;
long sendCode;

void setup() {
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }


  // start the Ethernet connection and the server:
  Ethernet.begin(mac, ip);
  server.begin();
  Serial.print("Server is at: ");
  Serial.println(Ethernet.localIP());
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
    if(messageStr == "powerOn")
      sendCode = powerOn;
    else if (messageStr == "powerOff")
      sendCode = powerOff;
    else if (messageStr == "sourceComp")
      sendCode = sourceComp;
    else if (messageStr == "sourceSvideo")
      sendCode = sourceSvideo;
    else if (messageStr == "sourceVideo")
      sendCode = sourceVideo;
    else if (messageStr == "sourceSearch")
      sendCode = sourceSearch;
    else if (messageStr == "buttonUp")
      sendCode = buttonUp;
    else if (messageStr == "buttonDown")
      sendCode = buttonDown;
    else if (messageStr == "buttonRight")
      sendCode = buttonRight;
    else if (messageStr == "buttonLeft")
      sendCode = buttonLeft;
    else if (messageStr == "buttonEnter")
      sendCode = buttonMute;
    else if (messageStr == "buttonMute")
      sendCode = buttonMute;
    else if (messageStr == "buttonMenu")
      sendCode = buttonMenu;

    //Serial.println(sendCode);
    sendIRCode(sendCode);
    messageStr = "";

    // give the web browser time to receive the data
    delay(1);
    // close the connection:
    client.stop();
    //Serial.println("client disonnected");
  }
}

// function to send IR codes
void sendIRCode(long code)
{
  // send IR command on loop
  irsend.sendNEC(code,38);
}




