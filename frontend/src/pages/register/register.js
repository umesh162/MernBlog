import axios from "axios";
import { useState } from "react";

require("./register.css");
const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [resp, setResp] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("/auth/signup", {
        username,
        email,
        password,
      })
      .then((resp) => setResp(resp))
      .catch((err) => setError(true));
  };
  setTimeout(() => resp && window.location.replace("/login"), 3000);

  return (
    <div className="register">
      <span className="Registertitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <hr className="labelLine"/>
        <input
          type="text"
          className="registerInput"
          name="username"
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Email</label>
        <hr className="labelLine"/>
        <input
          type="email"
          className="registerInput"
          placeholder="Enter your email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <hr className="labelLine"/>
        <input
          type="password"
          className="registerInput"
          placeholder="Enter your password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="registerBtn" type="submit">
          Register
        </button>
        {resp && (
          <label style={{ color: "green" }}>
            Registration Successful redirecting to Login page....
          </label>
        )}
        {error && <label style={{ color: "red" }}>Something went wrong ⚠️</label>}
      </form>
    </div>
  );
};

export default Register;