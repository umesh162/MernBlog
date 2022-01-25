import axios from "axios";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";


require("./login.css");
const Login = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching, error } = useContext(Context);
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    axios
      .post("/auth/signin", {
        username: usernameRef.current.value,
        password: passwordRef.current.value,
      })
      .then((resp) => {
        dispatch({ type: "LOGIN_SUCCESS", payload: resp.data });
      })
      .catch(() => dispatch({ type: "LOGIN_FAILURE" }));
  };
  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <hr className="labelLine"/>
        <input
          className="input"
          type="text"
          placeholder="Enter your username..."
          ref={usernameRef}
        />
        <label>Password</label>
        <hr className="labelLine"/>
        <input
          className="input"
          type="password"
          placeholder="Enter your password.."
          ref={passwordRef}
        />
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      {error && <label style={{ color: "red" }}>Wrong credentials ⚠️</label>}
      </form>
    </div>
  );
};

export default Login;