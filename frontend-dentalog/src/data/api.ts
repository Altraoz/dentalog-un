import axios from "axios";
import Cookies from "js-cookie";

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  const backendUrl = import.meta.env.BACKEND_URL;
  e.preventDefault();
  const csrftoken = Cookies.get("csrftoken");

  axios
    .post(
      backendUrl,
      {
        // tus datos, por ejemplo:
        // username: 'valor'
      },
      {
        headers: {
          "X-CSRFToken": csrftoken || "",
        },
      }
    )
    .then((response) => {
      console.log(response);
      //return response;
    })
    .catch((error) => {
      console.error(error);
    });
}

export default handleSubmit;
