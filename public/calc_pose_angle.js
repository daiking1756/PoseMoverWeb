// 正解ポーズとユーザポーズの、角度の誤差を計算
function calcAngleError(correct_pose, user_pose){
    let error = 0;

    // Shoulder - Elbow
    error += calcKeypointAngleError(correct_pose, user_pose, 5, 7);
    error += calcKeypointAngleError(correct_pose, user_pose, 6, 8);

    // Elbow - Wrist
    error += calcKeypointAngleError(correct_pose, user_pose, 7, 9);
    error += calcKeypointAngleError(correct_pose, user_pose, 8, 10);

    // // Hip - Knee
    // error += calcKeypointAngleError(correct_pose, user_pose, 11, 13);
    // error += calcKeypointAngleError(correct_pose, user_pose, 12, 14);

    // // Knee - Ankle
    // error += calcKeypointAngleError(correct_pose, user_pose, 13, 15);
    // error += calcKeypointAngleError(correct_pose, user_pose, 14, 16);

    return error
}

// 正解ポーズとユーザポーズの、ある2つのkeypoint間の角度の誤差を計算
function calcKeypointAngleError(correct_pose, user_pose, num1, num2){
    let error = Math.abs(calcKeypointsAngle(correct_pose.keypoints, num1, num2) - calcKeypointsAngle(user_pose.keypoints, num1, num2))
    if(error <= 180) {
        return error
    } else {
        return 360 - error
    }
}

// keypoint[num1]とkeypoint[num2]の角度を計算
function calcKeypointsAngle(keypoints, num1, num2){
    return calcPositionAngle(keypoints[num1].position, keypoints[num2].position);
}

// position1とposition2を結ぶ線分の角度を計算
function calcPositionAngle(position1, position2){
    return calcAngleDegrees(position1.x, position1.y, position2.x, position2.y);
}

// 2点間の角度を計算
function calcAngleDegrees(x1, y1, x2, y2) {
    return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}
