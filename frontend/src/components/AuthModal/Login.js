import React, { useState } from "react";
import { useMutation } from "react-query";
import { useStateValue } from "../../store";
import { actionTypes } from "../../store/reducer";
import { loginUser } from "../../utils/apicalls";
import Button from "../Button";
import TextField from "../TextField";
import styles from "./authmodal.module.css";

const Login = ({ setScreen }) => {
  const [{token},dispatch] =useStateValue()
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  console.log(token)

  const {isLoading,mutateAsync} = useMutation('login',loginUser,
  {onSuccess:(data)=>{
    dispatch({
      type: actionTypes.SET_USER,
      token:data?.token,
      user:data?.user
    })
    localStorage.setItem("token", data?.token);
    localStorage.setItem("user", JSON.stringify(data?.user));
  }});

  const handleSubmit = async () => {
    if (email.value === "") {
      setEmail({ value: "", error: "Please enter email" });
    }
    if (password.value === "" || password.value.length < 8) {
      setPassword({ value: "", error: "Passowrd Required" });
    } 
    if(email.value !== "" && (password.value !== "" || password.value.length >= 8) ) {
      let formData = {
        email: email.value,
        password: password.value,
      };
        await mutateAsync(formData)

      }
  };
  return (
    <>
      <h2 style={{ padding: "10px 0" }}>Welcome Back</h2>
      <TextField
        label="Email"
        placeholder="Enter Email"
        value={email.value}
        onChange={(e) => setEmail({ value: e.target.value, error: "" })}
        error={email.error}
      />
      <TextField
        label="Password"
        value={password.value}
        placeholder="Enter Password"
        onChange={(e) => setPassword({ value: e.target.value, error: "" })}
        type="password"
        error={password.error}
      />
      <span
        className={styles.text}
        onClick={() => setScreen("forgot-password")}
      >
        Forgot Password?
      </span>

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
          label="Sign In"
          style={{ width: "70%", height: "45px" }}
          onClick={handleSubmit}
          loading={isLoading}
        />
      </div>
      <span className={styles.text} onClick={() => setScreen("signup")}>
        Create an account?
      </span>
    </>
  );
};

export default Login;
