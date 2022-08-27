import "./App.css";
import Hero from "./components/Hero/Hero";
import NavBarHero from "./components/NavBar/NavBarHero";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Login from "./components/Login/Login";
import Form from "./components/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import Mediapipe from "./components/Mediapipe/Mediapipe";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Form />} />
        <Route path="/mediapipe" element={<Mediapipe />} />
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
