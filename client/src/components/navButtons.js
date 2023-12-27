import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
import { useContext, useState, useEffect } from "react";
import "../styling/navButtons/navButtons.css";

const NavButtons = () => {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const logout = () => {
    fetch("http://localhost:4000/logout", {
      method: "POST",
      credentials: "include",
    });
    setUserInfo(null);
  };

  return (
    <nav id="navButtons">
      {userInfo ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
};

export default NavButtons;
