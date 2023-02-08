import "./App.css";
import { MainPage } from "./components/Main/MainPage";
import Nav from "./components/Nav";
import { WelcomeForm } from "./components/WelcomeForm";
import Bg from "./jacopo-maia--gOUx23DNks-unsplash.jpg";
import Details from "./pages/Details";
import Favourits from "./pages/Favourits";
import Food from "./pages/Food";
import Home from "./pages/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetProfileQuery } from "./store/services/users";
import { clearupFunc } from "./utils/helperFuncs";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  /*  const accessToken=localStorage.getItem("token")
  useEffect(() => {
    if (!accessToken) window.location.href = "/";
  }, [accessToken]);
 */
  const { isError, data, isSuccess } = useGetProfileQuery();

  useEffect(() => {
    if (!isError) {
      clearupFunc();
    }
  }, []);

  return (
    <>
      <Nav {...{ isOpen, setIsOpen }} />
      {localStorage.getItem("token") ? (
        <Routes>
          <Route path="/" element={<Home {...{ isOpen, setIsOpen }} />} />
          <Route
            path="/details"
            element={<Details {...{ isOpen, setIsOpen }} />}
          />
          <Route
            path="/favourits"
            element={<Favourits {...{ isOpen, setIsOpen }} />}
          />
          <Route path="/food" element={<Food {...{ isOpen, setIsOpen }} />} />
          <Route
            path="/signup"
            element={<WelcomeForm {...{ isOpen, setIsOpen }} />}
          />
          <Route
            path="*"
            element={<Navigate to="/" replace {...{ isOpen, setIsOpen }} />}
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home {...{ isOpen, setIsOpen }} />} />
          <Route
            path="/signup"
            element={<WelcomeForm {...{ isOpen, setIsOpen }} />}
          />
          <Route
            path="*"
            element={
              <Navigate to="/signup" replace {...{ isOpen, setIsOpen }} />
            }
          />
        </Routes>
      )}
    </>
  );
}

export default App;
