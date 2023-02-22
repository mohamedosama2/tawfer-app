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
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import axios from "axios";
import { useSubscribeMutation } from "./store/services/notifications";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  appId: process.env.REACT_APP_appId,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  measurementId: process.env.REACT_APP_measurementId,
};

initializeApp(firebaseConfig);
function App() {
  const [subscribeToken] = useSubscribeMutation();
  console.log(process.env);
  async function getFCMToken() {
    const messaging = getMessaging();
    try {
      // Don't forget to paste your VAPID key here
      // (you can find it in the Console too)
      const token = await getToken(messaging, {
        vapidKey: process.env.REACT_APP_vapidKey,
      });
      await subscribeToken({
        NotificationToken: token,
        token: localStorage.getItem("token"),
        type: "web",
      });

      return token;
    } catch (e) {
      console.log("getFCMToken error r", e);
      return undefined;
    }
  }

  useEffect(() => {
    getFCMToken();
  }, [localStorage.getItem("token")]);
  const [isOpen, setIsOpen] = useState(false);

  const { isError, data, isSuccess } = useGetProfileQuery({
    token: localStorage.getItem("token") ? localStorage.getItem("token") : "",
  });

  useEffect(() => {
    if (isError) {
      console.log(localStorage.getItem("token"));
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
            path="/details/:id"
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
