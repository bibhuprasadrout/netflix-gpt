import Header from "./Header";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Browse = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  return (
    <div>
      <div>
        <Header />
        <div style={{ height: "88px" }}></div>
        <div>{user && <h2>Hi {user?.displayName}</h2>}</div>
      </div>
    </div>
  );
};

export default Browse;
