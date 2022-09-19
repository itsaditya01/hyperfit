import { React, useEffect } from "react";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
import { Camera } from "@mediapipe/camera_utils";
import { Pose, POSE_CONNECTIONS } from "@mediapipe/pose";
import { useRef } from "react";
import squatVid from "../../assets/squats.mp4";
import { roundRect } from "./DrawingUtility";
import { squats } from "../Exercises/Squat";
import { pushUps } from "../Exercises/PushUps";
import "./style.css";

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

const five_second_timer = ({ data }) => {
  counter = setTimeout(() => {
    data.curr_guide_cnt++;
  }, 5000);
  if (data.curr_guide_cnt === 2) clearTimeout(counter);
};

const Mediapipe = ({ data }) => {
  const videoRef = useRef(null);
  const squatsRef = useRef(null);
  const canvasRef = useRef(null);
  let connectorColor = "red";
  const changeConnectorColor = (color) => {
    connectorColor = color;
  };
  const sendFrames = async () => {
    console.log("frames send");
    await pose.send({ image: squatsRef.current });
  };
  let is_live = true;
  five_second_timer(data);
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
    // clearInterval(startTimer);
    startTimer = setInterval(100, sendFrames);
  }, []);

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
    console.log(data.curr_exercise);
    if (data.curr_exercise === 0) {
      squats(results.poseLandmarks, data, changeConnectorColor);
    } else {
      pushUps(results.poseLandmarks, data, changeConnectorColor);
    }
    canvasCtx.fillStyle = "#FFFFFF";
    roundRect(canvasCtx, 150, 150, 300, 150, 10);
    canvasCtx.font = "20px sans-serif";
    canvasCtx.fillStyle = "#000000";
    canvasCtx.fillText(`Squat Counter: ${data.count}`, 200, 200);
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
        src={squatVid}
        controls
      ></video>
    </div>
  );
};

export default Mediapipe;
