import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => {
    return store.user;
  });
  const handleSignOutUser = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
      })
      .catch((error) => {
        //   navigate("/error")
      });
  };

  return (
    <div
      className="absolute w-full px-7 py-3 text-white
    bg-gradient-to-b from-black z-10 
    flex justify-between"
    >
      <img
        className="h-12 w-auto "
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />

      {user && (
        <div className="flex p-2">
          <img src="" className="w-12 h-12 p-1" alt="user icon" />
          <button onClick={handleSignOutUser}>Signout</button>
        </div>
      )}
    </div>
  );
};

export default Header;
