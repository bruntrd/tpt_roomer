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

function bookRoomThirty(){
    $.ajax({
        type: "POST",
        url:"/events",
        data: postThirtyEvent,
        success: function(data){
            console.log(data);
            confirmationThirtyAlert($(this));
            setTimeout(function() { window.location.reload(true); }, 5000);
        },
        error: function(request){
            errorAlert($(this));
            location.reload();
        }
    })
}
function bookRoomSixty(){
    $.ajax({
        type: "POST",
        url:"/events",
        data: postSixtyEvent,
        success: function(data){
            console.log(data);
            confirmationSixtyAlert($(this));
            setTimeout(function() { window.location.reload(true); }, 5000);
        },
        error: function(request){
            errorAlert($(this));
            location.reload();
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
            console.log("HERE" + response.items);
            console.log("EVENT DATA: "+ eventData);
            //console.log(new Date(eventData[0].start.dateTime).getTime());
            console.log(eventData);

            //console.log(response.items[0].start.getTime());
            roomLoop();
            appendInfo();
            //console.log("this is reserver 60 time: "+ reserveSixtyTime);
            //console.log("this is reserve 30 time: "+ reserveThirtyTime);
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
    reserveSixtyTime = currentTime.getDate() + " " + monthNames[currentTime.getMonth()] + " " + currentTime.getFullYear() + " " + milSixtyTime + ":00";
    console.log("Look Here!" + reserveSixtyTime);
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
    setTimeout(function() {
        styler.parentNode.removeChild(styler);
    },duration);
    document.body.appendChild(styler);
}

// confirms a ~30 minute meeting has been booked
function confirmationThirtyAlert(room) {
    customConfirmationAlert("You have booked " + room.parent().attr('id') + " through " + thirtyTime,"4000");
    //location.reload();
}

// confirms a ~60 minute meeting has been booked
function confirmationSixtyAlert(room){
    customConfirmationAlert("You have booked " + room.parent().attr('id') +  " through " + sixtyTime, "4000");
    location.reload();
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
    console.log("error fired");
    var styler = document.createElement("div");
    styler.setAttribute("id","denialPopUp");
    styler.setAttribute("class","popUp");
    styler.innerHTML = "<div>Sorry! <div id='popUpNoBox'>" + room.parent().attr('id') + " was booked by someone else since you loaded the page.  Please choose a different conference room.</div><button id='confirmDoubleBook'>OK</button></div>";
    /*setTimeout(function() {
     styler.parentNode.removeChild(styler);
     },duration);*/
    document.body.appendChild(styler);
}

// loops through room array to append available conference rooms to the page
function appendInfo(){

    buttonTime();
    console.log("room array: ");
    console.log(roomArray);

    for(var i = 0; i<roomArray.length; i++){
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
            $('#rooms').append("<div class='roomBlock' id='" + roomArray[i].roomNumber + "'><div class='roomInfo'><h2 class='room text" + isLongRoom + "'>" + roomArray[i].roomNumber + "</h2><div class='icons'>" + computerIcon(i) + "<div class='icon theCapacityNum" + digits + "'>" + roomArray[i].capacity + "</div></div></div><div class='bookers'><button class='thirty btn btn-book bookerA'><span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>" + thirtyTime + "</button>" + assign60Button(i) + "</div></div></div>");
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
        return "<button class='sixty btn btn-book bookerB'><span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>" + sixtyTime + "</button>"
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
    autoRefresh(00,0);
    autoRefresh(15,0);
    autoRefresh(30,0);
    autoRefresh(45,0);

    $('#rooms').on('click', ".thirty", function(){
        var postLocation = $(this).parent().attr("id");
        postThirtyEvent = {
            summary: 'squatter@tpt.org',
            location: postLocation,
            start: currentTime.getFullYear() + '-0'+monthNum+ '-'+currentTime.getDate()+'T'+currentTime.getHours()+':'+currentTime.getMinutes()+':00'+'-05:00',
            end: currentTime.getFullYear() + '-0'+monthNum+'-'+currentTime.getDate()+'T'+milThirtyTime+':00'+'-05:00'
        };
        bookRoomThirty();
        //confirmationThirtyAlert($(this));
        //roomConfirmationThirty();
    });
    $('#rooms').on('click', ".sixty", function(){
        var postLocation = $(this).parent().attr("id");
        console.log("hey this is postlocation: " + postLocation);
        postSixtyEvent = {
            summary: 'squatter@tpt.org',
            location: postLocation,
            start: currentTime.getFullYear() + '-0'+monthNum+ '-'+currentTime.getDate()+'T'+currentTime.getHours()+':'+currentTime.getMinutes()+':00'+'-05:00',
            end: currentTime.getFullYear() + '-0'+monthNum+ '-'+currentTime.getDate()+'T'+milSixtyTime+':00'+'-05:00'
        };
        bookRoomSixty();
        //confirmationSixtyAlert($(this));
        //roomConfirmationSixty();
    });

////// This is temporary by Jim for testing purposes ///////
//    $('#rooms').on('click', ".computerStatusIcon", function(){
//        errorAlert($(this));
//
//    });


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