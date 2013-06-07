int led = 13;

void setup() {                
 pinMode(led, OUTPUT);     
 Serial.begin(9600); 
}

void loop() {
  Serial.println("on");
  digitalWrite(led, HIGH);
  delay(1000);            
  Serial.println("off");
  digitalWrite(led, LOW);
  delay(1000);           
}
