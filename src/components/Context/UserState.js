import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

export const UserState = (props) => {
  const [user, setUser] = useState({ id: "", name: "", email: "" });
  const [exerciseIndex, setExerciseIndex] = useState();
  const [exercise, setExercise] = useState([{}]);
  const [meditation, setMeditation] = useState([{}]);
  const host = "http://localhost:5000";

  const setuser = (id, name, email) => {
    console.log(user.name);
    setUser({ id, name, email });
  };

  const fetchExercise = async (date = "2022-11-18") => {
    //API call
    const response = await fetch(`${host}/api/fetchexercise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
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

  const fetchMeditation = async (date = Date.now()) => {
    //API call
    const response = await fetch(`${host}/api/fetchmeditation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    });
    const data = await response.json();
    console.log(data);

    let newData = data.filter((d) => {
      return d.meditationDate.slice(0, 10) === date;
    });
    console.log(newData);
    setExercise(newData);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setuser,
        exerciseIndex,
        setExerciseIndex,
        fetchExercise,
        exercise,
        fetchMeditation,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
