var googleConfig = {
    clientID: '270120115745-e2n1h3h8aufb1brf05hbin6r54orduop.apps.googleusercontent.com',
    clientSecret: 'uwWUU7VuuVSxZwZ5GT132DHv',
    calendarId: 'tpt.roomer@gmail.com',
    redirectURL: 'http://localhost:3000/auth'
};

var express = require('express');
var moment = require('moment');
var google = require('googleapis');
var router = express.Router();
var path = require('path');

var app = express(),
    calendar = google.calendar('v3');
oAuthClient = new google.auth.OAuth2(googleConfig.clientID, googleConfig.clientSecret, googleConfig.redirectURL),
    authed = false;


router.get('/', function(req, res) {
    console.log(req.params[0]);
    //console.log("hey were here");

    // If we're not authenticated, fire off the OAuth flow
    if (!authed) {

        var url = oAuthClient.generateAuthUrl({
            access_type: 'offline',
            scope: 'https://www.googleapis.com/auth/calendar.readonly'
        });
        res.redirect(url);
    } else {
            var today = moment().format('YYYY-MM-DD') + 'T';

            // Call google to fetch events for today on our calendar
            calendar.events.list({
                calendarId: googleConfig.calendarId,
                maxResults: 20,
                timeMin: today + '00:00:00.000Z',
                timeMax: today + '23:59:59.000Z',
                auth: oAuthClient
            }, function(err, events) {
            if(err) {
                //console.log('Error fetching events');
                //console.log(err);
            } else {
                //console.log('Successfully fetched events');
                //console.log(events);
                console.log(events);
                res.redirect('/index');





            }
        });
    }

});


// Return point for oAuth flow, should match googleConfig.redirectURL
router.get('/auth', function(req, res) {
    var code = req.query.code;

    if(code) {
        // Get an access token based on our OAuth code
        oAuthClient.getToken(code, function(err, tokens) {

            if (err) {
                console.log('Error authenticating')
                console.log(err);
            } else {
                console.log('Successfully authenticated');
                console.log(tokens);

                // Store our credentials and redirect back to our main page
                oAuthClient.setCredentials(tokens);
                authed = true;
                res.redirect('/');


            }
        });
    }
});

router.get('/*', function(req,res,next){
    console.log(file);
    var file= req.params[0] || "assets/views/index.html";
    res.sendFile(path.join(__dirname, "../public", file));

});








module.exports= router;