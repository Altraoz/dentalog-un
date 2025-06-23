import "../App.css";
import { Box } from "@mui/material";
import MyTextField from "../../forms/MyTextField";
import MyPassField from "../../forms/MyPassField";
import MyButton from "../../forms/MyButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import AxiosInstance from "./AxiosInstance";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import loginImg from "../assets/images/img_login.avif";
import "../styles/register.scss";

// 1. Define types for form data
type RegisterFormData = {
  email: string;
  password: string;
  password2: string;
};

// 2. Define the validation schema
const schema: yup.SchemaOf<RegisterFormData> = yup.object({
  email: yup
    .string()
    .email("Field expects an email address")
    .required("Email is a required field"),
  password: yup
    .string()
    .required("Password is a required field")
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lower case letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*(),.?":;{}|<>+]/,
      "Password must contain at least one special character"
    ),
  password2: yup
    .string()
    .required("Password confirmation is a required field")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
  } = useForm<RegisterFormData>({
    resolver: yupResolver(schema),
  });

  const submission: SubmitHandler<RegisterFormData> = (data) => {
    AxiosInstance.post("register/", {
      email: data.email,
      password: data.password,
    }).then(() => {
      navigate(`/`);
    });
  };

  return (
    <div className={"login-bg"}>
      <div className="image-container">
        <img src={loginImg} alt="Descripción" />
      </div>
      <div className="loginContainer">
        <form onSubmit={handleSubmit(submission)}>
          <Box>
            <Box className={"itemBox"}>
              <Box className={"title"}> Registro en Zafari Dental </Box>
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
              <MyPassField
                label={"Confirmar contraseña"}
                name={"password2"}
                control={control}
              />
            </Box>

            <Box className={"itemBox"}>
              <MyButton type={"submit"} label={"Registrar"} />
            </Box>

            <Box className={"itemBox"}>
              <Link to="/"> ¿Ya tienes una cuenta? Inicia sesión 😊</Link>
            </Box>
          </Box>
        </form>
      </div>
    </div>
  );
};

export default Register;
