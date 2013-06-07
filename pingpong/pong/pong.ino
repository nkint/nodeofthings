String inputString = "";
boolean stringComplete = false;

int led = 13;
boolean value = LOW;

void setup() {
  pinMode(led, OUTPUT);
  Serial.begin(9600);
  inputString.reserve(200);
  Serial.println("Hello!");
}

void loop() {
  digitalWrite(led, value);
  
  if (stringComplete) {
    
    if(inputString=="ping.") {
      value = !value;
      Serial.println("pong.");
    }
      
    inputString = "";
    stringComplete = false;
  }
}

/*
 This routine is run between each
 time loop() runs, 
 so using delay inside loop 
 can delay response.
 */
void serialEvent() {
  while (Serial.available()) {
    char inChar = (char)Serial.read(); 
    
    inputString += inChar;
    if (inChar == '.') {
      stringComplete = true;
    } 
  }
}

