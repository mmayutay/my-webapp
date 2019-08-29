// basic functionalities

var buttonConnect = document.getElementById('connect-button');
var buttonPublish = document.getElementById('publish-button');


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


buttonConnect.addEventListener('click', function (e) {
  client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt");
  client.subscribe(toSubscribe());
  console.log('connect button clicked...');


  client.on("connect", function () {
    console.log("Successfully connected");
  })
})

buttonPublish.addEventListener('click', function (p) {
  p.preventDefault();
  client.on("message", function (topic, payload) {
    console.log([topic, payload].join(": "));
    document.getElementById('displayMessage').innerHTML = toPublish();
    document.getElementById('messages').innerHTML = toSubscribe();
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
