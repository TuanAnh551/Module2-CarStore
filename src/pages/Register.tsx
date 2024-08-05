import "@scss/register.scss";
import TextField from "@mui/material/TextField";
import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import KiaReVideo from "@videos/Y2meta.app-Kia India _ The new Seltos _ Badass 2.0-(1080p).mp4";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ReactNode } from "react";
// import { GoogleLogin } from "@react-oauth/google";

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,

    formState: { errors },
  } = useForm();
  const onSubmit = async (data: any) => {
    try {
      const user = await axios.get("http://localhost:3000/users");
      console.log(user);
      if (user.data.find((item: any) => item.email === data.email)) {
        alert("Email đã tồn tại");
        return;
      }
      delete data.confirmpass;

      // Thêm trường cart và role vào dữ liệu
      const userData = {
        ...data,
        role: "member",
        cart: [],
        receipts: [],
      };

      const res = await axios.post("http://localhost:3000/users", userData);
      console.log(res);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
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
        <source src={KiaReVideo} type="video/mp4"></source>
      </video>

      <div className="container-login">
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            position: "absolute",
            top: "5%",
            left: "35%",
            backgroundColor: "rgba(15, 16, 16, 0.546)",
            border: "1px solid #f1f1f1",
            padding: "20px",
            borderRadius: "10px",
            width: "450px",
          }}
        >
          <h1>Register</h1>
          <div className="container-login-email">
            <label htmlFor="Username">Name</label>
            <TextField
              style={{
                width: "250px",
                marginTop: "20px",
              }}
              {...register("Username", {
                required: {
                  value: true,
                  message: "Tên không được để trống",
                },
              })}
              type="Username"
              name="Username"
              id="Username"
              variant="standard"
            />
            {errors.Username && (
              <p style={{ color: "red" }}>
                {errors.Username.message as ReactNode}
              </p>
            )}
          </div>

          <div className="container-login-email">
            <label htmlFor="email">Email</label>
            <TextField
              style={{
                width: "250px",
                marginTop: "20px",
              }}
              {...register("email", {
                required: {
                  value: true,
                  message: "Email không được để trống",
                },
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Email không đúng định dạng",
                },
              })}
              type="email"
              name="email"
              id="email"
              variant="standard"
            />
            {errors.email && (
              <p style={{ color: "red" }}>
                {errors.email.message as ReactNode}
              </p>
            )}
          </div>

          <div className="container-login-password">
            <label htmlFor="password">Password</label>
            <TextField
              style={{
                // paddingRight: "80px",
                width: "250px",
                marginTop: "20px",
              }}
              {...register("password", {
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống",
                },
                minLength: {
                  value: 6,
                  message: "Password phải lớn hơn 6 ký tự",
                },
              })}
              type="password"
              name="password"
              id="password"
              variant="standard"
            />
            {errors.password && (
              <p style={{ color: "red" }}>
                {errors.password.message as ReactNode}
              </p>
            )}
          </div>

          <div className="container-login-password">
            <label htmlFor="confirmpass">Confirm Password</label>
            <TextField
              style={{
                // paddingRight: "80px",
                width: "200px",
                marginTop: "20px",
              }}
              {...register("confirmpass", {
                required: {
                  value: true,
                  message: "Mật khẩu không được để trống",
                },
                validate: {
                  matchesPreviousPassword: (value) => {
                    const { password } = getValues();
                    return password === value || "Mật khẩu không khớp";
                  },
                },
              })}
              type="password"
              name="confirmpass"
              id="confirmpass"
              variant="standard"
            />
            {errors.confirmpass && (
              <p style={{ color: "red" }}>
                {errors.confirmpass.message as ReactNode}
              </p>
            )}
          </div>

          <div
            style={{
              marginTop: "10px",
            }}
          ></div>

          <div className="container-login-google">
            <button>
              <GoogleIcon />
              <span>Login with Google</span>
            </button>
          </div>
          <div>
            <button type="submit">Register</button>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "10px",
              }}
            >
              <p style={{ color: "white" }}>Have an account?</p>
              <Link to={"/login"}>Login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
