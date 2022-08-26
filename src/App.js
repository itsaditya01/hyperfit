import "./App.css";
import Hero from "./components/Hero/Hero";
import NavBarHero from "./components/NavBar/NavBarHero";
import Signup from "./components/Signup/Signup";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Login from "./components/Login/Login";
import Form from "./components/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route
          path="/hero"
          element={
            <>
              <NavBarHero />
              <Hero />
            </>
          }
        />
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
