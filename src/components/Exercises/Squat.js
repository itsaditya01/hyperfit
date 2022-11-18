import {
  getAngleZ,
  is_horizontal,
  knee_position,
  visibleCoords,
  getAngle,
} from "../Logics";

let state = -1;
let previous_state = -1;
let partial_state = -1;
let pre_partial_state = -1;

export const squats = (
  poses,
  data,
  changeConnectorColor,
  setcount,
  setguidetext
) => {
  let rb_angle = getAngleZ(poses[12], poses[24], poses[26]);
  let rk_angle = getAngleZ(poses[24], poses[26], poses[28]);
  let lb_angle = getAngleZ(poses[11], poses[23], poses[25]);
  let lk_angle = getAngleZ(poses[23], poses[25], poses[27]);
  if (
    (Math.abs(poses[0].y - poses[31].y) * 720 >= window.innerHeight * 0.5 ||
      Math.abs(poses[0].y - poses[32].y) * 720 >= window.innerHeight * 0.5) &&
    visibleCoords({ poseLandmarks: poses }) * 85 >= 80
  ) {
    if (
      lk_angle > 120 &&
      rk_angle > 120 &&
      lb_angle > 120 &&
      rb_angle > 120 &&
      knee_position(poses)
    ) {
      state = 0;
    }
    const left_third = {
      x: poses[11].x,
      y: poses[23].y,
      score: 1,
    };
    const right_third = {
      x: poses[12].x,
      y: poses[24].y,
      score: 1,
    };
    const right_vertical_checker_angle = getAngle(
      poses[12],
      poses[24],
      right_third
    );
    const left_vertical_checker_angle = getAngle(
      poses[11],
      poses[23],
      left_third
    );
    if (poses[25].visibility < 0.5) {
      if (lk_angle > 120 && lb_angle > 120) {
        state = 0;
        // partial_state = 0;
        changeConnectorColor("red");
      } else if (
        lk_angle < 150 &&
        lk_angle > 80 &&
        lb_angle < 150 &&
        lb_angle > 85 &&
        left_vertical_checker_angle < 85 &&
        state === 0
      ) {
        partial_state = 1;
        state = 2;
      } else if (
        lk_angle < 80 &&
        lb_angle < 85 &&
        left_vertical_checker_angle < 85
      ) {
        state = 1;
        partial_state = 0;
        pre_partial_state = 0;
        changeConnectorColor("green");
      } else {
        if (lk_angle > 120 && lb_angle > 120 && knee_position(poses)) {
          state = 0;
          // partial_state = 0;
          changeConnectorColor("red");
        } else if (
          lk_angle < 150 &&
          lk_angle > 80 &&
          lb_angle < 150 &&
          lb_angle > 85 &&
          knee_position(poses) &&
          left_vertical_checker_angle < 85 &&
          state === 0
        ) {
          partial_state = 1;
          state = 2;
        } else if (
          lk_angle < 80 &&
          lb_angle < 85 &&
          knee_position(poses) &&
          left_vertical_checker_angle < 85
        ) {
          state = 1;
          partial_state = 0;
          changeConnectorColor("green");
        }
      }
    }
    if (poses[26].visibility < 0.5) {
      if (rk_angle > 150 && rb_angle > 150) {
        // partial_state = 0;
        state = 0;
        changeConnectorColor("red");
      } else if (
        rk_angle < 150 &&
        rk_angle > 80 &&
        rb_angle < 150 &&
        rb_angle > 85 &&
        left_vertical_checker_angle < 85 &&
        state === 0
      ) {
        partial_state = 1;
        state = 2;
      } else if (
        rk_angle < 80 &&
        rb_angle < 85 &&
        right_vertical_checker_angle < 85
      ) {
        partial_state = 0;
        state = 1;
        changeConnectorColor("green");
      }
    } else {
      if (rk_angle > 150 && rb_angle > 150 && knee_position(poses)) {
        // partial_state = 0;
        state = 0;
        changeConnectorColor("red");
      } else if (
        rk_angle < 150 &&
        rk_angle > 80 &&
        rb_angle < 150 &&
        rb_angle > 85 &&
        knee_position(poses) &&
        left_vertical_checker_angle < 85 &&
        state === 0
      ) {
        partial_state = 1;
        state = 2;
      } else if (
        rk_angle < 80 &&
        rb_angle < 85 &&
        knee_position(poses) &&
        right_vertical_checker_angle < 85
      ) {
        state = 1;
        partial_state = 0;
        pre_partial_state = 0;
        changeConnectorColor("green");
      }
    }
    if (previous_state === 1 && state === 0) {
      data.count++;
      setcount(data.count);
      setguidetext("");
    }
    if (pre_partial_state === 1 && state === 0) {
      data.partial_count++;
      setguidetext("Please bend you knees more and push your chest downwards");
      partial_state = 0;
    }
    pre_partial_state = partial_state;
    previous_state = state;
  }
};
