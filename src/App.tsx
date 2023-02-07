import "./App.css";
import { MainPage } from "./components/Main/MainPage";
import Nav from "./components/Nav";
import { WelcomeForm } from "./components/WelcomeForm";
import Bg from "./jacopo-maia--gOUx23DNks-unsplash.jpg";
import Details from "./pages/Details";
import Favourits from "./pages/Favourits";
import Food from "./pages/Food";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { useState } from "react";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Nav {...{ isOpen, setIsOpen }} />
      <Routes>
        <Route path="/" element={<Home {...{ isOpen, setIsOpen }}  />} />
        <Route path="/details" element={<Details {...{ isOpen, setIsOpen }} />} />
        <Route path="/favourits" element={<Favourits {...{ isOpen, setIsOpen }} />} />
        <Route path="/food" element={<Food {...{ isOpen, setIsOpen }} />} />
        <Route path="/signup" element={<WelcomeForm {...{ isOpen, setIsOpen }}  />} />
      </Routes>
    </>
  );
}

export default App;
