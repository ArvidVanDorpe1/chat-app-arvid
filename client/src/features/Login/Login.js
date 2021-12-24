import { Button } from "@material-ui/core";
import React from "react";
import "./Login.css";
import { auth, provider } from "../../firebase";

const Login = () => {
  const signIn = () => {
    console.log("klik");
    auth.signInWithPopup(provider).catch((error) => alert(error.message));
  };

  return (
    <div className="login">
      <div className="login_logo">
        <img
          src="https://icons.iconarchive.com/icons/webalys/kameleon.pics/512/Chat-2-icon.png"
          alt="logo"
        />
      </div>
      <Button onClick={signIn}>Sign in</Button>
    </div>
  );
};

export default Login;
