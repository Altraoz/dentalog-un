import "../App.css";
import { React, useState } from "react";
import { Box } from "@mui/material";
import MyTextField from "../../forms/MyTextField";
import MyPassField from "../../forms/MyPassField";
import MyButton from "../../forms/MyButton";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import { useNavigate } from "react-router-dom";
import MyMessage from "./Message";
import "../styles/login.scss";
import loginImg from "../assets/images/img_login.avif";

const Login = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm();
  const [ShowMessage, setShowMessage] = useState(false);

  const submission = (data) => {
    AxiosInstance.post(`login/`, {
      email: data.email,
      password: data.password,
    })

      .then((response) => {
        console.log(response);
        localStorage.setItem("Token", response.data.token);
        navigate(`/home`);
      })
      .catch((error) => {
        setShowMessage(true);
        console.error("Error during login", error);
      });
  };

  return (
    <div className={"login-bg"}>
      <div className="image-container">
        <img src={loginImg} alt="Descripción" />
      </div>
      <div className="loginContainer">
        {ShowMessage ? (
          <MyMessage
            text={"Login has failed, please try again, or reset your password"}
            color={"#EC5A76"}
          />
        ) : null}
        <form
          onSubmit={handleSubmit(submission)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Box className={""}>
            <Box className={"itemBox"}>
              <Box className={"title"}> Zafari Dental 🦷 </Box>
            </Box>

            <Box className={"itemBox"}>
              <MyTextField label={"Correo"} name={"email"} control={control} />
            </Box>

            <Box className={"itemBox"}>
              <MyPassField
                label={"Contraseña"}
                name={"password"}
                control={control}
              />
            </Box>

            <Box className={"itemBox"}>
              <MyButton label={"Login"} type={"submit"} />
            </Box>

            <Box className={"itemBox"} sx={{ flexDirection: "column" }}>
              <Link to="/register"> ¿Deseas registrarte? </Link>
              <Link to="/request/password_reset">
                {" "}

                Recuperar contraseña{" "}
              </Link>
            </Box>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Login;
