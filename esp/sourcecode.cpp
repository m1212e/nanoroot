// MQTT Grundgerüst 
int Blau = 13;
int Rot = 15;
int Gruen = 2;

byte hexBlau, hexRot, hexGruen;

int hexcode = 0xfc02e7;
String lastMessage;

#include <analogWrite.h>
#include "ArduinoJson.h"
#include <stdlib.h>
#include <WiFi.h>
#include <PubSubClient.h>

const char*ssid = "iPhone N";
const char*password = "";
const char*mqttServer = "unix-yoga.de";
const int mqttPort = 1883;
const char*mqttUser = "color_triangle_frontend";
const char*mqttPassword = "";

WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  
  pinMode(Blau, OUTPUT);
  pinMode(Rot, OUTPUT);
  pinMode(Gruen, OUTPUT);
  
  Serial.begin(9600);

  
  // WIFI Stuff
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Done.");

  // Verbindung kann manchmal bis zu 1 Sekunde dauern
  delay(2000);
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);
 
 // MQTT Stuff
  while (!client.connected()) {
	  Serial.println("Connecting to MQTT...");
	 
	  if (client.connect("Fex", mqttUser, mqttPassword )) {
		Serial.println("connected");
	  }
	  else {
		Serial.print("failed with state ");
		Serial.println(client.state());
		delay(2000);
	  }
	}

	// Topic: lights 
	client.subscribe("lights");

}


void loop() {

	// MQTT checken
	client.loop();
	
	// Farb-Hexcode holen
	hexcode = updateLEDS();

	hexRot = (hexcode >> 16) & 0xFF;
	hexBlau = (hexcode >> 8) & 0xFF;
	hexGruen = (hexcode >> 0) & 0xFF;

	// Unwichtig für LED-Ring
	analogWrite(Blau, hexBlau);
	analogWrite(Rot, hexRot);
	analogWrite(Gruen, hexGruen);

}

long updateLEDS() {

  String message = lastMessage;
  
  message.replace("#", "0x");
  DynamicJsonDocument document(1024);
  deserializeJson(document, message);
  
  int selected_index = document["selectedIndex"].as<long>();
  String str_color = document["buttons"][selected_index];

  //REMOVE
  // str_color = lastMessage;

  char c[str_color.length() + 1];
  str_color.toCharArray(c, str_color.length() + 1);
  return strtol(c, NULL, 16);
}


void callback(char* topic, byte* payload, unsigned int length)
{
  lastMessage = "";
  bool debug = false;

  if(debug) {
    Serial.print("Message arrived in topic: ");
    Serial.println(topic);
    Serial.print("Message:");
  }
  
  // Nachricht vom MQTT-Server speichern
  for (int i = 0; i < length; i++) {
    lastMessage.concat((char) payload[i]);

    if(debug)
      Serial.print((char)payload[i]);
  }

  if(debug) {
    Serial.print("lastMessage: ");
    Serial.println(lastMessage);
    Serial.println("-----------------------");
  }
}



// Adafruit Beispiel für den LED-Ring, funktioniert, ist aber noch nicht (08.02.2021) eingebunden. Kommt die Tage

#include <Adafruit_NeoPixel.h>

double xxx = 0;

Adafruit_NeoPixel strip = Adafruit_NeoPixel(12,12, NEO_GRB + NEO_KHZ800);
void setup() {
  // put your setup code here, to run once:
  strip.begin();
  strip.setBrightness(50);
}

void loop() {
  rainbow(100);
}

void rainbow(uint8_t wait) {
  uint16_t i, j;

  for(j=0; j<256; j++) {
    for(i=0; i<12; i++) {
      strip.setPixelColor(i, Wheel((i+j) & 255));
    }
    strip.show();
    delay(wait);
  }
}

uint32_t Wheel(byte WheelPos) {
  if(WheelPos < 85) {
   return strip.Color(WheelPos * 3, 255 - WheelPos * 3, 0);
  } else if(WheelPos < 170) {
   WheelPos -= 85;
   return strip.Color(255 - WheelPos * 3, 0, WheelPos * 3);
  } else {
   WheelPos -= 170;
   return strip.Color(0, WheelPos * 3, 255 - WheelPos * 3);
  }
}

void colorWave(uint8_t wait) {
  int i, j, stripsize, cycle;
  float ang, rsin, gsin, bsin, offset;

  static int tick = 0;
  
  stripsize = 12;
  cycle = stripsize * 25; // times around the circle...

  while (++tick % cycle) {
    offset = map2PI(tick);

    for (i = 0; i < stripsize; i++) {
      ang = map2PI(i) - offset;
      rsin = sin(ang);
      gsin = sin(2.0 * ang / 3.0 + map2PI(int(stripsize/6)));
      bsin = sin(4.0 * ang / 5.0 + map2PI(int(stripsize/3)));
      strip.setPixelColor(i, strip.Color(trigScale(rsin), trigScale(gsin), trigScale(bsin)));
    }

    strip.show();
    delay(wait);
  }

}

/**
 * Scale a value returned from a trig function to a byte value.
 * [-1, +1] -> [0, 254] 
 * Note that we ignore the possible value of 255, for efficiency,
 * and because nobody will be able to differentiate between the
 * brightness levels of 254 and 255.
 */
byte trigScale(float val) {
  val += 1.0; // move range to [0.0, 2.0]
  val *= 127.0; // move range to [0.0, 254.0]

  return int(val) & 255;
}

/**
 * Map an integer so that [0, striplength] -> [0, 2PI]
 */
float map2PI(int i) {
  return PI*2.0*float(i) / 12;

}
