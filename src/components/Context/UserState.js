import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

export const UserState = (props) => {
  const [user, setUser] = useState({ id: "", name: "", email: "" });
  const [exerciseIndex, setExerciseIndex] = useState()
  const [exercise, setExercise] = useState([{}]);
  const host = "http://localhost:5000";

  const setuser = (id, name, email) => {
    setUser({ id, name, email });
  };

  const fetchExercise = async (exerciseName) => {
    //API call
    const response = await fetch(`${host}/storeexercise`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: user.email }),
    });
    const data = await response.json();
    setExercise([data]);
  };

  return (
    <UserContext.Provider value={{ user, setuser, exerciseIndex, setExerciseIndex }}>
      {props.children}
    </UserContext.Provider>
  );
};
