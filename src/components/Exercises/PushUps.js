import { getAngleZ, getAngle, is_horizontal } from "../Logics";

let state = -1;
let previous_state = -1;

export const pushUps = (poses, data, changeConnectorColor) => {
  const angle_lk = getAngleZ(poses[23], poses[25], poses[27]);
  const angle_lh = getAngle(poses[11], poses[23], poses[25]);
  const angle_le = getAngle(poses[11], poses[13], poses[15]);
  const angle_ls = getAngleZ(poses[13], poses[11], poses[23]);
  if (is_horizontal(poses, 2)) {
    if (angle_le > 130 && angle_lh > 130 && angle_lk > 130 && angle_ls > 45) {
      state = 0;
      changeConnectorColor("red");
    } else if (
      angle_le < 90 &&
      angle_lh > 130 &&
      angle_lk > 130 &&
      angle_ls > 45
    ) {
      changeConnectorColor("green");
      state = 1;
    }
  }
  if (previous_state == 1 && state == 0) {
    data.count++;
  }
  previous_state = state;
};
