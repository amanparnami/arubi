#include <SPI.h>
#include <Ethernet.h>
#include <Stepper.h>

// Enter a MAC address and IP address for your controller below.
// The IP address will be dependent on your local network:
byte mac[] = { 
  0x90, 0xA2, 0xDA, 0x0D, 0x44, 0x48};
//  0x90, 0xA2, 0xDA, 0x0D, 0x44, 0x4A};
String myIpAddress = "192.168.2.17";
IPAddress myIp(192,168,2,17);
IPAddress serverIp(192,168,2,4);

// Initialize the Ethernet server library
// with the IP address and port you want to use 
// (port 80 is default for HTTP):
EthernetServer server(80);

// Ethernet client with server ip address
EthernetClient client;

// Device id
String deviceId = "6";

//Initialize the message string
String messageStr;

// Set revolutions for stepper motor
// change this to fit the number of steps per revolution
const int stepsPerRevolution = 1000;  

// Initialize the stepper library on pins 2 through 5:
Stepper myStepper(stepsPerRevolution, 2,3,4,5);            

void setup() {

  // initialize the serial port:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait
  }    

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

  // Set the speed at 60 rpm:MM
  myStepper.setSpeed(10);
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
  EthernetClient webServer = server.available();
  if (webServer) {
    //Serial.println("new client");
    // an http request ends with a blank line
    boolean currentLineIsBlank = true;
    messageStr = "";
    String tempStr = "";

    while (webServer.connected()) {
      if (webServer.available()) {
        char c = webServer.read();        
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
          client.println();
          //          client.println("<!DOCTYPE HTML>");
          //          client.println("<html>");
          //          // add a meta refresh tag, so the browser pulls again every 5 seconds:
          //          client.println("<meta http-equiv=\"refresh\" content=\"5\">");
          //          // output the value of each analog input pin
          //          for (int analogChannel = 0; analogChannel < 6; analogChannel++) {
          //            int sensorReading = analogRead(analogChannel);
          //            client.print("analog input ");
          //            client.print(analogChannel);
          //            client.print(" is ");
          //            client.print(sensorReading);
          //            client.println("<br />");       
          //          }
          //          client.println("</html>");
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

  if(messageStr == "screen_up")
  {
    Serial.println("up");
    myStepper.step(stepsPerRevolution);
  }

  else if(messageStr == "screen_down")
  {
    Serial.println("down");
    myStepper.step(-stepsPerRevolution);
  }

  else if(messageStr == "screen_stop")
  {
    Serial.println("stop");
    myStepper.step(0);
  }

  messageStr="";
}

