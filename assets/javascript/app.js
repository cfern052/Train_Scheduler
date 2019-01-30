
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

        var trainName = $("#trainInput").val().trim();
        var destination = $("#destinationInput").val().trim();
        var frequency = $("#frequencyInput").val();
        var time = $("#timeInput").val().trim();

        var newTrain = {
            name: trainName,
            destination: destination,
            frequency: frequency,
            startTime: time,
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        };
        dataRef.ref().push(newTrain);

        console.log(newTrain.name);
        console.log(newTrain.destination);
        console.log(newTrain.frequency);
        console.log(newTrain.startTime);
        // alert("All aboard! Your train has been added to the schedule");
    });




    $("#trainInput").val("");
    $("#destinationInput").val("");
    $("frequencyInput").val("");
    $("#timeInput").val("");


    dataRef.ref().on("child_added", function (childSnapshot) {

        var sv = childSnapshot.val();
        console.log(sv.name);
        console.log(sv.destination);
        console.log(sv.frequency);
        console.log(sv.startTime);

        $("#trainTable").append("<tr class='well row'><td class='trainName col-2'> " +
            sv.name +
            " </td><td class='trainDestination col-2'> " + sv.destination +
            " </td><td class='trainFrequency col-2'> " + sv.frequency +
            " </td><td class='trainStart col-2'> " + sv.startTime +
            " </td></tr></tbody>");
        // My Stuff
        // $("<tr class='well row'><td class='trainName col-2'> " +
        //     sv.name +
        //     " </td><td class='trainDestination col-2'> " + sv.destination +
        //     " </td><td class='trainFrequency col-2'> " + sv.frequency +
        //     " </td><td class='trainStart col-2'> " + sv.startTime +
        //     " </td></tr></tbody>").appendTo("#trainTable tbody");
        // End My Stuff

            dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
                // Change the HTML to reflect
                $("#name-display").text(sv.name);
                $("#destination-display").text(sv.destination);
                $("#frequency-display").text(sv.frequency);
                $("#start-display").text(sv.startTime);
              });

    }, function (errorObject) {
        console.log("Errors handled: " + errorObject.code);
    });


  

});
