import { createContext } from "react";
import { useState } from "react";

export const UserContext = createContext();

export const UserState = (props) => {
  const [user, setUser] = useState({ id: "", name: "", email: "" });
  const [exerciseIndex, setExerciseIndex] = useState()

  const setuser = (id, name, email) => {
    setUser({ id, name, email });
  };
  return (
    <UserContext.Provider value={{ user, setuser, exerciseIndex, setExerciseIndex }}>
      {props.children}
    </UserContext.Provider>
  );
};
