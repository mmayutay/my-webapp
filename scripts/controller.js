// basic functionalities
var buttonConnect = document.getElementById('connect-button');
var buttonDisconnect = document.getElementById('disconnect');
var buttonPublish = document.getElementById('publish-button');
var buttonSubscribe = document.getElementById('subscribe-button');
var displayConnected = document.getElementById('connected');
var sub = document.getElementById('subscribe').value;
var d = new Date().toLocaleTimeString();


//function for Publishing the topic
function publishTopic() {
  var sub = document.getElementById('subscribe').value;
  return sub;
}

//function for Publishing the payload
function publishPayload() {
  var pub = document.getElementById('publish').value;
  return pub;
}

//function for the subscriber
function btnSubscribe() {
  var btnSbc = document.getElementById('subscribeTo').value;
  return btnSbc;
}


//function in disabling button
function disableButton() {
  buttonConnect.disabled = true;
  buttonPublish.disabled = true;
}

//function in enabling button
function enableButton() {
  if (publishTopic() == null) {
    alert('asdf');
  } else {
    buttonConnect.disabled = false;
    document.getElementById('enableBtn').disabled = true;
  }
}
//function for the publish button
function enablePub() {
  buttonPublish.disabled = false;
}

//function connected
function connected() {
  displayConnected.style.backgroundColor = '#54E352';
  document.getElementById('SuccConne').innerHTML = "Successfully Connected";
  document.getElementById('SuccConne').style.color = 'white';
  document.getElementById('broker').innerHTML = "You are connected to Broker wss://test.mosquitto.org:8081/mqtt";
  document.getElementById('broker').style.backgroundColor = "#54E352";
}




disableButton();
//Button for disconnecting
buttonDisconnect.addEventListener('click', function () {
  client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
  console.log("Disconnected!!");
  displayConnected.style.backgroundColor = '#FC7373';
  document.getElementById('SuccConne').innerHTML = "Disconnected!!";
  document.getElementById('broker').innerHTML = "You are not connected to the Broker ";
  document.getElementById('broker').style.backgroundColor = "#FC7373";
  buttonPublish.disabled = true;
  document.getElementById('enableBtn').disabled = false;
  client.end();
})

//Button for Connecting 
buttonConnect.addEventListener('click', function (e) {
  e.preventDefault();
  client = mqtt.connect("wss://test.mosquitto.org:8081/mqtt");
  client.subscribe(btnSubscribe());
  console.log('connect button clicked...');


  client.on("connect", function () {
    console.log("Successfully connected");
    connected();
    disableButton();
    enablePub();
  })
})

//Button for Subscribing
buttonSubscribe.addEventListener('click', function (s) {
  s.preventDefault();
  client.on("message", function (subTopic) {
    console.log("Subscribe: { "+[subTopic].join("")+" }");
  })
  client.publish(btnSubscribe());
})

//Button for Publishing
buttonPublish.addEventListener('click', function (p) {
  p.preventDefault();
  client.on("message", function (topic, payload) {
    console.log("Publish: { "+[topic, payload].join(": ")+" }");
    buttonPublish.disabled = true;
    enableButton();
    var table = document.getElementById("addValue");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(-1);
    cell1.innerHTML = publishTopic();
    cell2.innerHTML = publishPayload();
    cell3.innerHTML = d;
  })
  client.publish(publishTopic(), publishPayload());
})







// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo")

// client.on("connect", function () {
//   console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!")



// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })
