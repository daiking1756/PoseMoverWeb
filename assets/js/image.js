const minPartConfidence = 0.2;
const color = 'aqua';
const lineWidth = 3;
let correct_poses;

$.get("/correct_poses",
    function(data){
        correct_poses = data;
        // correct_poses = JSON.parse(data);
    }
);

multiplePosesDetection()


async function multiplePosesDetection(){
    const button = document.getElementById('btn');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const net = await posenet.load();
    const image = document.getElementById('img');

    canvas.width = image.width;
    canvas.height = image.height;

    const poses = await net.estimateMultiplePoses(image, {
        flipHorizontal: false,
        maxDetections: 3,
        scoreThreshold: 0.5,
        nmsRadius: 20
    });

    console.log(poses);

    ctx.clearRect(0, 0, image.width,image.height);
    ctx.save();
    ctx.drawImage(image, 0, 0, image.width, image.height);
    ctx.restore();

    poses.forEach(({ score, keypoints }) => {
        drawKeypoints(keypoints, minPartConfidence, ctx);
        drawSkeleton(keypoints, minPartConfidence, ctx);
    });

    button.onclick = function(){
        postPose(poses);
    };

    $('#get_btn').click(function(){
        console.log(correct_poses);
    });
}
