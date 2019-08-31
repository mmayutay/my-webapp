// basic functionalities
var buttonConnect = document.getElementById('connect-button');
var buttonPublish = document.getElementById('publish-button');
var sub = document.getElementById('subscribe').value;


//function for subscribe
function toSubscribe() {
  var sub = document.getElementById('subscribe').value;
  return sub;
}

//function for publish
function toPublish() {
  var pub = document.getElementById('publish').value;
  return pub;
}
//function in disabling button
function disableButton(){
  buttonConnect.disabled = true;
  buttonPublish.disabled = true;
}

//function in enabling button
function enableButton(){
    buttonConnect.disabled = false;
    document.getElementById('enableBtn').disabled = true;
}
//function for the publish button
function enablePub(){
  buttonPublish.disabled = false;
}

disableButton();

buttonConnect.addEventListener('click', function (e) {
  e.preventDefault();
  client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
  client.subscribe(toSubscribe());
  console.log('connect button clicked...');


  client.on("connect", function () {
    console.log("Successfully connected");
    disableButton();
    enablePub();
  })
})


buttonPublish.addEventListener('click', function (p) {
  p.preventDefault();
  client.on("message", function (topic, payload) {
    console.log([topic, payload].join(": "));
    buttonPublish.disabled = true;
    enableButton();
    var table = document.getElementById("addValue");
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(-1);
    var cell2 = row.insertCell(1);
    cell1.innerHTML = toSubscribe();
    cell2.innerHTML = toPublish();
 
  })
    client.publish(toSubscribe(), toPublish()); 
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
