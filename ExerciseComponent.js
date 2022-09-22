// import { is_horizontal, getAngleZ, visibleCoords, isin_leftview, getAngle, knee_ankle_distance, knee_position, isin_rightview, ankles_apart } from "../modules/live-video/Logics"

var state = -1;
var previous_state = -1;
var warrior = -1;
var start_plank = false;
var start_warrior1 = false;
var start_warrior2 = false;
var plank_callback = false;
var warrior1_callback = false;

export const mountainClimber = (poses, data) => {
  const angle_lk = getAngleZ(poses[23], poses[25], poses[27]);
  const angle_rk = getAngleZ(poses[24], poses[26], poses[28]);
  const angle_lh = getAngleZ(poses[11], poses[23], poses[25]);
  const angle_rh = getAngleZ(poses[12], poses[24], poses[26]);

  if (is_horizontal(poses, 4)) {
    if (angle_lk > 130 && angle_rk > 130 && angle_lh > 140 && angle_rh > 140) {
      state = 0;
    } else if (
      angle_rh > 100 &&
      angle_lh < 90 &&
      angle_lk < 90 &&
      angle_rk > 90
    ) {
      state = 1;
    } else if (
      angle_rh < 90 &&
      angle_lh > 100 &&
      angle_lk > 90 &&
      angle_rk < 90
    ) {
      state = 2;
    }
  }

  if ((previous_state == 1 || previous_state == 2) && state == 0) {
    data.count++;
  }
  previous_state = state;
};

export const lunges = (poses, data) => {
  const angle_lk = getAngleZ(poses[23], poses[25], poses[27]);
  const angle_rk = getAngleZ(poses[24], poses[26], poses[28]);
  const angle_lh = getAngleZ(poses[11], poses[23], poses[25]);
  const angle_rh = getAngleZ(poses[12], poses[24], poses[26]);

  if (visibleCoords({ poseLandmarks: poses }) * 100 >= 80) {
    if (angle_lk > 130 && angle_rk > 130 && angle_lh > 140 && angle_rh > 140) {
      state = 0;
    } else if (
      angle_rh > 100 &&
      angle_lh < 100 &&
      angle_lk < 90 &&
      angle_rk < 90
    ) {
      state = 1;
    } else if (
      angle_rh < 100 &&
      angle_lh > 100 &&
      angle_lk < 90 &&
      angle_rk < 90
    ) {
      state = 2;
    }
  }

  if ((previous_state == 1 || previous_state == 2) && state == 0) {
    data.count++;
  }
  previous_state = state;
};

export const planks = (poses, data, extras, callback) => {
  const angle_lk = getAngleZ(poses[23], poses[25], poses[27]);
  const angle_lh = getAngleZ(poses[11], poses[23], poses[25]);
  const angle_le = getAngleZ(poses[11], poses[13], poses[15]);
  const angle_ls = getAngleZ(poses[13], poses[11], poses[23]);

  const curr_seconds =
    new Date().getHours() * 3600 +
    new Date().getMinutes() * 60 +
    new Date().getSeconds();

  if (start_plank) {
    data.count = curr_seconds - extras.timer;
    if (plank_callback) {
      callback && callback(plank_callback);
      plank_callback = false;
    }
  } else {
    extras.timer = curr_seconds - data.count;
  }

  if (is_horizontal(poses, 4)) {
    if (
      angle_le < 110 &&
      angle_le > 45 &&
      angle_lh > 127 &&
      angle_lk > 140 &&
      angle_ls < 100 &&
      angle_ls > 45
    ) {
      state = 1;

      extras.change = curr_seconds;

      start_plank = true;
    } else {
      state = 2;

      if (extras.change + 2 <= curr_seconds) {
        start_plank = false;
        if (!plank_callback) {
          callback && callback(plank_callback);
          plank_callback = true;
        }
      }
    }
  }
};

export const highKnees = (poses, data) => {
  const angle_lk = getAngleZ(poses[23], poses[25], poses[27]);
  const angle_rk = getAngleZ(poses[24], poses[26], poses[28]);
  const angle_lh = getAngleZ(poses[11], poses[23], poses[25]);
  const angle_rh = getAngleZ(poses[12], poses[24], poses[26]);
  const angle_lk_xy = getAngle(poses[23], poses[25], poses[27]);
  const angle_rk_xy = getAngle(poses[24], poses[26], poses[28]);
  const angle_lh_xy = getAngle(poses[11], poses[23], poses[25]);
  const angle_rh_xy = getAngle(poses[12], poses[24], poses[26]);

  if (visibleCoords({ poseLandmarks: poses }) * 100 >= 90) {
    if (
      angle_lk_xy > 120 &&
      angle_rk_xy > 120 &&
      angle_lh_xy > 130 &&
      angle_rh_xy > 130 &&
      knee_ankle_distance(poses)
    ) {
      state = 0;
    } else if (
      angle_rk_xy > 100 &&
      angle_rh_xy > 120 &&
      angle_lh < 120 &&
      angle_lk < 100 &&
      knee_ankle_distance(poses)
    ) {
      state = 1;
    } else if (
      angle_lk > 100 &&
      angle_rh < 120 &&
      angle_lh_xy > 120 &&
      angle_rk < 100 &&
      knee_ankle_distance(poses)
    ) {
      state = 2;
    }
  }

  if ((previous_state == 1 || previous_state == 2) && state == 0) {
    data.count++;
  }
  previous_state = state;
};

export const legRaise = (poses, data) => {
  const angle_lk = getAngleZ(poses[23], poses[25], poses[27]);
  const angle_rk = getAngleZ(poses[24], poses[26], poses[28]);
  const angle_lh = getAngleZ(poses[11], poses[23], poses[25]);
  const angle_rh = getAngleZ(poses[12], poses[24], poses[26]);
  if (
    visibleCoords({ poseLandmarks: poses }) * 100 >= 50 &&
    is_horizontal(poses, 4) &&
    angle_lk > 130 &&
    angle_rk > 130
  ) {
    if (angle_lh > 140 && angle_rh > 140 && angle_lk > 140 && angle_rk > 140) {
      state = 0;
    } else if (
      angle_rh < 120 &&
      angle_lh < 120 &&
      angle_lk < 120 &&
      angle_rk < 120
    ) {
      state = 1;
    }
  }

  if ((previous_state == 1 || previous_state == 2) && state == 0) {
    data.count++;
  }
  previous_state = state;
};

export const sprawl = (poses, data) => {
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
      angle_lk > 140 &&
      angle_ls > 45
    ) {
      state = 0;
    } else if (
      !is_horizontal(poses, 4) &&
      angle_rh < 120 &&
      angle_lh < 120 &&
      angle_rk < 90 &&
      angle_ls > 50 &&
      angle_lk < 90
    ) {
      state = 1;
    }
  }
  if ((previous_state == 1 || previous_state == 2) && state == 0) {
    data.count++;
  }
  previous_state = state;
};

export const pushUps = (poses, data) => {
  const angle_lk = getAngleZ(poses[23], poses[25], poses[27]);
  const angle_lh = getAngle(poses[11], poses[23], poses[25]);
  const angle_le = getAngle(poses[11], poses[13], poses[15]);
  const angle_ls = getAngleZ(poses[13], poses[11], poses[23]);
  if (is_horizontal(poses, 2)) {
    if (angle_le > 130 && angle_lh > 130 && angle_lk > 130 && angle_ls > 45) {
      state = 0;
    } else if (
      angle_le < 90 &&
      angle_lh > 130 &&
      angle_lk > 130 &&
      angle_ls > 45
    ) {
      state = 1;
    }
  }
  if (previous_state == 1 && state == 0) {
    data.count++;
  }
  previous_state = state;
};

export const squats = (poses, data, callback) => {
  let rb_angle = getAngleZ(poses[12], poses[24], poses[26]);
  let rk_angle = getAngleZ(poses[24], poses[26], poses[28]);
  let lb_angle = getAngleZ(poses[11], poses[23], poses[25]);
  let lk_angle = getAngleZ(poses[23], poses[25], poses[27]);

  if (
    (Math.abs(poses[0].y - poses[31].y) * 720 >= window.innerHeight * 0.5 ||
      Math.abs(poses[0].y - poses[32].y) * 720 >= window.innerHeight * 0.5) &&
    visibleCoords({ poseLandmarks: poses }) * 100 >= 80
  ) {
    if (
      lk_angle > 120 &&
      rk_angle > 120 &&
      lb_angle > 120 &&
      rb_angle > 120 &&
      knee_position(poses)
    ) {
      state = 0;
    } else if (
      rb_angle < 100 &&
      lb_angle < 100 &&
      rk_angle < 90 &&
      lk_angle < 90 &&
      knee_position(poses)
    ) {
      state = 1;
    }
    if (poses[26].visibility < 0.5) {
      if (lk_angle > 120 && lb_angle > 120) {
        state = 0;
      } else if (lk_angle < 90 && lb_angle < 100) {
        state = 1;
      } else {
        if (lk_angle > 120 && lb_angle > 120 && knee_position(poses)) {
          state = 0;
        } else if (lk_angle < 90 && lb_angle < 100 && knee_position(poses)) {
          state = 1;
        }
      }
    }
    if (poses[25].visibility < 0.5) {
      if (rk_angle > 120 && rb_angle > 120) {
        state = 0;
      } else if (rk_angle < 90 && rb_angle < 100) {
        state = 1;
      }
    } else {
      if (rk_angle > 120 && rb_angle > 120 && knee_position(poses)) {
        state = 0;
      } else if (rk_angle < 90 && rb_angle < 100 && knee_position(poses)) {
        state = 1;
      }
    }
    if ((previous_state == 1 || previous_state == 2) && state == 0) {
      data.count++;

      data.countTime = new Date().getSeconds();

      callback && callback();
    }
    previous_state = state;
  }

  // if(data.complete)
  // {
  //     if((k_angle < 60))
  //     {
  //     data.complete = false
  //     data.count++
  //     data.partial = false

  //     data.energy = true

  //     data.countTime = new Date().getSeconds()

  //     // time_limit_err = true

  //     // no_guidance && hmsActions.sendBroadcastMessage(`count|${ data.count }`)

  //     // console.log('count sent')
  //     }
  // }

  // if(data.partial && (k_angle > 150 && b_angle > 150))
  // {
  //     data.partial = false
  // }
};

export const neck_rotation = (poses, data) => {
  const nose_x = poses[0].x;
  const le_x = poses[7].x;
  const re_x = poses[8].x;

  if (nose_x - re_x < 0) {
    state = 1;
  } else if (le_x - nose_x < 0) {
    state = 2;
  } else {
    state = 0;
  }

  if ((previous_state === 1 || previous_state === 2) && state === 0) {
    data.count++;
  }

  previous_state = state;
};

export const warrior1 = (poses, data, extras, callback) => {
  if (visibleCoords({ poseLandmarks: poses }) * 100 >= 70) {
    const lk = getAngle(poses[23], poses[25], poses[27]);
    const rk = getAngle(poses[24], poses[26], poses[28]);
    const ls = getAngle(poses[23], poses[11], poses[13]);
    const rs = getAngle(poses[24], poses[12], poses[14]);

    const hand_condition = ls > 140 || rs > 140;

    const curr_seconds =
      new Date().getHours() * 3600 +
      new Date().getMinutes() * 60 +
      new Date().getSeconds();

    if (start_warrior1) {
      data.count = curr_seconds - extras.timer;
      if (warrior1_callback) {
        callback && callback(warrior1_callback);
        warrior1_callback = false;
      }
    } else {
      extras.timer = curr_seconds - data.count;
    }

    // if(lk > 150 && rk > 150)
    // {
    //     holdTime = 0
    // }

    if (
      (lk > 90 &&
        lk < 150 &&
        rk > 130 &&
        ankles_apart(poses, 1.6) &&
        hand_condition) ||
      (rk > 90 &&
        rk < 150 &&
        lk > 130 &&
        ankles_apart(poses, 1.6) &&
        hand_condition)
    ) {
      // holdTime++
      warrior = true;
      // data.count = true

      extras.change = curr_seconds;

      start_warrior1 = true;
    } else {
      warrior = false;
      // data.count = false

      if (extras.change + 2 <= curr_seconds) {
        start_warrior1 = false;
        if (!warrior1_callback) {
          callback && callback(warrior1_callback);
          warrior1_callback = true;
        }
      }
    }
  }
};

export const warrior2 = (poses, data, extras) => {
  if (visibleCoords({ poseLandmarks: poses }) * 100 >= 70) {
    const lk = getAngle(poses[23], poses[25], poses[27]);
    const rk = getAngle(poses[24], poses[26], poses[28]);
    const ls = getAngle(poses[23], poses[11], poses[13]);
    const rs = getAngle(poses[24], poses[12], poses[14]);
    const le = getAngle(poses[11], poses[13], poses[15]);
    const re = getAngle(poses[12], poses[14], poses[16]);

    const hand_condition =
      ls > 40 && rs > 40 && ls < 120 && rs < 120 && le > 140 && re > 140;

    const curr_seconds =
      new Date().getHours() * 3600 +
      new Date().getMinutes() * 60 +
      new Date().getSeconds();

    if (start_warrior2) {
      data.count = curr_seconds - extras.timer;
    } else {
      extras.timer = curr_seconds - data.count;
    }

    if (
      (lk > 90 &&
        lk < 120 &&
        rk > 140 &&
        ankles_apart(poses, 1.6) &&
        hand_condition) ||
      (rk > 90 &&
        rk < 120 &&
        lk > 150 &&
        ankles_apart(poses, 1.6) &&
        hand_condition)
    ) {
      // holdTime++
      warrior = true;
      // data.count = true

      extras.change = curr_seconds;

      start_warrior2 = true;
    } else {
      warrior = false;
      // data.count = false

      if (extras.change + 2 <= curr_seconds) {
        start_warrior2 = false;
      }
    }
  }
};
