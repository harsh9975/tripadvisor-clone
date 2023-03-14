import React, { useState } from "react";
import styles from "./authmodal.module.css";
import ForgotPassword from "./ForgotPassword";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthModal = () => {
  const [screen, setScreen] = useState("login");
  const authModules = (value) => {
    switch (value) {
      case "login":
        return <Login setScreen={setScreen}/>

    case "signup":
        return <SignUp setScreen={setScreen} />

    case "forgot-password":
        return <ForgotPassword setScreen={setScreen}/>

      default:
        return <Login setScreen={setScreen}/>
    }
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", padding: "30px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          marginTop: "20px",
          marginBottom: "10px",
        }}
      >
        <img
          className={styles.logo}
          src="https://static.tacdn.com/img2/brand_refresh/Tripadvisor_Logo_dark-bg_circle-green_horizontal-lockup_registered_RGB.svg"
          alt="tripadvisor"
        />
      </div>
      {
            authModules(screen)
        }
    </div>
  );
};

export default AuthModal;
