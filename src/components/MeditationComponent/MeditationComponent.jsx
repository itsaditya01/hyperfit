import React, { useState, useEffect, useRef, useContext } from "react";
import meditationVideo from "../../assets/meditation.mp4";
import "./MeditationComponent.css";
import { UserContext } from "../Context/UserState";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { songs } from "./songs";

const PopUp = ({ text, pos }) => {
  return (
    <motion.div
      exit={{
        y: 100,
        opacity: 0,
        transition: {
          duration: 0.4,
          ease: "easeInOut",
        },
      }}
      className="pop-up-meditation"
      style={{
        position: "absolute",
        right: pos ? "20%" : "",
        left: pos ? "" : "10%",
      }}
    >
      <div className="pop-up-meditation-text">{text}</div>
    </motion.div>
  );
};

export const MeditationComponent = () => {
  const context = useContext(UserContext);
  const { user } = context;
  const [textIndex, setTextIndex] = useState(0);
  const audio = useRef(null);
  const progressBar = useRef(null);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [nextSongIndex, setNextSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffling, setIsShuffling] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [timerHour, setTimerHour] = useState(0);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const nav = useNavigate(null);

  const StoreMeditation = async () => {
    //API call
    let host = "http://localhost:5000";

    const response = await fetch(`${host}/api/storemeditation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: user.email,
        meditationDuration: timerHour * 60 + timerMinutes,
      }),
    });
    const data = await response.json();
    if (data.success) {
      nav("/dashboard");
    } else {
    }
  };
  useEffect(() => {
    const timer = setInterval(() => {
      let hour = timerHour;
      let minutes = timerMinutes;
      let seconds = timerSeconds;
      if (seconds === 59) {
        setTimerSeconds(0);
        minutes += 1;
      } else {
        setTimerSeconds(seconds + 1);
      }

      if (minutes >= 59) {
        hour += 1;
        setTimerMinutes(0);
      } else {
        setTimerMinutes(minutes);
      }
      setTimerHour(hour);
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [timerSeconds]);

  useEffect(() => {
    const textTimer = setTimeout(() => {
      if (textIndex == 9) {
        setTextIndex(0);
      } else {
        setTextIndex(textIndex + 1);
      }
    }, 5000);

    return () => {
      clearTimeout(textTimer);
    };
  }, [textIndex]);

  useEffect(() => {
    if (isPlaying) {
      audio.current.play();
    } else {
      audio.current.pause();
    }
    progressBar.current.max = songs[currentSongIndex].duration;
  }, [isPlaying, currentSongIndex]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(function () {
        progressBar.current.value = parseInt(progressBar.current.value) + 1;
        document.documentElement.style.setProperty(
          "--seek-before-width",
          `${
            (parseInt(progressBar.current.value) /
              songs[currentSongIndex].duration) *
            100
          }%`
        );
        setCurrentTime(calculateTime(parseInt(progressBar.current.value) + 1));
        console.log(isPlaying);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [isPlaying, currentTime, currentSongIndex]);

  useEffect(() => {
    setNextSongIndex(() => {
      if (isShuffling) {
        if (currentSongIndex + 1 > songs.length - 1) {
          return 0;
        } else {
          return currentSongIndex + 1;
        }
      } else {
        return currentSongIndex;
      }
    });
    progressBar.current.value = 0;
    document.documentElement.style.setProperty("--seek-before-width", "0%");
    setDuration(calculateTime(songs[currentSongIndex].duration));
    progressBar.current.max = songs[currentSongIndex].duration;
    setCurrentTime(calculateTime(progressBar.current.value));
  }, [currentSongIndex, songs.length]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };
  const changeRange = () => {
    audio.current.currentTime = progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    document.documentElement.style.setProperty(
      "--seek-before-width",
      `${(progressBar.current.value / songs[currentSongIndex].duration) * 100}%`
    );
    setCurrentTime(calculateTime(progressBar.current.value));
  };

  const SkipSong = (forwards = true) => {
    if (forwards) {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp++;

        if (temp > songs.length - 1) {
          temp = 0;
        }

        return temp;
      });
    } else {
      setCurrentSongIndex(() => {
        let temp = currentSongIndex;
        temp--;

        if (temp < 0) {
          temp = songs.length - 1;
        }

        return temp;
      });
    }
    setDuration(songs[currentSongIndex].duration);
    progressBar.current.max = songs[currentSongIndex].duration;
  };
  const guideText = [
    "Meditation is linked with feeling less stressed as well as actually lowering the stress hormone cortisol.",
    "In studies students who were trained in mindfulness meditation achieved better grades.",
    "Some even claim that by meditating daily you can reverse the aging process.",
    "We experience less anxiety as meditation loosens connections: to particular neural pathways.",
    "Meditation is linked to more creativity and new ideas.",
    "Rapid memory ecall improves with daily meditation.",
    "Meditation linked with decreased cigarette, alcohol, and drug abuse.",
    "Meditation helps the elderly feel less lonely and reduce genes linked to inflammation.",
    "Meditation helps us to process emotions even when we're not actively meditating.",
    "Meditation can result in brain changes that protect against mental health conditions.",
  ];

  return (
    <>
      <div className="meditation-outer fc" style={{ background: "black" }}>
        <div
          className="meditation-upper df fr"
          style={{ width: "100vw", height: "84vh" }}
        >
          <div
            className="breathe-tester-outer"
            style={{
              width: "75vw",
              position: "relative",
              margin: "50px 50px",
            }}
          >
            <AnimatePresence>
              <PopUp
                text={guideText[textIndex]}
                pos={textIndex % 2 == 0 ? false : true}
              />
            </AnimatePresence>
            <video
              src={meditationVideo}
              style={{ position: "absolute", width: "100%", borderRadius: 10 }}
              defaultmuted
              muted
              autoPlay
              loop
            ></video>
          </div>
          <div className="mediation-right df" style={{ width: "25vw" }}>
            <div
              className="meditation-timer-outer df fc aic"
              style={{ width: "100%", marginTop: 50 }}
            >
              <div className="counter-outer-meditation df jcc aic">
                <div className="timer-outer df jcc color-black">
                  <span className="color-black">
                    {timerHour < 10 ? "0" + timerHour : timerHour} :{" "}
                    {timerMinutes < 10 ? "0" + timerMinutes : timerMinutes} :{" "}
                    {timerSeconds < 10 ? "0" + timerSeconds : timerSeconds}
                  </span>
                </div>
              </div>
              <div className="music-playlist-outer df fc aic">
                <div className="playlist-title" style={{ marginBottom: 20 }}>
                  <h3 style={{ color: "white" }}>Playlist</h3>
                </div>
                <div
                  className="music-playlist-list df fc"
                  style={{ width: "90%" }}
                >
                  {songs.map((song, index) => {
                    return (
                      <div
                        className={`music-playlist df ${
                          index === currentSongIndex ? "active" : ""
                        }`}
                        style={{ marginBottom: 10 }}
                      >
                        <div
                          className="music-photo"
                          style={{
                            width: "80px",
                            height: "80px",
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: "50%",
                          }}
                        >
                          <img
                            src={song.img}
                            alt=""
                            style={{
                              width: "100%",
                              position: "absolute",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                        <div
                          className="music-desc df fc jcc"
                          style={{ marginLeft: 20 }}
                        >
                          <div className="music-name" style={{ fontSize: 18 }}>
                            {song.title}
                          </div>
                          <div
                            className="music-artist"
                            style={{ fontSize: 12 }}
                          >
                            {song.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="meditation-music-outer df fc" style={{}}>
          <div className="control df jcc aic">
            <div
              className="btn btn-repeat"
              onClick={() => setIsShuffling(!isShuffling)}
            >
              <i
                className="fas fa-redo color-white"
                style={{ color: !isShuffling ? "white" : "#666" }}
              ></i>
            </div>
            <div className="btn btn-prev" onClick={() => SkipSong(false)}>
              <i className="fas fa-step-backward color-white"></i>
            </div>
            <div className="btn btn-toggle-play">
              {isPlaying ? (
                <i
                  className="fas fa-pause icon-pause color-black"
                  onClick={() => setIsPlaying(!isPlaying)}
                ></i>
              ) : (
                <i
                  className="fas fa-play icon-play color-black"
                  onClick={() => setIsPlaying(!isPlaying)}
                ></i>
              )}
            </div>
            <div className="btn btn-new" onClick={() => SkipSong()}>
              <i className="fas fa-step-forward color-white"></i>
            </div>
            <div
              className="btn btn-random"
              onClick={() => setIsShuffling(!isShuffling)}
            >
              <i
                className="fas fa-random color-white"
                style={{ color: isShuffling ? "white" : "#666" }}
              ></i>
            </div>
          </div>

          {/* <input
          id="progress"
          ref={progressBar}
          className="progress"
          style={{ margin: "10px 10%", width: "80%" }}
          type="range"
          defaultValue="0"
          step="0.1"
          min="0"
          onChange={changeRange}
            /> */}
          <div
            className="progressBar-wrapper df aic jcc"
            style={{ width: "80%", margin: "10px 10%" }}
          >
            <div className="current-time color-white" style={{ width: 50 }}>
              {currentTime}
            </div>
            <input
              type="range"
              className="progressBar"
              defaultValue="0"
              ref={progressBar}
              style={{}}
              onChange={changeRange}
            />
            <div className="duration-time  color-white" style={{ width: 50 }}>
              {duration}
            </div>
          </div>
          <audio
            id="audio"
            src={songs[currentSongIndex].src}
            ref={audio}
          ></audio>
        </div>
        <div style={{ position: "absolute", right: 44, bottom: 25 }}>
          <button
            style={{
              padding: 20,
              border: " none",
              borderRadius: 15,
              background: "#c2ffca",
              fontSize: 18,
            }}
            onClick={() => {
              StoreMeditation();
            }}
          >
            End session
          </button>
        </div>
      </div>
    </>
  );
};
