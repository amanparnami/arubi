 
/*******************************************************************************/
/*macro definitions of PIR motion sensor pin and LED pin*/
#define PIR_MOTION_SENSOR 2//Use pin 2 to receive the signal from the module 
#define LED	13//the Grove - LED is connected to D4 of Arduino

void setup()
{
	pinsInit();
}

void loop() 
{
	if(isPeopleDetected())//if it detects the moving people?
		turnOnLED();
	else
		turnOffLED();
}
void pinsInit()
{
	pinMode(PIR_MOTION_SENSOR, INPUT);
	pinMode(LED,OUTPUT);
}
void turnOnLED()
{
	digitalWrite(LED,HIGH);
}
void turnOffLED()
{
	digitalWrite(LED,LOW);
}
/***************************************************************/
/*Function: Detect whether anyone moves in it's detecting range*/
/*Return:-boolean, ture is someone detected.*/
boolean isPeopleDetected()
{
	int sensorValue = digitalRead(PIR_MOTION_SENSOR);
	if(sensorValue == HIGH)//if the sensor value is HIGH?
	{
		return true;//yes,return ture
	}
	else
	{
		return false;//no,return false
	}
}
