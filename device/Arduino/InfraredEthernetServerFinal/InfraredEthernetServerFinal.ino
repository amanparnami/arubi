#include <SPI.h>
#include <Ethernet.h>
#include <IRremote.h>

// Enter a MAC address and IP address for your controller below.
// The IP address will be dependent on your local network:
byte mac[] = {
  0x90, 0xA2, 0xDA, 0x0D, 0x44, 0x4A};
String myIpAddress = "192.168.2.15";
IPAddress myIp(192,168,2,15);
IPAddress serverIp(192,168,2,4);

// Initialize the Ethernet server library
// with the IP address and port you want to use 
// (port 80 is default for HTTP):
EthernetServer server(80);

// Ethernet client with server ip address
EthernetClient client;

// Device id
String deviceId = "3";

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

void setup() 
{
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }

  // start the Ethernet connection and the server:
  Ethernet.begin(mac, myIp);
  Serial.print("IP: ");
  Ethernet.localIP();
  Serial.println(myIpAddress);

  if (client.connect(serverIp,80))
  {
    Serial.println("updating IP address...");  
    updateIpAddress(deviceId, myIpAddress);
  }
  else
  {
    Serial.println("Error connecting...");
  } 

  if (client.connect(serverIp,80)) 
  {
    Serial.println("updating device availability...");  
    updateAvailability(deviceId, 1);
  }
  else
  {
    Serial.println("Error connecting...");
  } 

  delay(1000);
  server.begin();
}

void updateIpAddress(String deviceId, String ipAddress)
{
  client.println("GET /server/updateDeviceInfo.php?f=updateIP&id=" + deviceId + "&ip=" + ipAddress + " HTTP/1.0");
  client.println();
  receiveHttpResponse();
}

void updateAvailability(String deviceId, int availability)
{
  client.println("GET /server/updateDeviceInfo.php?f=updateAvailability&id=" + deviceId + "&available=" + availability + " HTTP/1.0");
  client.println();
  receiveHttpResponse();
}

void receiveHttpResponse()
{ 
  client.flush();
  client.stop();
  Serial.println("disconnecting...");
}


void loop() 
{
  // listen for incoming clients
  EthernetClient webServer = server.available();
  if (webServer) {
    // an http request ends with a blank line
    boolean currentLineIsBlank = true;
    messageStr = "";
    String tempStr = "";

    while (webServer.connected()) {
      if (webServer.available()) {
        char c = webServer.read();        
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
          webServer.println("HTTP/1.1 200 OK");
          webServer.println("Content-Type: text/html");
          webServer.println();
          //          webServer.println("<!DOCTYPE HTML>");
          //          webServer.println("<html>");
          //          // add a meta refresh tag, so the browser pulls again every 5 seconds:
          //          webServer.println("<meta http-equiv=\"refresh\" content=\"5\">");
          //          // output the value of each analog input pin
          //          for (int analogChannel = 0; analogChannel < 6; analogChannel++) {
          //            int sensorReading = analogRead(analogChannel);
          //            webServer.print("analog input ");
          //            webServer.print(analogChannel);
          //            webServer.print(" is ");
          //            webServer.print(sensorReading);
          //            webServer.println("<br />");       
          //          }
          //          webServer.println("</html>");
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

    if(messageStr == "status")
    {
      webServer.println("1");
    }

    // give the web browser time to receive the data
    delay(100);
    // close the connection:
    webServer.stop();
    //Serial.println("client disonnected");
  }

  //decipher message string
  if(messageStr == "projector_on")
  {
    sendCode = 0;
    sendIRCode(powerOn);
//    delay(500);
  }

  else if (messageStr == "projector_off")
  {
    sendCode = 0;
    sendIRCode(powerOff);
    sendIRCode(powerOff);
  }

  else if (messageStr == "projector_computersource")
    sendCode = sourceComp;

  else if (messageStr == "projector_svideosource")   
    sendCode = sourceSvideo;

  else if (messageStr == "projector_videosource")
    sendCode = sourceVideo;

  else if (messageStr == "projector_source")
    sendCode = sourceSearch;

  else if (messageStr == "projector_up")
    sendCode = buttonUp;

  else if (messageStr == "projector_down")
    sendCode = buttonDown;

  else if (messageStr == "projector_right")
    sendCode = buttonRight;

  else if (messageStr == "projector_left")
    sendCode = buttonLeft;

  else if (messageStr == "projector_enter")
    sendCode = buttonMute;

  else if (messageStr == "projector_mute")
    sendCode = buttonMute;

  else if (messageStr == "projector_menu")
    sendCode = buttonMenu;

  //Serial.println(sendCode);
  if(sendCode != 0)
  {

    sendIRCode(sendCode);
  }

  messageStr = "";
  sendCode=0;
}

// function to send IR codes
void sendIRCode(long code)
{
  // send IR command on loop
  irsend.sendNEC(code,38);
  delay(500);
  irsend.sendNEC(0,38);
  delay(500);
}


