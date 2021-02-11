byte hexBlau, hexRot, hexGruen;

int hexcode = 0xfc02e7;

String lastMessage;

// Ground: 2. vln
// Rot: 1.
// Gruen: 3.
// Blau: 4.
#include <Adafruit_NeoPixel.h>

int countdown = 0;

int LED = 12;
int anzahl_LED = 12;
Adafruit_NeoPixel circle(anzahl_LED, LED, NEO_GRB + NEO_KHZ800);

#include <analogWrite.h>
#include "ArduinoJson.h"
#include <stdlib.h>


#include <WiFi.h>
#include <PubSubClient.h>


/*
  const char*ssid = "********";
  const char*password = "********";
  const char*mqttServer = "unix-yoga.de";
  const int mqttPort = 1883;
  const char*mqttUser = "color_triangle_frontend";
  const char*mqttPassword = "********"; */

const char*ssid = "********";
const char*password = "********";
const char*mqttServer = "hrw-fablab.de";
const int mqttPort = 1883;
const char*mqttUser = "gruppe10";
const char*mqttPassword = "*****";

WiFiClient espClient;
PubSubClient client(espClient);


// the setup function runs once when you press reset or power the board
void setup() {

  circle.begin();
  circle.show();
  circle.setBrightness(50);

  Serial.begin(9600);

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting to WiFi..");
  }
  Serial.println("Done.");

  delay(3000);
  client.setServer(mqttServer, mqttPort);
  client.setCallback(callback);

  while (!client.connected()) {
    Serial.println("Connecting to MQTT...");

    if (client.connect("<USERNAME>", mqttUser, mqttPassword ))
    {
      Serial.println("connected");
    }
    else
    {
      Serial.print("failed with state ");
      Serial.println(client.state());
      delay(2000);
    }
  }
  //client.subscribe("lights");
  client.subscribe("ES/WS20/gruppe10/lights");
  //Beispiele zur Wildcard-Nutzung
  //client.subscribe("ES/WS20/testuser/livingroom/+");
  //client.subscribe("ES/#");

}

// the loop function runs over and over again forever

int value;


int valuesArray[100];
int valuesIndex = 0;
double sum;

void loop() {

  hexcode = updateLEDS();
  client.loop();

  // (color >> 16) & 0xFF;  // R value
  // (color >> 8) & 0xFF;   // G value
  // (color >> 0) & 0xFF;   // B value

  hexRot = (hexcode >> 16) & 0xFF;
  hexBlau = (hexcode >> 8) & 0xFF;
  hexGruen = (hexcode >> 0) & 0xFF;

  //Neopixel

  setallNeopixel(hexRot, hexBlau, hexGruen);
  value = map(analogRead(39), 0, 4095, 5, 150);

  valuesArray[valuesIndex] = value;
  valuesIndex++;
  if (valuesIndex > 100) {
    valuesIndex = 0;
  }

  sum = 0;
  for (int i = 0; i < 100; i++) {
    sum += valuesArray[i];
  }

  value = sum /= 100;

  if (analogRead(38) == 4095)
  {
    countdown = 0;
  }
  if (countdown >= 750)
  {
    value = 0;
    countdown = 750;
  }
  
  circle.setBrightness(value);
  countdown++;
  Serial.println(analogRead(38));
}

void setallNeopixel(int rot, int blau, int gruen)
{
  for (int i = 0; i <= anzahl_LED; i++)
  {
    circle.setPixelColor(i, circle.Color(rot, blau, gruen));
    circle.show();
  }
}

long updateLEDS() {

  String message = lastMessage;
  message.replace("#", "0x");
  DynamicJsonDocument document(1024);
  deserializeJson(document, message);

  int selected_index = document["selectedIndex"].as<long>();
  String str_color = document["buttons"][selected_index];

  // Kommentieren, falls Webseite genutzt wird
  str_color = lastMessage;

  char c[str_color.length() + 1];
  str_color.toCharArray(c, str_color.length() + 1);
  return strtol(c, NULL, 16);
}


void callback(char* topic, byte* payload, unsigned int length)
{
  lastMessage = "";
  Serial.print("Message arrived in topic: ");
  Serial.println(topic);
  Serial.print("Message:");
  for (int i = 0; i < length; i++) {
    lastMessage.concat((char) payload[i]);
    Serial.print((char)payload[i]);
  }
  Serial.println();
  Serial.print("lastMessage: ");
  Serial.println(lastMessage);
  Serial.println("-----------------------");
}
