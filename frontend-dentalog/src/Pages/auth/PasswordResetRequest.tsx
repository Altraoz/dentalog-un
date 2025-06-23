import "../App.css";
import React, { useState } from "react";
import { Box } from "@mui/material";
import MyTextField from "../../forms/MyTextField";
import MyPassField from "../../forms/MyPassField";
import MyButton from "../../forms/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import MyMessage from "./Message";
import "../styles/login.scss";
import loginImg from "../assets/images/img_login.avif";

type FormData = {
  email: string;
};

const PasswordResetRequest: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit, control } = useForm<FormData>();
  const [ShowMessage, setShowMessage] = useState<boolean>(false);

  const submission = (data: FormData) => {
    AxiosInstance.post(`api/password_reset/`, {
      email: data.email,
    }).then((response) => {
      setShowMessage(true);
    }).catch((error) => {
      console.error("Error sending password reset request", error);
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
            text={
              "If your email exists you have received an email with instructions for resetting the password"
            }
            color={"#69C9AB"}
          />
        ) : null}
        <form onSubmit={handleSubmit(submission)}>
          <Box>
            <Box className={"itemBox"}>
              <Box className={"title"}> Solicitar contraseña nueva </Box>
            </Box>

            <Box className={"itemBox"}>
              <MyTextField label={"Correo"} name={"email"} control={control} />
            </Box>

            <Box className={"itemBox"}>
              <MyButton label={"Enviar"} type={"submit"} />
            </Box>

            <Box className={"itemBox"} sx={{ flexDirection: "column" }}></Box>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetRequest;
