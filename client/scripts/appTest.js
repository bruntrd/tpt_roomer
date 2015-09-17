console.log("this is a console log");

var calendarEvents;

$(document).ready(function(){
    $('.whatevs').on('click', function(){
        getCalendar();
    });
});

function getCalendar(){
    $.ajax({
        type: "GET",
        url: "/events",
        success: function(data){
            calendarEvents = data;

            showEvents();

        }
    });
}

function showEvents(){
    console.log(calendarEvents);

}