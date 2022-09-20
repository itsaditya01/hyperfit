export const getAngleZ = (firstPoint, midPoint, lastPoint) => {
  const a = [firstPoint.x, firstPoint.y, firstPoint.z];
  const b = [midPoint.x, midPoint.y, midPoint.z];
  const c = [lastPoint.x, lastPoint.y, lastPoint.z];

  const ab = a.map((v, i) => v - b[i]);

  const cb = c.map((v, i) => v - b[i]);

  const dot = (a, b) => a.map((x, i) => a[i] * b[i]).reduce((m, n) => m + n);

  const mag1 = Math.sqrt(ab[0] * ab[0] + ab[1] * ab[1] + ab[2] * ab[2]);

  const mag2 = Math.sqrt(cb[0] * cb[0] + cb[1] * cb[1] + cb[2] * cb[2]);

  const cos_angle = dot(ab, cb) / (mag1 * mag2);

  var angle = Math.acos(cos_angle);

  angle = Math.abs((angle * 180) / Math.PI);

  if (angle > 180) {
    angle = 360 - angle;
  }

  return angle;
};

export const visibleCoords = (poses) => {
  var score = 0;

  if (poses.poseLandmarks[0].visibility > 0.5) {
    score++;
  }

  if (
    poses.poseLandmarks[11].visibility > 0.5 ||
    poses.poseLandmarks[12].visibility > 0.5
  ) {
    score++;
  }

  if (
    poses.poseLandmarks[13].visibility > 0.5 ||
    poses.poseLandmarks[14].visibility > 0.5
  ) {
    score++;
  }

  if (
    poses.poseLandmarks[15].visibility > 0.5 ||
    poses.poseLandmarks[16].visibility > 0.5
  ) {
    score++;
  }

  if (
    poses.poseLandmarks[23].visibility > 0.5 ||
    poses.poseLandmarks[24].visibility > 0.5
  ) {
    score++;
  }

  if (
    poses.poseLandmarks[25].visibility > 0.5 ||
    poses.poseLandmarks[26].visibility > 0.5
  ) {
    score++;
  }

  if (
    poses.poseLandmarks[27].visibility > 0.5 ||
    poses.poseLandmarks[28].visibility > 0.5
  ) {
    score++;
  }

  return score / 7;
};

export const knee_position = (poses) => {
  const left_knee_y = poses[25].y;
  const right_knee_y = poses[26].y;
  const left_ankle_y = poses[27].y;
  const leg_height = left_ankle_y - left_knee_y;
  if (Math.abs(left_knee_y - right_knee_y) < 0.3 * leg_height) {
    return true;
  } else {
    return false;
  }
};

export const getAngle = (firstPoint, midPoint, lastPoint) => {
  if (
    firstPoint.score <= 0.5 &&
    midPoint.score <= 0.5 &&
    lastPoint.score <= 0.5
  ) {
    return;
  }

  var result =
    ((Math.atan2(lastPoint.y - midPoint.y, lastPoint.x - midPoint.x) -
      Math.atan2(firstPoint.y - midPoint.y, firstPoint.x - midPoint.x)) *
      180) /
    Math.PI;

  result = Math.abs(result);

  if (result > 180) {
    result = 360.0 - result;
  }

  return result;
};

export const is_horizontal = (frame, th) => {
  const left_shoulder_x = frame[11].x;
  const left_shoulder_y = frame[11].y;
  const left_shoulder_z = frame[11].z;
  const left_hip_x = frame[23].x;
  const left_hip_y = frame[23].y;
  const left_hip_z = frame[23].z;
  const dx = left_shoulder_x - left_hip_x;
  const dy = left_shoulder_y - left_hip_y;
  const dz = left_shoulder_z - left_hip_z;
  const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
  // if (isin_leftview(frame,0.8)>=100){
  if (Math.abs(left_shoulder_y - left_hip_y) < distance / th) {
    return true;
  } else {
    return false;
  }
  // }
};

// export const is_vertical = (frame) => {
//   const left_eye_x = frame[2].x;
//   const left_eye_y = frame[2].y;
//   const right_eye_x = frame[5].x;
//   const right_eye_y = frame[5].y;
//   const left_heel_x = frame[29].x;
//   const left_heel_y = frame[29].y;
//   const right_heel_x = frame[30].x;
//   const right_heel_y = frame[30].y;

//   if (frame[2].visibility < 0.5) {
//     const vertical
//   }

// }
