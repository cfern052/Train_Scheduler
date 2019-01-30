
$(document).ready(function () {


    var config = {
        apiKey: "AIzaSyAoR_BKWCLZ6VEpQTxkFAcy9VrwcYaa1fw",
        authDomain: "train-scheduler-86e64.firebaseapp.com",
        databaseURL: "https://train-scheduler-86e64.firebaseio.com",
        projectId: "train-scheduler-86e64",
        storageBucket: "train-scheduler-86e64.appspot.com",
        messagingSenderId: "368801926180"
    };

    firebase.initializeApp(config);

    var dataRef = firebase.database();

    var trainName = '';
    var destination = '';
    var frequency = 0;
    var time = '';



$("#addTrain").on("click", function (event) {
    event.preventDefault();
    //get input
    var trainName = $("#trainInput").val().trim();
    var destination = $("#destinationInput").val().trim();
    var frequency = $("#frequencyInput").val();
    var time = $("#timeInput").val().trim();
    //creates temp object for holding data
    var newTrain = {
        name: trainName,
        destination: destination,
        frequency: frequency,
        startTime: time,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
    //uploads it to the database        
    dataRef.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.frequency);
    console.log(newTrain.startTime);
    // alert("All aboard! Your train has been added to the schedule");

    $("#trainInput").val("");
    $("#destinationInput").val("");
    $("#frequencyInput").val("");
    $("#timeInput").val("");

});





//Firebase event for adding train and a row in the html 
dataRef.ref().on("child_added", function (childSnapshot) {
    //stores data
    var sv = childSnapshot.val();
    var tName = sv.name;
    var tDest = sv.destination;
    var tFreq = sv.frequency;
    var tStart = sv.startTime;

    console.log(sv.name);
    console.log(sv.destination);
    console.log(sv.frequency);
    console.log(sv.startTime);
    //make new row
    var newRow = $('<tr>').append(
        $("<td>").text(tName),
        $("<td>").text(tDest),
        $("<td>").text(tFreq),
        $("<td>").text(tStart),
    );

    $("#trainTable").append(newRow);

});

});




