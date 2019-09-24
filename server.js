const path = require('path');
const express = require('express');
const app = express();

app.set('port', process.env.PORT || 5050);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function(){
    console.log("Node.js is listening to PORT: " + app.get('port'));
});



app.get("/", function (request, response) {
  response.sendFile('index.html');
});

app.get("/test", function (request, response) {
    response.send('TEST');
  });




// var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);
// var x = 50;
// app.get("/", function (request, response) {
//   response.sendFile(__dirname + '/index.html');
// });
// app.use(express.static('assets'));

// server.listen(3000);
