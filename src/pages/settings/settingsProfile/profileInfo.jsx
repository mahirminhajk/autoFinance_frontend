import { useContext, useEffect, useState } from "react";
import { Typography, Button, Breadcrumbs } from "@material-tailwind/react";
import { AiFillEdit, AiFillHome } from "react-icons/ai";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import LoadingControler from "../../../components/controlComps/LoadingControler";
import ErrControler from "../../../components/controlComps/ErrControler";
import axiosapi from "../../../helpers/axiosapi";

function ProfileInfo() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { user, dispatch } = useContext(AuthContext);

  useEffect(() => {
    if (user === null) {
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    }

    const getUserData = async () => {
      try {
        setLoading(true);
        const res = await axiosapi.get(`/user/${user._id}`);
        setUserData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  if (loading) {
    return <LoadingControler />;
  }

  if (error) {
    return <ErrControler err={error} />;
  }

  return (
    <Sidebar>
      <div className="m-auto">
        <Breadcrumbs fullWidth>
          <a
            onClick={() => navigate("/")}
            className="opacity-60 text-xs lg:text-sm"
          >
            <AiFillHome />
          </a>
          <a
            onClick={() => navigate("/settings")}
            className="opacity-60 text-xs lg:text-sm"
          >
            Settings
          </a>
          <a className="text-xs lg:text-sm">Admin Profile</a>
        </Breadcrumbs>

        <div className="w-auto h-auto lg:mx-20 lg:my-10 flex flex-col justify-center p-4 shadow-lg rounded-lg">
          <div className="grid grid-cols ">
            <div className="justify-self-end">
              <Button
                onClick={() => navigate("/settings/profile/edit")}
                className="flex p-2.5 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white"
              >
                <AiFillEdit className="text-xl lg:text-2xl" />
              </Button>
            </div>
          </div>

          {/* admin details */}

          <div className="mt-5 lg:mt-10">
            <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md tex-black-700 mt-4 text-xs md:text-sm lg:text-base">
              Name: <span className="font-bold">{userData.name || "--"}</span>
            </Typography>
            <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md tex-black-700 mt-4 text-xs md:text-sm lg:text-base">
              Username:{" "}
              <span className="font-bold">{userData.username || ""}</span>
            </Typography>
            <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md tex-black-700 mt-4 text-xs md:text-sm lg:text-base">
              Email: <span className="font-bold">{userData.email || "--"}</span>
            </Typography>
            <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md tex-black-700 mt-4 text-xs md:text-sm lg:text-base">
              Phone No.:{" "}
              <span className="font-bold">{userData.phone || "--"}</span>
            </Typography>
            <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md tex-black-700 mt-4 text-xs md:text-sm lg:text-base">
              Type:{" "}
              <span className="font-bold">
                {userData.level === 3
                  ? "Super-Admin"
                  : userData.level === 2
                  ? "Admin"
                  : "Staff"}
              </span>
            </Typography>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default ProfileInfo;
