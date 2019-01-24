
var config = {
    apiKey: "AIzaSyAoR_BKWCLZ6VEpQTxkFAcy9VrwcYaa1fw",
    authDomain: "train-scheduler-86e64.firebaseapp.com",
    databaseURL: "https://train-scheduler-86e64.firebaseio.com",
    projectId: "train-scheduler-86e64",
    storageBucket: "train-scheduler-86e64.appspot.com",
    messagingSenderId: "368801926180"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("#addTrain").on("click", function(event){

    var trainName =$("#trainInput").val().trim();
    var destination=$("#destinationInput").val().trim();
    var frequency=$("frequencyInput").val().trim();
    var time=$("#timeInput").val().trim();

    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        startTime: time,
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.startTime);
  })