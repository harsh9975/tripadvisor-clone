import React from "react";
import Button from "../Button";
import TextField from "../TextField";
import styles from "./authmodal.module.css";

const SignUp = ({setScreen}) => {
  return (
    <>
            <h2 style={{ padding: "10px 0" }}>Join to unlock the best <br/> of Tripadvisor</h2>
            <TextField label="Name" placeholder="Enter Name" />
            <TextField label="Email" placeholder="Enter Email" />
            <TextField
              label="Password"
              placeholder="Enter Password"
              type="password"
            />
             <span className={styles.text} onClick={()=>setScreen('forgot-password')}>Forgot Password?</span>
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
                label="Sign Up"
                style={{ width: "70%", height: "45px" }}
              />
            </div>
            <span className={styles.text} onClick={()=>setScreen('login')}>Already have an account?</span>
            </>
  )
}

export default SignUp