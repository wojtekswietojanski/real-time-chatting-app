import "../styling/registration/registration.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async (event) => {
    event.preventDefault();
    if (username.length > 1 || password.length > 1) {
      const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        window.alert("you are now registred");
      } else {
        window.alert(
          "registration failed, remember that username must be uniqe, try diffrent username"
        );
      }
    } else {
      window.alert("password and username must contain a minimum of 2 signs");
    }
  };

  return (
    <main>
      <form action="" onSubmit={register} className="userValidationForm">
        <h2>Create your account</h2>
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
        <Link to="/login">Masz już konto? Zaloguj się</Link>
      </form>
    </main>
  );
};

export default Registration;
