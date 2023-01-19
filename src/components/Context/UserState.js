import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

export const UserState = (props) => {
  const [exerciseIndex, setExerciseIndex] = useState();
  const [user, setUser] = useState({});
  const [exercise, setExercise] = useState([{}]);
  const [meditation, setMeditation] = useState(0);
  const host = "http://localhost:5000";
  const [weight, setWeight] = useState([]);
  const [currentWeight, setCurrentWeight] = useState(0);
  const [total, setTotal] = useState({
    totalDuration: 0,
    totalRepsPerformed: 0,
    totalPartialReps: 0,
    totalCaloriesBurned: 0,
    cnt: 0,
    avgExerciseDuration: 0,
  });

  const fetchExercise = async (dateInfo) => {
    //API call
    const response = await fetch(`${host}/api/fetchexercise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: localStorage.getItem("email") }),
    });
    const data = await response.json();

    let newData = data.filter((d) => {
      return d.date.slice(0, 10) === dateInfo;
    });
    let totalDuration = 0,
      totalRepsPerformed = 0,
      totalPartialReps = 0,
      totalCaloriesBurned = 0,
      cnt = 0,
      avgExerciseDuration = 0;
    let exerciseDone = [0, 0, 0, 0];
    for (let i = 0; i < newData.length; i++) {
      totalDuration += newData[i].exerciseDuration;
      totalRepsPerformed += newData[i].repsPerformed;
      totalPartialReps += newData[i].partialReps;
      totalCaloriesBurned += newData[i].caloriesBurned;
      exerciseDone[newData[i].exerciseId]++;
    }
    for (let i = 0; i < 4; i++) {
      if (exerciseDone[i] > 0) {
        cnt++;
      }
    }
    // totalDuration /= 60;
    avgExerciseDuration = totalDuration / cnt;
    setTotal({
      totalDuration,
      totalRepsPerformed,
      totalPartialReps,
      totalCaloriesBurned,
      cnt,
      avgExerciseDuration,
    });
    // let readyData = [];
    // let repeat = [0, 0, 0, 0];
    // for (let i = 0; i < newData.length - 1; i++) {
    //   if (repeat[newData[i].exerciseId] === 0) {
    //     for (let j = i + 1; i < newData.length; j++) {
    //       if (newData[i].exerciseId === newData[j].exerciseId) {
    //         let temp = {};
    //         temp.exerciseDuration =
    //           newData[i].exerciseDuration + newData[j].exerciseDuration;
    //         temp.partialReps = newData[i].partialReps + newData[j].partialReps;
    //         temp.repsPerformed =
    //           newData[i].repsPerformed + newData[j].repsPerformed;
    //         temp.caloriesBurned =
    //           newData[i].caloriesBurned + newData[j].caloriesBurned;
    //         readyData.push(temp);
    //         repeat[newData[i].exerciseId]++;
    //       }
    //     }
    //   }
    // }
    console.log(newData);
    setExercise(newData);
  };

  const fetchMeditation = async (date) => {
    //API call
    const response = await fetch(`${host}/api/fetchmeditation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: localStorage.getItem("email") }),
    });
    const data = await response.json();
    console.log(data);
    let da = 0;
    let newData = data.filter((d) => {
      if (d.meditationDate.slice(0, 10) === date) {
        da += d.meditationDuration;
      }
    });
    setMeditation(da);
    console.log(newData);
  };

  const getUser = async () => {
    //API call
    const response = await fetch(`${host}/api/auth/getuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: localStorage.getItem("email") }),
    });
    const data = await response.json();
    setWeight(data.weight);
    setUser(data);
    setCurrentWeight(data.weight[weight.length - 1].weightValue);
  };

  return (
    <UserContext.Provider
      value={{
        exerciseIndex,
        total,
        setExerciseIndex,
        weight,
        currentWeight,
        fetchExercise,
        user,
        getUser,
        exercise,
        meditation,
        fetchMeditation,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
