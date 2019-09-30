const imageScaleFactor = 0.2;
const outputStride = 16;
// const flipHorizontal = false;
const stats = new Stats();
const canvas = document.getElementById('canvas');
// const contentWidth = 800;
// const contentHeight = 600;
const contentWidth = canvas.width;
const contentHeight = canvas.height;
const minPartConfidence = 0.2
const color = 'aqua';
const lineWidth = 2;
const maxAllowError = 150;
const minAllowScore = 0.5;

console.log(contentHeight);

let correct_pose;
$.get("/pose_json",
    function(data){
        correct_pose = JSON.parse(data);
    }
);

bindPage();

async function bindPage() {
    const net = await posenet.load(); // posenetの呼び出し
    let video;
    try {
        video = await loadVideo(); // video属性をロード
    } catch(e) {
        console.error(e);
        return;
    }
    detectPoseInRealTime(video, net);
}

// video属性のロード
async function loadVideo() {
    const video = await setupCamera(); // カメラのセットアップ
    video.play();
    return video;
}

// カメラのセットアップ
// video属性からストリームを取得する
async function setupCamera() {
    const video = document.getElementById('video');
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
            'audio': false,
            'video': true});
        video.srcObject = stream;

        return new Promise(resolve => {
            video.onloadedmetadata = () => {
                resolve(video);
            };
        });
    } else {
        const errorMessage = "This browser does not support video capture, or this device does not have a camera";
        alert(errorMessage);
        return Promise.reject(errorMessage);
    }
}

// 取得したストリームをestimateSinglePose()に渡して姿勢予測を実行
// requestAnimationFrameによってフレームを再描画し続ける
function detectPoseInRealTime(video, net) {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    // const flipPoseHorizontal = true; // since images are being fed from a webcam
    const flipPoseHorizontal = false;

    async function poseDetectionFrame() {
        stats.begin();
        let poses = [];
        // const pose = await net.estimateSinglePose(video, imageScaleFactor, flipHorizontal, outputStride);
        const pose = await net.estimatePoses(video, {
            flipHorizontal: flipPoseHorizontal,
            decodingMethod: 'single-person'
        });
        poses.push(pose[0]);

        const error = calcAngleError(correct_pose, pose[0]);
        // console.log(error);
        if(error <= maxAllowError && pose[0].score >= minAllowScore){
            const audioElem = new Audio();
            audioElem.src = "sounds/correct_sound.mp3";
            audioElem.play();
            setTimeout(function(){
                window.location.href = 'https://youtu.be/9_ifx-Dmv9g?t=73';
            }, 3000)
            await sleep(4000)
        }

        ctx.clearRect(0, 0, contentWidth,contentHeight);

        ctx.save();
        // ctx.scale(-1, 1);
        // ctx.translate(-contentWidth, 0);
        ctx.drawImage(video, 0, 0, contentWidth, contentHeight);
        ctx.restore();

        // draw result
        poses.forEach(({ score, keypoints }) => {
            drawKeypoints(keypoints, minPartConfidence, ctx);
            drawSkeleton(keypoints, minPartConfidence, ctx);
        });

        stats.end();

        requestAnimationFrame(poseDetectionFrame);
    }
    poseDetectionFrame();
}

function sleep(msec) {
    return new Promise(function(resolve) {

       setTimeout(function() {resolve()}, msec);

    })
 }
