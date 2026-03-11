import { useContext, useEffect } from "react";
import { useNavigate } from "react-router";

//* auth
import { AuthContext } from "../../context/AuthContext";
import axiosapi from "../../helpers/axiosapi";

function Logout() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);

  useEffect(() => {
    handleLogout();
  }, []);

  const handleLogout = async () => {
    await axiosapi
      .get("/auth/logout")
      .then((res) => {
        dispatch({ type: "LOGOUT" });
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        dispatch({ type: "LOGOUT" });
        navigate("/login", { replace: true });
      });
  };

  return (
    <div className="h-full w-full flex justify-center items-center">
      <h1 className="text-red-600 uppercase text-xl">Logging Out</h1>
    </div>
  );
}

export default Logout;
