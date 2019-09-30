function postPose(poses) {

    const form = document.getElementById('form');
    const input_pose = document.getElementById('pose');
    const input_image_name = document.getElementById('image_name');

    const image = document.getElementById('img');

    const numOfPose = Number(document.getElementById('num_of_pose').value);
    input_pose.value = JSON.stringify(poses[numOfPose-1], null, '    ')
    // input.value = JSON.stringify(poses[numOfPose-1]);

    const image_name = image.src.split('/')[image.src.split('/').length - 1].split('.')[0]
    input_image_name.value = image_name;

    form.submit();
}
