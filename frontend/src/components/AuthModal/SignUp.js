import React, { useState } from "react";
import { useMutation } from "react-query";
import { signupUser } from "../../utils/apicalls";
import Button from "../Button";
import TextField from "../TextField";
import styles from "./authmodal.module.css";

const SignUp = ({ setScreen }) => {
  const [name, setName] = useState({ value: "", error: "" });
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const { isLoading, mutateAsync, data } = useMutation(
    "register",
    signupUser,
    {
      onSuccess:()=>setScreen('login')
    }
  );
  console.log("data", data);

  const handleSubmit = async () => {
    if (name.value === "") {
      setName({ value: "", error: "Please enter required" });
    }
    if (email.value === "") {
      setEmail({ value: "", error: "Please enter email" });
    }
    if (password.value === "" || password.value.length < 8) {
      setPassword({ value: "", error: "Passowrd Required" });
    }
    if (
      name.value !== "" &&
      email.value !== "" &&
      (password.value !== "" || password.value.length >= 8)
    ) {
      let formData = {
        name: name.value,
        email: email.value,
        password: password.value,
      };
      await mutateAsync(formData)
    }
  };
  return (
    <>
      <h2 style={{ padding: "10px 0" }}>
        Join to unlock the best <br /> of Tripadvisor
      </h2>
      <TextField
        label="Name"
        placeholder="Enter Name"
        value={name.value}
        onChange={(e) => setName({ value: e.target.value, error: "" })}
        error={name.error}
      />
      <TextField 
      label="Email" 
      placeholder="Enter Email"
      value={email.value}
        onChange={(e) => setEmail({ value: e.target.value, error: "" })}
        error={email.error}
       />
      <TextField
        label="Password"
        placeholder="Enter Password"
        type="password"
        value={password.value}
        onChange={(e) => setPassword({ value: e.target.value, error: "" })}
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
          label="Sign Up"
          style={{ width: "70%", height: "45px" }}
          loading={isLoading}
          onClick={handleSubmit}
        />
      </div>
      <span className={styles.text} onClick={() => setScreen("login")}>
        Already have an account?
      </span>
    </>
  );
};

export default SignUp;
