import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

export const UserState = (props) => {
  const [exerciseIndex, setExerciseIndex] = useState();
  const [user, setUser] = useState({});
  const [exercise, setExercise] = useState([{}]);
  const [meditation, setMeditation] = useState({ meditationDuration: 0 });
  const host = "http://localhost:5000";
  const [weight, setWeight] = useState([{}]);
  const [currentWeight, setCurrentWeight] = useState(0);

  const fetchExercise = async (date = Date.now().slice(0, 10)) => {
    console.log(Date.now().slice(0, 10));
    //API call
    const response = await fetch(`${host}/api/fetchexercise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: localStorage.getItem("email") }),
    });
    const data = await response.json();
    console.log(data);

    let newData = data.filter((d) => {
      return d.date.slice(0, 10) === date;
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

  const fetchMeditation = async (date = "2022-11-18") => {
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

    let newData = data.filter((d) => {
      if (d.meditationDate.slice(0, 10) === date) {
        setMeditation(meditation.meditationDuration + d.meditationDuration);
      }
    });
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
    setUser(data);
    setWeight(data.weight);
    setCurrentWeight(data.weight[weight.length - 1].weightValue);
  };

  return (
    <UserContext.Provider
      value={{
        exerciseIndex,
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
