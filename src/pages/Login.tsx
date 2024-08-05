import "@scss/login.scss";
import TextField from "@mui/material/TextField";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import KiaLogVideo from "@videos/Y2meta.app-The Kia EV9 Teaser _ Lights-(1080p).mp4";
import * as jose from "jose";
import axios from "axios";
import { notification } from "antd";
const Login = () => {
  async function generateToken(data: any) {
    const jwt = await new jose.SignJWT(data)
      .setProtectedHeader({ alg: "HS256" })
      .sign(new TextEncoder().encode("ntbphuoc"));
    return jwt;
  }

  // generateToken(data)
  // .then(res => {
  //   console.log("res", res)
  // })

  const handleLogin = (e: any) => {
    e.preventDefault();

    axios.get("http://localhost:3000/users").then((res) => {
      const userData = res.data;
      const enteredEmail = e.target.email.value;
      const enteredPassword = e.target.password.value;

      const user = userData.find(
        (user: any) =>
          user.email === enteredEmail && user.password === enteredPassword
      );

      if (user?.role === "admin") {
        generateToken(user).then((token) => {
          localStorage.setItem("token", token);
          window.location.href = "/admin";
        });
      } else if (user) {
        console.log("user login", user);
        notification.success({ message: "Đăng nhập thành công" });
        generateToken(user).then((token) => {
          localStorage.setItem("token", token);

          window.location.href = "/";
        });
      } else {
        notification.error({ message: "Đăng nhập thất bại" });
      }
    });
  };

  return (
    <div>
      <video
        autoPlay
        muted
        loop
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
        }}
      >
        <source src={KiaLogVideo} type=""></source>
      </video>

      <div className="container-login">
        <form
          onSubmit={handleLogin}
          style={{
            position: "absolute",
            top: "20%",
            left: "35%",
            backgroundColor: "rgba(15, 16, 16, 0.546)",
            border: "1px solid #f1f1f1",
            padding: "20px",
            borderRadius: "10px",
            width: "450px",
          }}
        >
          <h1>Login</h1>
          <div className="container-login-email">
            <label htmlFor="email">Email</label>
            <TextField
              style={{
                color: "white",
                width: "250px",
              }}
              type="email"
              name="email"
              id="email"
              variant="standard"
            />
          </div>

          <div className="container-login-password">
            <label htmlFor="password">Password</label>
            <TextField
              style={{
                // paddingRight: "80px",
                width: "250px",
              }}
              type="password"
              name="password"
              id="password"
              variant="standard"
            />
          </div>

          <div
            style={{
              marginTop: "10px",
            }}
          >
            <input type="checkbox" id="remember-me" />
            <label
              htmlFor="remember-me"
              style={{
                color: "white",
              }}
            >
              Remember me
            </label>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            <a href="/">Forgot password?</a>
            <Link to={"/register"}>Create account</Link>
          </div>
          <div className="container-login-google">
            <button>
              <GoogleIcon />
              <span>Login with Google</span>
            </button>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
