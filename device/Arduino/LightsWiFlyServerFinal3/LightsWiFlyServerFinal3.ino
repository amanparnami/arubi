/*
 * Web Server
 *
 * (Based on Ethernet's WebServer Example)
 *
 * A simple web server that shows the value of the analog input pins.
 */

#include <SPI.h>
#include <WiFly.h>

char ssid[] = "WiFly";

// WiFly server
WiFlyServer server(80);

// WiFly client with server ip address
WiFlyClient client("192.168.2.4", 80);

// Device id
String deviceId = "5";

// Initialize the message string
String messageStr;

int ch2On = 2;
int ch2Off = 3;

//int ch3On = 5;
//int ch3Off = 2;

void setup() {

  pinMode(ch2On, OUTPUT);     
  pinMode(ch2Off, OUTPUT);
//  pinMode(ch3On, OUTPUT);     
//  pinMode(ch3Off, OUTPUT);

  WiFly.begin();

  if (!WiFly.join(ssid)) {
    while (1) {
      // Hang on failure.
    }
  }

  Serial.begin(9600);
  Serial.print("IP: ");
  String ipAddress = WiFly.ip();
  Serial.println(ipAddress);

  if (client.connect()) 
  {
    Serial.println("updating IP address...");  
    updateIpAddress(deviceId, ipAddress);
  }
  else
  {
    Serial.println("Error connecting...");
  } 

  if (client.connect()) 
  {
    Serial.println("updating device availability...");  
    updateAvailability(deviceId, 1);
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
  WiFlyClient webServer = server.available();
  if (webServer) 
  {

    
    // an http request ends with a blank line
    boolean current_line_is_blank = true;

    messageStr = "";
    String tempStr = "";

    while (webServer.connected()) 
    {
      //Serial.println("web server connected");
      
      if (webServer.available()) 
      {
        char c = webServer.read();
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
          webServer.println("HTTP/1.1 200 OK");
          webServer.println("Content-Type: text/html");
          webServer.println();

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
    
    if(messageStr == "status")
    {
      webServer.println("1");
    }

    // give the web browser time to receive the data
    delay(100);
    webServer.stop();
  }

  //decipher message string
  if(messageStr == "lights_on")
  {
    lightsOn();
    Serial.println("on");
  }
  else if (messageStr == "lights_off")
  {
    lightsOff();
    Serial.println("off");
  }

  messageStr = "";
}

// turn the lights on
void lightsOn()
{  
  digitalWrite(ch2Off, LOW); 
  delay(300);
  digitalWrite(ch2On, HIGH);
  delay(300);
  digitalWrite(ch2On, LOW);
  
//  digitalWrite(ch3Off, LOW); 
//  delay(200);
//  digitalWrite(ch3On, HIGH);
//  delay(200);
//  digitalWrite(ch3On, LOW);
}

// turn the lights off
void lightsOff()
{
  digitalWrite(ch2On, LOW); 
  delay(300);
  digitalWrite(ch2Off, HIGH);
  delay(300);
  digitalWrite(ch2Off, LOW);
  
//  digitalWrite(ch3On, LOW); 
//  delay(200);
//  digitalWrite(ch3Off, HIGH);
//  delay(200);
//  digitalWrite(ch3Off, LOW);

}




