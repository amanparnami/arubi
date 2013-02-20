#include <SPI.h>
#include <Ethernet.h>
#include <IRremote.h>

// Enter time to update the data from server
#define TIMETOUPDATE 3000  // frequency of update in seconds

// Enter a MAC address for your controller below.
// Newer Ethernet shields have a MAC address printed on a sticker on the shield
byte mac[] = {0x90, 0xA2, 0xDA, 0x0D, 0x44, 0x4A};

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
long buttonMute = 0xC1AAC936;
long buttonMenu = 0xC1AA59A6;

// Initialize the Ethernet client library
// with the IP address and port of the server 
// that you want to connect to (port 80 is default for HTTP):
EthernetClient client;
IPAddress server(192,168,1,4);

void setup() 
{
  // Open serial communications and wait for port to open:
  Serial.begin(9600);
   while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }

  // start the Ethernet connection:
  if (Ethernet.begin(mac) == 0) {
    Serial.println("Failed to configure Ethernet using DHCP");
    // no point in carrying on, so do nothing forevermore:
    for(;;)
      ;
  }
  // give the Ethernet shield a second to initialize:
  delay(1000);
  Serial.println("connecting...");

  // if you get a connection, report back via serial:
  if (client.connect(server, 80)) 
  {
    Serial.println("connected");
    // Make a HTTP request:
    //client.println("GET /server/www/arubi.php?sender=arduino HTTP/1.0");
    client.println();
  } 
  else 
  {
    // if you didn't get a connection to the server:
    Serial.println("connection failed");
  }
}

uint32_t timeLastUpdated;
int count = 0;

void loop()
{
  if (millis() - timeLastUpdated > TIMETOUPDATE)
  {  
    
    timeLastUpdated = millis();
    client.println("GET /server/www/arubi.php?sender=arduino&arg=1 HTTP/1.0");
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
            if(str.indexOf("Got It!!") != -1)
              break;
          }
          else
          {   
            str += c;
          } 
        }
      }
      
      if(str == "Got It!!")
      {
        Serial.println("Sending button up");
        sendIRCode(buttonUp);
      }
      else
      {
        Serial.println("Sending button down");
        sendIRCode(buttonDown);
      }
  }
}

// function to send IR codes
void sendIRCode(long code)
{
   // send IR command on loop
  irsend.sendNEC(code,38);
}
