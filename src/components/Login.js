import { useRef, useState } from "react";
import {
  checkValidSignInFields,
  checkValidSignUpFields,
} from "../utils/validate";
import { auth } from "../utils/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice.js";

const Login = () => {
  // making constants with imported methods
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // state variables and their functions
  const [isSignInFrom, setIsSignInForm] = useState(true);
  const [isSignInErrorMessage, setIsSignInErrorMessage] = useState("");
  const [isSignUpErrorMessage, setIsSignUpErrorMessage] = useState("");
  const toggleSignUpFrom = () => {
    setIsSignInForm(!isSignInFrom);
  };
  // refs and their functions
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const confirmPassword = useRef(null);
  const handleFormSubmit = (e) => {
    e.preventDefault();

    //logic for sign in form
    if (isSignInFrom) {
      const message = checkValidSignInFields(
        email.current.value,
        password.current.value
      );
      setIsSignInErrorMessage(message);
      if (message) return;
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsSignInErrorMessage(errorMessage);
        });
    }

    // logic for sign up form
    if (!isSignInFrom) {
      const message = checkValidSignUpFields(
        name.current.value,
        email.current.value,
        password.current.value,
        confirmPassword.current.value
      );
      setIsSignUpErrorMessage(message);
      if (message) return;
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          if (user) {
            updateProfile(user, { displayName: name.current.value })
              .then(() => {
                const { uid, email, displayName } = auth.currentUser;
                dispatch(addUser({ displayName: displayName }));
              })
              .then(() => {
                signOut(auth)
                  .then(() => {
                    dispatch(removeUser());
                  })
                  .catch((error) => {});
              })
              .then(() => {
                navigate("/");
                setIsSignInForm(true);
              })
              .catch((error) => {});
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setIsSignUpErrorMessage(errorMessage);
        });
    }
  };
  return (
    <div className="relative">
      <img
        className="absolute"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/655a9668-b002-4262-8afb-cf71e45d1956/5ff265b6-3037-44b2-b071-e81750b21783/IN-en-20240715-POP_SIGNUP_TWO_WEEKS-perspective_WEB_c6d6616f-4478-4ac2-bdac-f54b444771dd_small.jpg"
        alt="background image."
      />
      <div className="flex justify-center">
        <form className="absolute p-12 my-36 mx-auto w-1/2 bg-black text-white bg-opacity-85 rounded-md">
          <h1 className="font-bold text-2xl pl-0 my-7 w-full">
            {isSignInFrom ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInFrom && (
            <input
              ref={name}
              typeof="text"
              placeholder="Full Name"
              className="px-2 py-3 my-2 w-full bg-gray-700 text-gray-100 rounded-sm"
            />
          )}
          <input
            ref={email}
            typeof="text"
            placeholder="Email Address"
            className="px-2 py-3 my-2 w-full bg-gray-700 text-gray-100 rounded-sm"
          />
          <input
            ref={password}
            typeof="password"
            placeholder="Password"
            className="px-2 py-3 my-2 w-full bg-gray-700 text-gray-100 rounded-sm"
          />
          {!isSignInFrom && (
            <input
              ref={confirmPassword}
              typeof="password"
              placeholder="Confirm Password"
              className="px-2 py-3 my-2 w-full bg-gray-700 text-gray-100 rounded-sm"
            />
          )}
          <p className="text-sm text-red-500">
            {isSignInFrom ? isSignInErrorMessage : isSignUpErrorMessage}
          </p>
          <button
            className="py-2 my-7 bg-red-700 w-full rounded-sm"
            onClick={handleFormSubmit}
          >
            {isSignInFrom ? "Sign In" : "Sign Up"}
          </button>
          <p className="text-sm">
            {isSignInFrom ? "New to netflix?" : "Already a user?"}&nbsp;
            <span
              className="cursor-pointer font-bold"
              onClick={toggleSignUpFrom}
            >
              {isSignInFrom ? "Sign Up Now!" : "Sign In"}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
