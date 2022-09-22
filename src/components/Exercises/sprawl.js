import { getAngle, getAngleZ, is_horizontal, visibleCoords } from "../Logics";

var state = -1;
var previous_state = -1;

export const sprawl = (poses, data, changeConnectorColor) => {
  const angle_lk = getAngleZ(poses[23], poses[25], poses[27]);
  const angle_rk = getAngleZ(poses[24], poses[26], poses[28]);
  const angle_lh = getAngleZ(poses[11], poses[23], poses[25]);
  const angle_rh = getAngleZ(poses[12], poses[24], poses[26]);
  const angle_le = getAngleZ(poses[11], poses[13], poses[15]);
  const angle_ls = getAngle(poses[13], poses[11], poses[23]);
  if (visibleCoords({ poseLandmarks: poses }) * 100 >= 50) {
    if (
      is_horizontal(poses, 4) &&
      angle_le > 130 &&
      angle_lh > 130 &&
      angle_lk > 140
    ) {
      state = 0;
      changeConnectorColor("red");
    } else if (
      !is_horizontal(poses, 4) &&
      angle_rh < 120 &&
      angle_lh < 120 &&
      angle_rk < 90 &&
      angle_ls > 90 &&
      angle_lk < 100
    ) {
      state = 1;
      changeConnectorColor("green");
    }
  }
  if ((previous_state == 1 || previous_state == 2) && state == 0) {
    data.count++;
  }
  previous_state = state;
};
