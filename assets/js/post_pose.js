function postPose(poses) {

    const form = document.getElementById('form');
    const input_pose = document.getElementById('pose');
    const input_image_name = document.getElementById('image_name');
    const btn_submit = document.getElementById('btn_submit');
    const image = document.getElementById('img');
    const video_url = document.getElementById('video_url');

    // 正解ポーズをJSONに変換
    const numOfPose = Number(document.getElementById('num_of_pose').value);

    // 正解ポーズにvideo_urlを追加
    poses[numOfPose-1].video_url = video_url.value;
    console.log(poses);
    console.log(poses[numOfPose-1]);

    // 正解ポーズにimage_nameを追加、画像名を設定
    const image_name = image.src.split('/')[image.src.split('/').length - 1];

    poses[numOfPose-1].image_name = image_name;
    input_image_name.value = image_name;

    input_pose.value = JSON.stringify(poses[numOfPose-1], null, '    ');

    // form.submit();
    btn_submit.click();
}
