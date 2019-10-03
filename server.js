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
    response.sendFile(__dirname + '/assets/html/index.html');
});

app.get("/correct_poses", function (request, response) {
    const path = process.cwd() + '/assets/correct_poses';
    const filenames = fs.readdirSync(path);

    const poseJsonObjects = []

    filenames.forEach(filename => {
        let poseJsonObject = JSON.parse(fs.readFileSync(`assets/correct_poses/${filename}`, 'utf8'));
        poseJsonObject = JSON.parse(poseJsonObject, 'utf8');
        poseJsonObjects.push(poseJsonObject);
    });

    response.send(poseJsonObjects);
});

app.get("/images", function (request, response) {
    const path = process.cwd() + '/assets/images';
    const filenames = fs.readdirSync(path);

    response.send(filenames);
});

app.post("/post_pose", function (request, response) {
    pose = request.body.pose;
    image_name = request.body.image_name.split('.')[0];
    console.log("POST is received");
    response.send("POST is sended!");
    fs.writeFileSync(`assets/correct_poses/${image_name}.json`, JSON.stringify(pose, null, '    '));
});
