import { useNavigate } from "react-router-dom";
import db, { auth, provider } from "../firebase/firebase";

function useSignin(setUser) {
  const navigate = useNavigate();

  const signin = () => {
    auth.signInWithPopup(provider).then((result) => {
      const newUser = {
        fullname: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };

      // Set User
      setUser(newUser);

      // Add user to local storage
      localStorage.setItem("user", JSON.stringify(newUser));

      db.collection("users").doc(newUser.email).set(newUser);

      navigate("/dashboard");
    });
  };
  return { signin };
}

export default useSignin;
