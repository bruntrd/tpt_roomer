////////// variables //////////
var currentTime = new Date();
var minutes = currentTime.getMinutes();
var thirtyTime;
var sixtyTime;
var timeArray = [];

////////// functions //////////

// function to calculate reservation end time based on rounded time on click
function buttonTime(){
    timeArray = [];
    if(minutes >= 45){
        thirtyTime = currentTime.getHours() + 1 + ":30";
        sixtyTime = currentTime.getHours() + 2 + ":00";
        if(parseInt(thirtyTime) > 12){
            thirtyTime = parseInt(thirtyTime) - 12 + ":30";
        }
        if(parseInt(sixtyTime) > 12){
            sixtyTime = parseInt(sixtyTime) - 12 + ":00";
        }
        console.log("Thirty Time: " + thirtyTime);
        console.log("Sixty Time: " + sixtyTime);
    }
    else if(minutes >= 30 && minutes < 45){
        thirtyTime = currentTime.getHours() + 1 + ":00";
        sixtyTime = currentTime.getHours() + 1 + ":30";
        if(parseInt(thirtyTime) > 12){
            thirtyTime = parseInt(thirtyTime) - 12 + ":00";
        }
        if(parseInt(sixtyTime) > 12){
            sixtyTime = parseInt(sixtyTime) - 12 + ":30";
        }
        console.log("Thirty Time: " + thirtyTime);
        console.log("Sixty Time: " + sixtyTime);
    }
    else if(minutes >= 15 && minutes < 30){
        thirtyTime = currentTime.getHours() + 1 + ":00";
        sixtyTime = currentTime.getHours() + 1 + ":30";
        if(parseInt(thirtyTime) > 12){
            thirtyTime = parseInt(thirtyTime) - 12 + ":00";
        }
        if(parseInt(sixtyTime) > 12){
            sixtyTime = parseInt(sixtyTime) - 12 + ":30";
        }
        console.log("Thirty Time: " + thirtyTime);
        console.log("Sixty Time: " + sixtyTime);
    }
    else if(minutes <15 &&  minutes >= 0){
        thirtyTime = currentTime.getHours() + ":30";
        sixtyTime = currentTime.getHours() + 1 + ":00";
        if(parseInt(thirtyTime) > 12){
            thirtyTime = parseInt(thirtyTime) - 12 + ":30";
        }
        if(parseInt(sixtyTime) > 12){
            sixtyTime = parseInt(sixtyTime) - 12 + ":00";
        }
        console.log("Thirty Time: " + thirtyTime);
        console.log("Sixty Time: " + sixtyTime);
    }
    timeArray.push(thirtyTime);
    timeArray.push(sixtyTime);
    console.log(timeArray);
}

// NOT FUNCTIONAL - reserves a room for 30 min. via google calendar
function roomConfirmationThirty(){
    $.ajax({
        //this needs to book a room for 30 min. via google calendar
        url: skdjf,
        success: function(response){
            confirmationThirtyAlert($(this));
            location.reload(); // need to test - should refresh page
        },
        error: function(request){
            errorAlert($(this));
            location.reload(); // need to test - should refresh page
        }
    })
}

// NOT FUNCTIONAL - reserves a room for 60 min. via google calendar
function roomConfirmationSixty(){
    $.ajax({
        //this needs to book a room for 60 min. via google calendar
        url: skdjf,
        success: function(response){
            confirmationSixtyAlert($(this));
            location.reload(); // need to test - should refresh page
        },
        error: function(request){
            errorAlert($(this));
            location.reload(); // need to test - should refresh page
        }
    })
}


// NOT FUNCTIONAL - populates calendar data from google calendar
function ajaxCall(){
    $.ajax({
        url:knjnkm , //need from cat and ryan
        success: function(response){
            appendInfo(response);
        },
        error: function(request, errorType, errorMessage){
            alert(errorType + " " + errorMessage);
        }
    });
}

// custom dialogue box for reservation confirmation alert message
function customConfirmationAlert(msg,duration) {
    var styler = document.createElement("div");
    styler.setAttribute("id","confirmationPopUp");
    styler.innerHTML = "<h1>"+msg+"</h1>";
    setTimeout(function() {
        styler.parentNode.removeChild(styler);
    },duration);
    document.body.appendChild(styler);
}

// confirms a ~30 minute meeting has been booked
function confirmationThirtyAlert(room) {
    customConfirmationAlert("You have booked " + room.parent().attr('id') + " through " + thirtyTime,"4000");
}

// confirms a ~60 minute meeting has been booked
function confirmationSixtyAlert(room){
    customConfirmationAlert("You have booked " + room.parent().attr('id') +  " through " + sixtyTime, "4000");
}

// custom dialogue box for error alert
//function customErrorAlert(msg,duration) {
//    var styler = document.createElement("div");
//    styler.setAttribute("style","border: solid 5px Red;width:auto;height:auto;top:50%;left:40%;background-color:#444;color:Silver;position:fixed");
//    styler.innerHTML = "<h1>"+msg+"</h1>";
//    setTimeout(function()
//    {
//        styler.parentNode.removeChild(styler);
//    },duration);
//    document.body.appendChild(styler);
//}

// error message if someone tries to book a room that has JUST been booked by someone else.
function errorAlert(room) {
    alert("Sorry! " + room.parent().attr('id') + " was booked by someone else since you loaded the page.  Please choose a different conference room.");
}

// loops through room array to append available conference rooms to the page
function appendInfo(){
    buttonTime();
    for(var i = 0; i<roomArray.length; i++){
        //if the room is available for at least 1/2 hour then append it
        //if the room is available for less than one hour append it else "unavailable"
        $('#rooms').append("<div id='" + roomArray[i].roomNumber + "'><p class='room text availYellow'>" + roomArray[i].roomNumber + " Capacity: " + roomArray[i].capacity + "</p><button class='thirty btn btn-book'><span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>" + thirtyTime + "</button><button class='sixty btn btn-book'><span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>" + sixtyTime + "</button></div>");
        //if room contains a computer then append the computer icon
    }
}

// refreshes page every quarter hour
function autoRefresh(minutes, seconds) {
    var now = new Date();
    var then = new Date();

    if(now.getMinutes() > minutes ||
        (now.getMinutes() == minutes && now.getSeconds() > seconds) ||
        now.getMinutes() == minutes && now.getSeconds() == seconds) {
        then.setDate(now.getDate() + 1);
    }
    then.setMinutes(minutes);
    then.setSeconds(seconds);

    var timeout = (then.getTime() - now.getTime());
    setTimeout(function() { window.location.reload(true); }, timeout);
}

////////// Document Ready //////////
$(document).ready(function(){

    buttonTime();
    appendInfo();

    // triggers to refresh page on each quarter hour
    autoRefresh(00,0);
    autoRefresh(15,0);
    autoRefresh(30,0);
    autoRefresh(45,0);



    $('#rooms').on('click', ".thirty", function(){
        confirmationThirtyAlert($(this));
        console.log("THIS!");
        //roomConfirmationThirty();
    });
    $('#rooms').on('click', ".sixty", function(){
        confirmationSixtyAlert($(this));
        //roomConfirmationSixty();
    });


}); // end document ready



var roomArray = [
    {
        roomNumber:"CR " + 2161,
        capacity: 10,
        computer: true
    },
    {
        roomNumber: "CR " + 3212,
        capacity: 10,
        computer: true
    },
    {
        roomNumber: "CR " + 3487,
        capacity: 4,
        computer: false
    },
    {
        roomNumber: "CR " + 4112,
        capacity: 4,
        computer: false
    },
    {
        roomNumber: "CR " + 4141,
        capacity: 4,
        computer: false
    },
    {
        roomNumber:"CR " + 4181,
        capacity: 8,
        computer: true
    },
    {
        roomNumber:"CR " + 4211,
        capacity: 4,
        computer: false
    },
    {
        roomNumber:"CR " + 4245,
        capacity: 111,
        computer: "uknown"
    },
    {
        roomNumber:"CR " + 4261,
        capacity: 4,
        computer: false
    },
    {
        roomNumber:"CR " + 4312,
        capacity: 6,
        computer: false
    },{
        roomNumber:"CR " + 4416,
        capacity: 8,
        computer: false
    },
    {
        roomNumber:"CR " + 4487,
        capacity: 6,
        computer: false
    },
    {
        roomNumber:"CR " + 4541,
        capacity: 10,
        computer: true
    },
    {
        roomNumber:"The Boardroom",
        capacity: 36,
        computer: true
    },
    {
        roomNumber:"The Street Space",
        capacity: "unknown",
        computer: "unknown"
    },
    {
        roomNumber:"Training Room",
        capacity: 16,
        computer: true
    }

];