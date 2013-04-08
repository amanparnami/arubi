int incomingByte = 0;   // for incoming serial data
int pinOn = 5;
int pinOff = 6;


void setup() {
  pinMode(3, OUTPUT);
  digitalWrite(3, LOW);
  pinMode(4, OUTPUT);
  digitalWrite(4, HIGH);
  pinMode(pinOn, OUTPUT);     
  pinMode(pinOff, OUTPUT);
  Serial.begin(9600);     // opens serial port, sets data rate to 9600 bps
}

void loop() {

        // send data only when you receive data:
        if (Serial.available() > 0) {
                // read the incoming byte:
                incomingByte = Serial.read();

                // say what you got:
                Serial.print("I received: ");
                Serial.println(incomingByte, DEC);
                
                if(incomingByte == 48)
                {
                  lightsOff();
                }
                
                else if(incomingByte == 49)
                {
                  lightsOn();
                } 
        }
}
 
// turn the lights on
void lightsOn()
{  
  Serial.println("I'm on");
  digitalWrite(pinOff, LOW); 
  delay(200);
  digitalWrite(pinOn, HIGH);
  delay(200);
  digitalWrite(pinOn, LOW);
}

// turn the lights off
void lightsOff()
{
    Serial.println("I'm off");
  digitalWrite(pinOn, LOW); 
  delay(200);
  digitalWrite(pinOff, HIGH);
  delay(200);
  digitalWrite(pinOff, LOW);
}
 
 
