import Browse from "./Browse";
import Header from "./Header";
import Login from "./Login";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import BodyHeader from "./BodyHeader";

const Body = () => {
  // making constants with imported methods
  const dispatch = useDispatch();
  //
  const [userState, setUserState] = useState(false);

  // setting up the router urls
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/browse",
      element:
        // <PrivateRoute>
        userState ? <Browse /> : <Navigate to="/" />,
      // </PrivateRoute>
    },
  ]);
  // api calls and other side effects
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        user ? setUserState(true) : setUserState(false);
      } else {
        dispatch(removeUser());
      }
    });
  }, []);
  return (
    <div>
      <BodyHeader />
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
