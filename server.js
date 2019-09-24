let express = require('express');
let app = express();

let server = app.listen(3000, function(){
    console.log("Node.js is listening to PORT: " + server.address().port);
});

app.use(express.static('public'));

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
