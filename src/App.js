import "./App.css";
import Hero from "./components/Hero/Hero";
import NavBarHero from "./components/NavBar/NavBarHero";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Login from "./components/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import ExerciseComponent from "./components/ExerciseComponent/ExerciseComponent";
import Signup from "./components/Signup/Signup";
import ExerciseSummary from "./components/ExerciseSummary/ExerciseSummary";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/exercisesummary" element={<ExerciseSummary />} />
        <Route path="/exercises" element={<ExerciseComponent />} />
        <Route
          path="/"
          element={
            <>
              <NavBarHero />
              <Hero />
            </>
          }
        />
        <Route path="/dashboard" element={<Dashboard />} />
        {/*
         */}
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/resetpass" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
