import { getAngleZ, visibleCoords } from "../Logics";

var state = -1;
var previous_state = -1;
let partial_state = -1;
let pre_partial_state = -1;

export const lunges = (
  poses,
  data,
  changeConnectorColor,
  setcount,
  setguidetext
) => {
  const angle_lk = getAngleZ(poses[23], poses[25], poses[27]);
  const angle_rk = getAngleZ(poses[24], poses[26], poses[28]);
  const angle_lh = getAngleZ(poses[11], poses[23], poses[25]);
  const angle_rh = getAngleZ(poses[12], poses[24], poses[26]);

  if (visibleCoords({ poseLandmarks: poses }) * 100 >= 80) {
    if (angle_lk > 130 && angle_rk > 130 && angle_lh > 140 && angle_rh > 140) {
      state = 0;
      changeConnectorColor("red");
    } else if (
      angle_rh > 100 &&
      angle_lh < 100 &&
      angle_lk < 100 &&
      angle_rk < 100
    ) {
      state = 1;
      partial_state = 0;
      pre_partial_state = 0;
      changeConnectorColor("green");
    } else if (
      angle_rh < 100 &&
      angle_lh > 100 &&
      angle_lk < 100 &&
      angle_rk < 100
    ) {
      state = 2;
      changeConnectorColor("green");
    } else if (previous_state === 0) {
      partial_state = 1;
      state = 2;
    }
  }

  if (previous_state === 1 && state === 0) {
    data.count++;
    setcount(data.count);
    setguidetext("");
    partial_state = 0;
    pre_partial_state = 0;
  }

  if (state === 0 && pre_partial_state === 1) {
    // setguidetext("Please go down until indicator turn green");
    partial_state = 0;
  }
  pre_partial_state = partial_state;
  previous_state = state;
};
