const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const util = require('util');
const fs = require('fs');

const app = express();

app.set('port', process.env.PORT || 5050);
app.use(express.static(path.join(__dirname, 'assets')));
console.log(path.join(__dirname, 'assets'));

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.listen(app.get('port'), function(){
    console.log("Node.js is listening to PORT: " + app.get('port'));
});


app.get("/", function (request, response) {
    response.sendFile('html/index.html');
});

app.get("/pose_json", function (request, response) {
    const poseJsonObject = JSON.parse(fs.readFileSync('assets/correct_poses/test.json', 'utf8'));
    response.send(poseJsonObject);
});


app.post("/post_pose", function (request, response) {
    pose = request.body.pose;
    image_name = request.body.image_name;
    console.log("POST is received");
    response.send("POST is sended!");
    fs.writeFileSync(`assets/correct_poses/${image_name}.json`, JSON.stringify(pose, null, '    '));
});
