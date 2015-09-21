console.log("hey");

var calendarEvents;
var sendEvent = {
    summary: 'Squatting',
    location: '2014',
    start: '17:00:00.000Z',
    end: '18:00:00.000Z'
}



$(document).ready(function(){
    $('.whatevs').on('click', function(){
        getCalendar();
    });
    $('.fiddlesticks').on('click', function(){
        postCalendar();
    })
});

function getCalendar(){
    $.ajax({
        type: "GET",
        url: "/events",
        success: function(data){
            calendarEvents = data;
        }
    });
}



function postCalendar(){
    $.ajax({
        type: "POST",
        url:"/events",
        data: sendEvent,
        success: function(data){
            console.log(data);
            getCalendar();
        }
    })
}

function showEvents(){
    console.log(calendarEvents);

}