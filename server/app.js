var express = require('express');
var app = express();
var index = require('./routes/index');
var events = require('./routes/events');
var calendar = require('./routes/calendar');




var server = app.listen(3000, function(){
    var port=server.address().port;
    console.log("Listening on port: ", port);
});


app.use("/events", events);
app.use("/index", index);
app.use("/", calendar);



module.exports = app;