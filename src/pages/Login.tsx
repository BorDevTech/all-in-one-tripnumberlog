import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./../assets/Firebase/firebase.config";
import { useNavigate } from "react-router-dom";
interface Props {
  setIsAuth: (value: boolean) => void;
  isAuth: boolean;
}

export default function Login({ setIsAuth, isAuth }: Props) {
  let navigate = useNavigate();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", "true");
      setIsAuth(true);
      navigate("/");
      console.log(result);
    });
  };
  return (
    <>
      <div>{isAuth}</div>
      <div> Sign-In to continue</div>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
    </>
  );
}
