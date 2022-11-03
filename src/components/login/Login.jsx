import { Button } from "@mui/material";
import "./login.css";
import { signInWithPopup } from "firebase/auth";
import { Auth, Provider } from "../../firebase";
import { useUserContext } from "../../contexts/UserContextProvider";
const Login = () => {
  const { setUserHandler } = useUserContext();
  const signIn = () => {
    signInWithPopup(Auth, Provider)
      .then((result) => {
        const user = result.user;
        // console.log(result);
        // console.log(user);
        setUserHandler(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/120px-WhatsApp.svg.png"
          alt=""
        />
        <div className="login__text">
          <h1>Sign in to Whatsapp </h1>
        </div>
        <Button onClick={signIn}>Sign in With Google</Button>
      </div>
    </div>
  );
};

export default Login;
