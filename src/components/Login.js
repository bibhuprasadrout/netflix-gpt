import { useState } from "react";

const Login = () => {
  const [isSignInFrom, setIsSignINForm] = useState(true);
  const toggleSignUpFrom = () => {
    setIsSignINForm(!isSignInFrom);
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
              typeof="text"
              placeholder="Full Name"
              className="px-2 py-3 my-2 w-full bg-gray-700 text-gray-100 rounded-sm"
            />
          )}
          <input
            typeof="text"
            placeholder="Email Address"
            className="px-2 py-3 my-2 w-full bg-gray-700 text-gray-100 rounded-sm"
          />
          <input
            typeof="password"
            placeholder="Password"
            className="px-2 py-3 my-2 w-full bg-gray-700 text-gray-100 rounded-sm"
          />
          {!isSignInFrom && (
            <input
              typeof="password"
              placeholder="Confirm Password"
              className="px-2 py-3 my-2 w-full bg-gray-700 text-gray-100 rounded-sm"
            />
          )}
          <button className="py-2 my-7 bg-red-700 w-full rounded-sm">
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
