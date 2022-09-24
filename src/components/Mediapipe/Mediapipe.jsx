import { React, useEffect } from "react";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Camera } from "@mediapipe/camera_utils";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { useRef } from "react";
import squatVid from "../../assets/squats.mp4";
import pushupVid from "../../assets/pushup.mp4";
import legVid from "../../assets/leg.mp4";
import lungesVid from "../../assets/lunges.mp4";
import { roundRect } from "./DrawingUtility";
import { squats } from "../Exercises/Squat";
import { pushUps } from "../Exercises/PushUps";
import "./style.css";
import { lunges } from "../Exercises/Lunges";
import { sprawl } from "../Exercises/sprawl";
import { mountainClimber } from "../Exercises/MountainClimber";
import { legRaise } from "../Exercises/Legraise";

var exercises = {
  name: [squats, pushUps, legRaise, lunges],
  videos: [squatVid, pushupVid, legVid, lungesVid],
};

const pose = new Pose({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
  },
});
pose.setOptions({
  modelComplexity: 1,
  smoothLandmarks: true,
  enableSegmentation: true,
  smoothSegmentation: true,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
  selfieMode: true,
});

let startTimer;

const connections = [
  [0, 1],
  [0, 4],
  [1, 2],
  [2, 3],
  [3, 7],
  [4, 5],
  [5, 6],
  [6, 8],
  [9, 10],
  [11, 12],
  [11, 13],
  [11, 23],
  [12, 14],
  [14, 16],
  [12, 24],
  [13, 15],
  [15, 17],
  [16, 18],
  [16, 20],
  [15, 17],
  [15, 19],
  [15, 21],
  [16, 22],
  [17, 19],
  [18, 20],
  [23, 25],
  [23, 24],
  [24, 26],
  [25, 27],
  [26, 28],
  [27, 29],
  [28, 30],
  [27, 31],
  [28, 32],
  [29, 31],
  [30, 32],
];

let counter;

// const five_second_timer = ({ data }) => {
//   counter = setTimeout(() => {
//     data.curr_guide_cnt++;
//   }, 5000);
//   if (data.curr_guide_cnt === 2) clearTimeout(counter);
// };

const Mediapipe = ({ data, setcount, setguidetext, curr }) => {
  const videoRef = useRef(null);
  const squatsRef = useRef(null);
  const canvasRef = useRef(null);
  let connectorColor = "red";
  const changeConnectorColor = (color) => {
    connectorColor = color;
  };
  let is_live = true;
  useEffect(() => {
    pose.onResults(onResults);
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        if (is_live) await pose.send({ image: videoRef.current });
        else await pose.send({ image: squatsRef.current });
      },
      width: 1280,
      height: 720,
    });
    camera.start();
  }, []);

  useEffect(() => {
    setcount(0);
    pose.onResults(onResults);
  }, [curr]);

  function onResults(results) {
    if (!results.poseLandmarks) {
      return;
    }
    const canvasCtx = canvasRef.current.getContext("2d");
    canvasCtx.save();
    canvasCtx.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    canvasCtx.globalCompositeOperation = "source-in";
    canvasCtx.fillStyle = "#00FF00";
    canvasCtx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    canvasCtx.globalCompositeOperation = "destination-atop";
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );

    canvasCtx.globalCompositeOperation = "source-over";

    canvasCtx.fillStyle = connectorColor;
    canvasCtx.strokeStyle = connectorColor;
    canvasCtx.lineWidth = window.innerWidth >= 768 ? 6 : 2;

    connections.forEach(([i, j]) => {
      const point1 = results.poseLandmarks[i];
      const point2 = results.poseLandmarks[j];

      const score1 = point1.visibility != null ? point1.visibility : 1;
      const score2 = point2.visibility != null ? point2.visibility : 1;
      const scoreThreshold = 0;

      if (
        score1 >= scoreThreshold &&
        score2 >= scoreThreshold &&
        i > 10 &&
        j > 10
      ) {
        canvasCtx.beginPath();
        canvasCtx.moveTo(point1.x * 1100, point1.y * 650);
        canvasCtx.lineTo(point2.x * 1100, point2.y * 650);
        canvasCtx.stroke();
      }
    });
    // mountainClimber(results.poseLandmarks, data, changeConnectorColor);
    //sprawl(results.poseLandmarks, data, changeConnectorColor);
    exercises.name[curr](
      results.poseLandmarks,
      data,
      changeConnectorColor,
      setcount,
      setguidetext
    );

    canvasCtx.restore();
  }

  return (
    <div className="exerciseContainer df aic fdc">
      <video ref={videoRef} style={{ display: "none" }}></video>
      {/* <button
        className="play"
        onClick={() => {
          squatsRef.current.play();
        }}
      >
        Play Video
      </button>
      <button
        className="play"
        onClick={() => {
          squatsRef.current.pause();
        }}
      >
        Pause Video
      </button> */}
      <canvas
        ref={canvasRef}
        width={"1100px"}
        height={"650px"}
        style={{ borderRadius: "0.75rem" }}
      ></canvas>
      <video
        ref={squatsRef}
        style={{ width: 300, height: 300, display: is_live ? "none" : "" }}
        src={exercises.videos[curr]}
        controls
      ></video>
    </div>
  );
};

export default Mediapipe;
