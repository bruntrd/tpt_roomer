var express = require('express');
var app = express();
var index = require('./routes/index');


app.set("port", process.env.PORT || 3000);

/*var server = app.listen(3000, function(){
    var port=server.address().port;
    console.log("Listening on port: ", port);
});*/

app.listen(app.get("port"), function(){
    console.log("listening on 3000")
});

app.use("/", index);

module.exports = app;