console.log("this is a console log");
//variables
var currentTime = new Date();
var minutes = currentTime.getMinutes();
var thirtyTime;
var sixtyTime;
var timeArray = [];

//functions
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

//function roomConfirmation(){
//    $.ajax({
//        url: skdjf,
//        success: function(response){
//            confirmationAlert();
//        },
//        error: function(request){
//            errorAlert();
//        }
//    })
//}

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
function customConfirmationAlert(msg,duration)
{
    var styler = document.createElement("div");
    styler.setAttribute("style","border: solid 5px Red;width:auto;height:auto;top:50%;left:40%;background-color:#444;color:Silver;position:fixed");
    styler.innerHTML = "<h1>"+msg+"</h1>";
    setTimeout(function()
    {
        styler.parentNode.removeChild(styler);
    },duration);
    document.body.appendChild(styler);
}
function confirmationAlert()
{
    customConfirmationAlert("You have booked" + roomArray[i].roomNumber + "through" + thirtyTime,"5000");
}

function customErrorAlert(msg,duration)
{
    var styler = document.createElement("div");
    styler.setAttribute("style","border: solid 5px Red;width:auto;height:auto;top:50%;left:40%;background-color:#444;color:Silver;position:fixed");
    styler.innerHTML = "<h1>"+msg+"</h1>";
    setTimeout(function()
    {
        styler.parentNode.removeChild(styler);
    },duration);
    document.body.appendChild(styler);
}
function errorAlert()
{
    customErrorAlert("This is the error alert","5000");
}


function appendInfo(){
    buttonTime();
    for(var i = 0; i<roomArray.length; i++){
        //if the room is available for at least 1/2 hour then append it
        //if the room is available for less than one hour append it else "unavailable"
        $('#rooms').append("<div id=''><p class='room text availYellow'>" + roomArray[i].roomNumber + "</p><button class='thirty btn btn-book'><span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>" + thirtyTime + "</button><button class='sixty btn btn-book'><span class='glyphicon glyphicon-arrow-right' aria-hidden='true'></span>" + sixtyTime + "</button></div>");
    }

    //$.each(response, function(index, response){
    //    //$('#rooms').append("<div><button>" + thirtyTime + "</button><button>" + sixtyTime + "</button></div>");
    //});
}


$(document).ready(function(){
    //confirmationAlert();
    buttonTime();
    appendInfo();
//console.log(new Date().getTime());
    //$('#rooms').append("<div><button>" + thirtyTime + "</button><button>" + sixtyTime + "</button></div>");
    $('#rooms').on('click', '.thirty', function(){
        console.log(confirmationAlert());
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