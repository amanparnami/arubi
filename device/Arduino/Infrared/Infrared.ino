/*
 * IRremote: IRsendDemo - demonstrates sending IR codes with IRsend
 * An IR LED must be connected to Arduino PWM pin 3.
 * Version 0.1 July, 2009
 * Copyright 2009 Ken Shirriff
 * http://arcfn.com
 */

#include <IRremote.h>

IRsend irsend;

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
long remoteCodes[12] = {powerOn, powerOff, sourceComp, sourceSvideo, sourceVideo, sourceSearch, buttonUp, buttonDown, buttonRight, buttonLeft, buttonMute, buttonMenu}; 

void setup()
{
  Serial.begin(9600);
}

void loop() 
{
  irsend.sendNEC(buttonDown,38);
  delay(1000);
}
