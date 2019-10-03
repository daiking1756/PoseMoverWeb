const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const util = require('util');
const fs = require('fs');

const app = express();

app.set('port', process.env.PORT || 5050);
app.use(express.static(path.join(__dirname, 'assets')));

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

app.get("/correct_poses", function (request, response) {
    let poseJsonObjects = []

    let poseJsonObject1 = JSON.parse(fs.readFileSync('assets/correct_poses/voice1.json', 'utf8'));
    let poseJsonObject2 = JSON.parse(fs.readFileSync('assets/correct_poses/voice2.json', 'utf8'));

    poseJsonObject1 = JSON.parse(poseJsonObject1, 'utf8');
    poseJsonObject2 = JSON.parse(poseJsonObject2, 'utf8');

    // 配列に追加
    poseJsonObjects.push(poseJsonObject1);
    poseJsonObjects.push(poseJsonObject2);

    response.send(poseJsonObjects);
});


app.post("/post_pose", function (request, response) {
    pose = request.body.pose;
    image_name = request.body.image_name.split('.')[0];
    console.log("POST is received");
    response.send("POST is sended!");
    fs.writeFileSync(`assets/correct_poses/${image_name}.json`, JSON.stringify(pose, null, '    '));
});
