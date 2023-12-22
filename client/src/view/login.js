import "../styling/registration/registration.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

  const { setUserInfo } = useContext(UserContext);

  const login = async (event) => {
    event.preventDefault();
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    if (response.ok) {
      window.alert("You are now logged in!");
      response.json().then((response) => {
        setUserInfo(response);
        setRedirect(true);
        return <Navigate to={"/"} />;
      });
    } else {
      window.alert("Wrong credentials");
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <main>
      <form action="" onSubmit={login} className="userValidationForm">
        <h2>Login</h2>
        <input
          autoComplete="off"
          type="text"
          name="username"
          value={username}
          placeholder="username"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          autoComplete="off"
          type="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button>Submit</button>
        <Link to="/register">Nie masz konta? zarejestruj się</Link>
      </form>
    </main>
  );
};

export default Login;
