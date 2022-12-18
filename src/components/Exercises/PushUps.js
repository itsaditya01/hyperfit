import { getAngleZ, getAngle, is_horizontal } from "../Logics";

let state = -1;
let previous_state = -1;
let partial_state = -1;
let pre_partial_state = -1;

export const pushUps = (
  poses,
  data,
  changeConnectorColor,
  setcount,
  setguidetext,
  setpartialcount
) => {
  console.log("PushUps");
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
      partial_state = 0;
      pre_partial_state = 0;
    }
  }
  // else if (angle_lh < 130 && state === 0) {
  //   setguidetext("Your back should be straight");
  //   partial_state = 1;
  //   state = 2;
  // } else if (angle_lk < 130 && state === 0) {
  //   setguidetext("Your leg should be straight");
  //   partial_state = 1;
  //   state = 2;
  // }
  if (angle_le < 130 && angle_le > 90 && state === 0) {
    partial_state = 1;
    state = 2;
  }
  if (previous_state === 1 && state === 0) {
    data.count++;
    setcount(data.count);
    setguidetext("");
    partial_state = 0;
    pre_partial_state = 0;
    console.log("increase");
  }
  if (state === 0 && pre_partial_state === 1) {
    data.partial_count++;
    setguidetext("Please go down until indicator turns green");
    setpartialcount(data.partial_count);
    partial_state = 0;
  }
  previous_state = state;
  pre_partial_state = partial_state;
};
