////////// variables //////////
var currentTime = new Date();
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
var monthNum = currentTime.getMonth()+1;
var minutes = currentTime.getMinutes();
var thirtyTime;
var sixtyTime;
var reserveSixtyTime;
var reserveThirtyTime;
var eventData;
var postThirtyEvent;
var postSixtyEvent;
var milThirtyTime;
var milSixtyTime;


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

function bookRoomThirty(btn){

    $.ajax({
        type: "POST",
        url:"/events",
        data: postThirtyEvent,
        success: function(data){
            confirmationThirtyAlert(btn);
            setTimeout(function() { window.location.reload(true); }, 3001);
        },
        error: function(request){
            errorAlert($(this));
        }
    })
}
function bookRoomSixty(btn){
    $.ajax({
        type: "POST",
        url:"/events",
        data: postSixtyEvent,
        success: function(data){
            confirmationSixtyAlert(btn);
            setTimeout(function() { window.location.reload(true); }, 3001);
        },
        error: function(request){
            errorAlert($(this));
        }
    })
}

//// NOT FUNCTIONAL - reserves a room for 30 min. via google calendar
//function roomConfirmationThirty(){
//    $.ajax({
//        //this needs to book a room for 30 min. via google calendar
//        url: s,
//        success: function(response){
//            confirmationThirtyAlert($(this));
//            location.reload(); // need to test - should refresh page
//        },
//        error: function(request){
//            errorAlert($(this));
//            location.reload(); // need to test - should refresh page
//        }
//    })
//}
//
//// NOT FUNCTIONAL - reserves a room for 60 min. via google calendar
//function roomConfirmationSixty(){
//    $.ajax({
//        //this needs to book a room for 60 min. via google calendar
//        url: skdjf,
//        success: function(response){
//            confirmationSixtyAlert($(this));
//            location.reload(); // need to test - should refresh page
//        },
//        error: function(request){
//            errorAlert($(this));
//            location.reload(); // need to test - should refresh page
//        }
//    })
//}

// NOT FUNCTIONAL - populates calendar data from google calendar
function ajaxCall(){
    $.ajax({
        type: 'GET',
        url: '/events',
        success: function(response){
            eventData = response.items;

            console.log("EVENT DATA: ");
            console.log(eventData);

            roomLoop();
            appendInfo();
            //console.log(roomArray[1].available30);
            //console.log(roomArray[1].available60);

            return eventData;

        },
        error: function(request, errorType, errorMessage){
            alert(errorType + " " + errorMessage);
        }
    });
}

function data30Loop(i){
    reserveThirtyTime = currentTime.getDate() + " " + monthNames[currentTime.getMonth()] + " " + currentTime.getFullYear() + " " + milThirtyTime + ":00";
    for(var j = 0; j < eventData.length; j++) {
        if (eventData[j].location == roomArray[i].roomNumber) {
            if (new Date(eventData[j].end.dateTime).getTime() > currentTime.getTime() && currentTime.getTime() > new Date(eventData[j].start.dateTime).getTime()) {
                console.log(roomArray[i].roomNumber + " flag = false, 1");
                return roomArray[i].available30 = false;

            }
            else if (currentTime.getTime() < new Date(eventData[j].start.dateTime).getTime() && new Date(eventData[j].start.dateTime).getTime() < Date.parse(reserveThirtyTime)) {
                console.log(roomArray[i].roomNumber + " flag = false, 2");
                return roomArray[i].available30 = false;

            }
            else if (currentTime.getTime() <= new Date(eventData[j].start.dateTime).getTime() && Date.parse(reserveThirtyTime) >= new Date(eventData[j].end.dateTime).getTime()) {
                console.log(roomArray[i].roomNumber + " flag = false, 3");
                return roomArray[i].available30 = false;
            }
            else if (currentTime.getTime() >= new Date(eventData[j].start.dateTime).getTime() && Date.parse(reserveThirtyTime) <= new Date(eventData[j].end.dateTime).getTime()) {
                console.log(roomArray[i].roomNumber + " flag = false, 4");
                return roomArray[i].available30 = false;
            }
        }
    }
}


// checks for 60 min meeting and sets data flag to false if necessary
function data60Loop(i) {
    reserveSixtyTime = currentTime.getDate() + " " + monthNames[currentTime.getMonth()] + " " + currentTime.getFullYear() + " " + milSixtyTime + ":00";
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

////////// This Block Edited by Jim. Keep as is////////
// custom dialogue box for reservation confirmation alert message
function customConfirmationAlert(msg) {
    //console.log("customConf coming up");
    var styler = document.createElement("div");
    styler.setAttribute("id","confirmationPopUp");
    styler.setAttribute("class","popUp");
    styler.innerHTML = "<div>Confirmation<div id='popUpYesBox'>" + msg + ".</div></div>";
    setTimeout(function() {
        styler.parentNode.removeChild(styler);
    },3000);
    document.body.appendChild(styler);
}

// confirms a ~30 minute meeting has been booked
function confirmationThirtyAlert(room) {
    //console.log("room");
    //console.log(room);
    customConfirmationAlert("You have booked <br><span class='roomHighlight'>" + room.attr('id') + "</span> through " + thirtyTime);
}

// confirms a ~60 minute meeting has been booked
function confirmationSixtyAlert(room){
    customConfirmationAlert("You have booked <br><span class='roomHighlight'>" + room.attr('id') + "</span> through " + sixtyTime);
}

//function used within appendInfo function to display computer icon for boolean true
function computerIcon(i){
    if (roomArray[i].computer == true){
        return '<div>' + '<img src="/assets/images/computer.svg" class="icon computerStatusIcon" onerror="/assets/images/computer.png">' + '</div>';
    } else
    return '<div class="icon noComputerStatusIcon"></div>';
}


////////// The Block Edited by Jim. Keep as is////////
// error message if someone tries to book a room that has JUST been booked by someone else.
function errorAlert(room) {
    var styler = document.createElement("div");
    styler.setAttribute("id","denialPopUp");
    styler.setAttribute("class","popUp");
    styler.innerHTML = "<div>Sorry! <div id='popUpNoBox'><span class='roomHighlight'>" + room.parent().attr('id') + "</span> was booked by someone else since you loaded the page.  Please choose a different conference room.</div><button id='confirmDoubleBook'>OK</button></div>";
    document.body.appendChild(styler);
    $('#theBody').on('click', "#confirmDoubleBook", function() {
        styler.parentNode.removeChild(styler);
        location.reload();
    });
}

// this function appends a message to the page if no rooms are available to be booked
function blankPageMessage(){
    var trueArray = [];
    for(var k = 0; k < roomArray.length; k++){
        if(roomArray[k].available30 == true){
            trueArray.push(roomArray[k].roomNumber);
        }
    }
    console.log(trueArray);
    if (trueArray.length == 0){
        $('#rooms').append('<div id="denialPopUp"><div><h2>Sorry!</h2><div id="popUpNoBox">There are currently no rooms available to reserve.</div></div></div>')
    }
}

// loops through room array to append available conference rooms to the page
function appendInfo(){

    //buttonTime();
    //console.log("room array: ");
    //console.log(roomArray);

    blankPageMessage();

    for(var i = 0; i < roomArray.length; i++){
        //checks capacity and sets a class accordingly.
        var digits = "";
        if(roomArray[i].capacity > 9){
            digits = " digits2";
        } else
            digits = " digits1";
        //checks for the number of characters in a room title and adds a class if it's more than 11
        var isLongRoom = "";
        if(roomArray[i].roomNumber.length > 8){isLongRoom = " longRoom"}
        //if the room is available for at least 1/2 hour then append it
        //if the room fis available for less than one hour append it else "unavailable"
        if(roomArray[i].available30 == true) {
            $('#rooms').append("<div class='roomBlock' id='" + roomArray[i].roomNumber + "'><div class='roomInfo'><h2 class='room text" + isLongRoom + "'>" + roomArray[i].roomNumber + "</h2><div class='icons'>" + computerIcon(i) + "<div class='icon theCapacityNum" + digits + "'>" + roomArray[i].capacity + "</div></div></div><div class='bookers'><button class='thirty btn btn-book bookerA' id='" + roomArray[i].roomNumber + "'><span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>" + thirtyTime + "</button>" + assign60Button(i) + "</div></div></div>");
            //if room contains a computer then append the computer icon
        }else {
            //console.log(roomArray[i].roomNumber + " " + roomArray[i].available30);
            //console.log(roomArray[i].roomNumber + 'not appended');
        }
    }
}


//// determines which 60 button to append
function assign60Button(i){
    if(roomArray[i].available60 == true){
        // 60 min button
        return "<button class='sixty btn btn-book bookerB' id='" + roomArray[i].roomNumber + "'><span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>" + sixtyTime + "</button>"
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

    // triggers to refresh page on each quarter hour
    /*autoRefresh(00,0);
    autoRefresh(15,0);
    autoRefresh(30,0);
    autoRefresh(45,0);*/

    $('#rooms').on('click', ".thirty", function(){
        var btn=$(this);
        var postLocation = $(this).attr("id");
        postThirtyEvent = {
            summary: 'squatter@tpt.org',
            location: postLocation,
            start: currentTime.getFullYear() + '-0'+monthNum+ '-'+currentTime.getDate()+'T'+currentTime.getHours()+':'+currentTime.getMinutes()+':00'+'-05:00',
            end: currentTime.getFullYear() + '-0'+monthNum+'-'+currentTime.getDate()+'T'+milThirtyTime+':00'+'-05:00'
        };
        bookRoomThirty(btn);
        var overlay = $("<div style='width:10000px; height: 9999px; margin-left: -5000px; top: 0; z-index: 100; position: absolute; background: lightgray; opacity: 0.5; text-align: center; font-size: large; padding-top: 25%; font-weight: bold;'></div>");
        $("body").append(overlay);
    });
    $('#rooms').on('click', ".sixty", function(){
        var btn=$(this);
        var postLocation = $(this).attr("id");
        //console.log("hey this is postlocation: " + postLocation);
        postSixtyEvent = {
            summary: 'squatter@tpt.org',
            location: postLocation,
            start: currentTime.getFullYear() + '-0'+monthNum+ '-'+currentTime.getDate()+'T'+currentTime.getHours()+':'+currentTime.getMinutes()+':00'+'-05:00',
            end: currentTime.getFullYear() + '-0'+monthNum+ '-'+currentTime.getDate()+'T'+milSixtyTime+':00'+'-05:00'
        };
        bookRoomSixty(btn);
        var overlay = $("<div style='width:10000px; height: 9999px; margin-left: -5000px; top: 0; z-index: 100; position: absolute; background: lightgray; opacity: 0.5; text-align: center; font-size: large; padding-top: 25%; font-weight: bold;'></div>");
        $("body").append(overlay);
        //confirmationSixtyAlert($(this));
        //roomConfirmationSixty();
    });

//// This is temporary by Jim for testing purposes ///////
    $('#rooms').on('click', ".computerStatusIcon", function(){
        var overlay = $("<div style='width:10000px; height: 9999px; margin-left: -5000px; top: 0; z-index: 100; position: absolute; background: lightgray; opacity: 0.5; text-align: center; font-size: large; padding-top: 25%; font-weight: bold;'></div>");
        $("body").append(overlay);
        errorAlert($(this));

    });


}); // end document ready

//array of info for each meeting room

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