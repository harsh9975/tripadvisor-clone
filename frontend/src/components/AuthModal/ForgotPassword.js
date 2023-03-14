import React from "react";
import Button from "../Button";
import TextField from "../TextField";
import styles from "./authmodal.module.css";

const ForgotPassword = ({setScreen}) => {
  return (
    <>
            <h2 style={{ padding: "10px 0" }}>Forgot your password?</h2>
            <p style={{fontSize:'12px',marginBottom:'20px'}}>No problem. Just enter your email address below — we’ll send you a link to reset it.</p>
            <TextField label="Email" placeholder="Enter Email" />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop: "20px",
                marginBottom: "10px",
              }}
            >
              <Button
                label="Send Link"
                style={{ width: "70%", height: "45px" }}
              />
            </div>
            <span className={styles.text} onClick={()=>setScreen('login')}>Already have an account?</span>
            </>
  )
}

export default ForgotPassword