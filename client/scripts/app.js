////////// variables //////////
var currentTime = new Date();
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
var minutes = currentTime.getMinutes();
var thirtyTime;
var sixtyTime;
var reserveSixtyTime;
var reserveThirtyTime;
var eventData;


////////// functions //////////

// function to calculate reservation end time based on rounded time on click
function buttonTime() {
    if (minutes >= 45) {
        thirtyTime = currentTime.getHours() + 1 + ":30";
        sixtyTime = currentTime.getHours() + 2 + ":00";
        milThirtyTime = currentTime.getHours() + 1 + ":30";
        milSixtyTime = currentTime.getHours() + 2 + ":00";
        if (parseInt(thirtyTime) > 12) {
            thirtyTime = parseInt(thirtyTime) - 12 + ":30";
        }
        if (parseInt(sixtyTime) > 12) {
            sixtyTime = parseInt(sixtyTime) - 12 + ":00";
        }
    }
    else if (minutes >= 30 && minutes < 45) {
        thirtyTime = currentTime.getHours() + 1 + ":00";
        sixtyTime = currentTime.getHours() + 1 + ":30";
        milThirtyTime = currentTime.getHours() + 1 + ":00";
        milSixtyTime = currentTime.getHours() + 1 + ":30";
        if (parseInt(thirtyTime) > 12) {
            thirtyTime = parseInt(thirtyTime) - 12 + ":00";
        }
        if (parseInt(sixtyTime) > 12) {
            sixtyTime = parseInt(sixtyTime) - 12 + ":30";
        }
    }
    else if (minutes >= 15 && minutes < 30) {
        thirtyTime = currentTime.getHours() + 1 + ":00";
        sixtyTime = currentTime.getHours() + 1 + ":30";
        milThirtyTime = currentTime.getHours() + 1 + ":00";
        milSixtyTime = currentTime.getHours() + 1 + ":30";
        if (parseInt(thirtyTime) > 12) {
            thirtyTime = parseInt(thirtyTime) - 12 + ":00";
        }
        if (parseInt(sixtyTime) > 12) {
            sixtyTime = parseInt(sixtyTime) - 12 + ":30";
        }
    }
    else if (minutes < 15 && minutes >= 0) {
        thirtyTime = currentTime.getHours() + ":30";
        sixtyTime = currentTime.getHours() + 1 + ":00";
        milThirtyTime = currentTime.getHours() + ":30";
        milSixtyTime = currentTime.getHours() + 1 + ":00";
        if (parseInt(thirtyTime) > 12) {
            thirtyTime = parseInt(thirtyTime) - 12 + ":30";
        }
        if (parseInt(sixtyTime) > 12) {
            sixtyTime = parseInt(sixtyTime) - 12 + ":00";
        }
    }
}


// NOT FUNCTIONAL - reserves a room for 30 min. via google calendar
function roomConfirmationThirty(){
    $.ajax({
        //this needs to book a room for 30 min. via google calendar
        url: s,
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
        type: 'GET',
        url: '/events',
        success: function(response){
            eventData = response.items;
            //console.log(new Date(eventData[0].start.dateTime).getTime());
            console.log(eventData);

            //console.log(response.items[0].start.getTime());
            roomLoop();
            appendInfo();
            return eventData;

        },
        error: function(request, errorType, errorMessage){
            alert(errorType + " " + errorMessage);
        }
    });
}

function data30Loop(i){
    reserveThirtyTime = currentTime.getDate() + " " + monthNames[currentTime.getMonth()] + " " + currentTime.getFullYear() + " " + thirtyTime + ":00";
    for(var j = 0; j < eventData.length; j++) {
        if (eventData[j].location == roomArray[i].roomNumber) {
            if (new Date(eventData[j].end.dateTime).getTime() > currentTime.getTime() && currentTime.getTime() > new Date(eventData[j].start.dateTime).getTime()) {
                return roomArray[i].available30 = false;
            }
            else if (currentTime.getTime() < new Date(eventData[j].start.dateTime).getTime() && new Date(eventData[j].start.dateTime).getTime() < Date.parse(reserveThirtyTime)) {
                return roomArray[i].available30 = false;
            }
            else if (currentTime.getTime() <= new Date(eventData[j].start.dateTime).getTime() && Date.parse(reserveThirtyTime) >= new Date(eventData[j].end.dateTime).getTime()) {
                return roomArray[i].available30 = false;
            }
            else if (currentTime.getTime() >= new Date(eventData[j].start.dateTime).getTime() && Date.parse(reserveThirtyTime) <= new Date(eventData[j].end.dateTime).getTime()) {
                return roomArray[i].available30 = false;
            }
            else{
                return roomArray[i].available30 = true;
            }
        }
    }
}

// checks for 60 min meeting and sets data flag to false if necessary
function data60Loop(i) {
    reserveSixtyTime = currentTime.getDate() + " " + monthNames[currentTime.getMonth()] + " " + currentTime.getFullYear() + " " + sixtyTime + ":00";
    for (var j = 0; j < eventData.length; j++) {
        if (eventData[j].location == roomArray[i].roomNumber) {
            if (new Date(eventData[j].end.dateTime).getTime() > currentTime.getTime() && currentTime.getTime() > new Date(eventData[j].start.dateTime).getTime()) {
                return roomArray[i].available60 = false;
            }
            else if (currentTime.getTime() < new Date(eventData[j].start.dateTime).getTime() && new Date(eventData[j].start.dateTime).getTime() < Date.parse(reserveSixtyTime)) {
                return roomArray[i].available60 = false;
            }
            else if (currentTime.getTime() <= new Date(eventData[j].start.dateTime).getTime() && Date.parse(reserveSixtyTime) >= new Date(eventData[j].end.dateTime).getTime()) {
                return roomArray[i].available60 = false;
            }
            else if (currentTime.getTime() >= new Date(eventData[j].start.dateTime).getTime() && Date.parse(reserveSixtyTime) <= new Date(eventData[j].end.dateTime).getTime()) {
                return roomArray[i].available60 = false;
            }
            else {
                return roomArray[i].available60 = true;
            }
        }
    }
}

 //loops through rooms to change data flags
function roomLoop(){
    for(var i = 0; i < roomArray.length; i++){
        data30Loop(i);
        data60Loop(i);
    }
}

////////// The Block Edited by Jim. Keep as is////////
// custom dialogue box for reservation confirmation alert message
function customConfirmationAlert(msg,duration) {
    var styler = document.createElement("div");
    styler.setAttribute("id","confirmationPopUp");
    styler.setAttribute("class","popUp");
    styler.innerHTML = "<div>Confirmation<div id='popUpYesBox'>" + msg + ".</div></div>";
    /*setTimeout(function() {
        styler.parentNode.removeChild(styler);
    },duration);*/
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

//function used within appendInfo function to display computer icon for boolean true
function computerIcon(i){
    if (roomArray[i].computer == true){
        return '<img src="/assets/images/computer.png" class="icon computerStatusIcon col-md-4 col-sm-4 col-xs-4">'
    } else
    return "";
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

////////// The Block Edited by Jim. Keep as is////////
// error message if someone tries to book a room that has JUST been booked by someone else.
function errorAlert(room) {
    console.log("error fired");
    var styler = document.createElement("div");
    styler.setAttribute("id","denialPopUp");
    styler.setAttribute("class","popUp");
    styler.innerHTML = "<div>Sorry! <div id='popUpNoBox'>" + room.parent().attr('id') + " was booked by someone else since you loaded the page.  Please choose a different conference room.</div></div>";
    /*setTimeout(function() {
     styler.parentNode.removeChild(styler);
     },duration);*/
    document.body.appendChild(styler);
}

// loops through room array to append available conference rooms to the page
function appendInfo(){
    buttonTime();
    for(var i = 0; i<roomArray.length; i++){
        //if the room is available for at least 1/2 hour then append it
        //if the room is available for less than one hour append it else "unavailable"
        if(roomArray[i].available30 == true) {
            $('#rooms').append("<div class='container room30' id='" + roomArray[i].roomNumber + "'><h2 class='room text availYellow'>" + roomArray[i].roomNumber + "</h2><div class='icon theCapacityNum col-md-8 col-sm-8 col-xs-8'>" + roomArray[i].capacity + "</div>" + computerIcon(i) + "<button class='thirty btn btn-book'><span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>" + thirtyTime + "</button>" + assign60Button(i) + "</div>");
            //if room contains a computer then append the computer icon
        }else {
            console.log(roomArray[i].roomNumber + " " + roomArray[i].available30);
            console.log(roomArray[i].roomNumber + 'not appended');
        }
        }
}


//// determines which 60 button to append
function assign60Button(i){
    if(roomArray[i].available60 == true){
        // 60 min button
        return "<button class='sixty btn btn-book'><span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>" + sixtyTime + "</button>"
    }
    else{
        // unavailable button
        return "<button class='btn btn-disabled bookerB'>Unavailable</button>"
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
    ajaxCall();

    //console.log(currentTime.getDate() + " " + monthNames[currentTime.getMonth()] + " " + currentTime.getFullYear() + " " + thirtyTime + ":00"
    //);
    //var jack = currentTime.getDate() + " " + monthNames[currentTime.getMonth()] + " " + currentTime.getFullYear() + " " + thirtyTime + ":00";
    //console.log(Date.parse(reserveThirtyTime));
    //console.log(Date.parse("Mon, 25 Dec 1995"));
    //console.log(Date.parse("Mon, 25 Dec 1995 13:30:00"));
    //console.log(Date.parse("25 Dec 1995 13:30:00"));
    //console.log(currentTime.getDate());
    //console.log(currentTime.getMonth());
    //console.log(currentTime.getFullYear());
    //console.log(Date.parse(jack));

    //shows as miliseconds
    //console.log(Date.parse("2015-09-18T10:00:00-05:00"));
    //shows as NaN
    //console.log("milTime:" + Date.parse(milSixtyTime));

    //appendInfo();
    //console.log("current time: " + currentTime.getTime());
    //console.log(currentTime.getYear());

    // triggers to refresh page on each quarter hour
    autoRefresh(00,0);
    autoRefresh(15,0);
    autoRefresh(30,0);
    autoRefresh(45,0);



    $('#rooms').on('click', ".thirty", function(){
        ajaxCall();
        //confirmationThirtyAlert($(this));
        //console.log("THIS!");
        //roomConfirmationThirty();
    });
    $('#rooms').on('click', ".sixty", function(){
        confirmationSixtyAlert($(this));
        //roomConfirmationSixty();
    });
////// This is temporary by Jim for testing purposes ///////
    $('#rooms').on('click', ".computerStatusIcon", function(){
        errorAlert($(this));

    });


}); // end document ready



var roomArray = [
    {
        roomNumber:"CR " + 2161,
        capacity: 10,
        computer: true,
        available30: true,
        available60: true
    },
    {
        roomNumber: "CR " + 3212,
        capacity: 36,
        computer: true,
        available30: true,
        available60: true
    },
    {
        roomNumber: "CR " + 3487,
        capacity: 6,
        computer: false,
        available30: true,
        available60: true
    },
    {
        roomNumber: "CR " + 4112,
        capacity: 6,
        computer: false,
        available30: true,
        available60: true
    },
    {
        roomNumber: "CR " + 4141,
        capacity: 6,
        computer: false,
        available30: true,
        available60: true
    },
    {
        roomNumber:"CR " + 4181,
        capacity: 8,
        computer: true,
        available30: true,
        available60: true
    },
    {
        roomNumber:"CR " + 4211,
        capacity: 8,
        computer: false,
        available30: true,
        available60: true
    },
    {
        roomNumber:"CR " + 4245,
        capacity: 4,
        computer: false,
        available30: true,
        available60: true
    },
    {
        roomNumber:"CR " + 4261,
        capacity: 8,
        computer: false,
        available30: true,
        available60: true
    },
    {
        roomNumber:"CR " + 4312,
        capacity: 8,
        computer: false,
        available30: true,
        available60: true
    },
    {
        roomNumber:"CR " + 4416,
        capacity: 8,
        computer: false,
        available30: true,
        available60: true
    },
    {
        roomNumber:"CR " + 4487,
        capacity: 4,
        computer: false,
        available30: true,
        available60: true
    },
    {
        roomNumber:"CR " + 4541,
        capacity: 12,
        computer: true,
        available30: true,
        available60: true
    },
    {
        roomNumber:"Boardroom",
        capacity: 36,
        computer: true,
        available30: true,
        available60: true
    },
    {
        roomNumber:"Street Space",
        capacity: 20,
        computer: true,
        available30: true,
        available60: true
    },
    {
        roomNumber:"Training Room",
        capacity: 16,
        computer: true,
        available30: true,
        available60: true
    }

];