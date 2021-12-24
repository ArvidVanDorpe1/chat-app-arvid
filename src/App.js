import React from "react";
import "./App.css";
import Sidebar from "./features//Sidebar/Sidebar";
import Chat from "./features/Chat/Chat";
import { selectUser } from "./features/Reducers/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Login from "./features/Login/Login";
import { useEffect } from "react";
import { auth } from "./firebase";
import { login, logout } from "./features/Reducers/userSlice";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          login({
            uid: user.uid,
            photo: user.photoURL,
            email: user.email,
            displayName: user.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);
  return (
    <div className="app">
      {user ? (
        <>
          <Sidebar />
          <Chat />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
