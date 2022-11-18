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
import { MeditationComponent } from "./components/MeditationComponent/MeditationComponent";
import ExerciseChoices from "./ExerciseChoices/ExercisesChoices";
import ReportComponent from "./components/ReportComponent/ReportComponent";
import ChartComponent from "./components/ChartComponent/ChartComponent";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/report" element={<ReportComponent />} />
        <Route path="/exercises" element={<ExerciseComponent />} />
        <Route path="/meditation" element={<MeditationComponent />} />
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
        <Route path="/forgotpass" element={<ForgotPassword />} />
        <Route path="/resetpass" element={<ResetPassword />} />
        <Route path="/login" element={<Login />} />
        <Route path="/temp" element={<ExerciseChoices />} />
        <Route path="/chart" element={<ChartComponent />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
