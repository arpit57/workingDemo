import { auth } from "../firebase/firebase";

function useLogout(setUser) {
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        setUser(null);
        // Remove user from local storage
        localStorage.removeItem("user");
      })
      .catch((error) => alert(error.message));
  };
  return { logout };
}

export default useLogout;
