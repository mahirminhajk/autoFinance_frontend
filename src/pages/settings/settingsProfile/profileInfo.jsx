import { useContext, useEffect, useState } from "react";
import { Breadcrumbs, Button } from "@material-tailwind/react";
import { AiFillEdit, AiFillHome } from "react-icons/ai";
import { RiShieldUserFill, RiUser3Fill } from "react-icons/ri";
import { MdAlternateEmail, MdPhone } from "react-icons/md";
import Sidebar from "../../../components/sidebar/Sidebar";
import { useNavigate } from "react-router";
import { AuthContext } from "../../../context/AuthContext";
import LoadingControler from "../../../components/controlComps/LoadingControler";
import ErrControler from "../../../components/controlComps/ErrControler";
import axiosapi from "../../../helpers/axiosapi";

const roleMap = {
  3: { label: "Super Admin", bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200" },
  2: { label: "Admin",       bg: "bg-blue-50",   text: "text-blue-700",   border: "border-blue-200" },
  1: { label: "Staff",       bg: "bg-gray-100",  text: "text-gray-600",   border: "border-gray-200" },
};

const Field = ({ icon, label, value }) => (
  <div className="flex flex-col gap-1">
    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider flex items-center gap-1">
      {icon}
      {label}
    </span>
    <span className="text-gray-800 font-medium text-sm lg:text-base bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5">
      {value || "—"}
    </span>
  </div>
);

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

  if (loading) return <LoadingControler />;
  if (error) return <ErrControler err={error} />;

  const role = roleMap[userData.level] || roleMap[1];
  const initials = (userData.name || userData.username || "?")
    .split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-100 w-full">
        <Breadcrumbs fullWidth className="bg-white border-b border-gray-200">
          <a onClick={() => navigate("/")} className="opacity-60 text-xs lg:text-sm cursor-pointer"><AiFillHome /></a>
          <a onClick={() => navigate("/settings")} className="opacity-60 text-xs lg:text-sm cursor-pointer">Settings</a>
          <a className="text-xs lg:text-sm">Profile</a>
        </Breadcrumbs>

        <div className="px-4 sm:px-6 lg:px-10 py-8 w-full">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden w-full">

            {/* Top header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-gray-100">
              <div className="flex items-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                  <span className="text-white text-xl lg:text-2xl font-extrabold">{initials}</span>
                </div>
                <div>
                  <h2 className="text-lg lg:text-xl font-bold text-gray-900">
                    {userData.name || userData.username || "—"}
                  </h2>
                  <span className={`inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full border mt-1 ${role.bg} ${role.text} ${role.border}`}>
                    {role.label}
                  </span>
                </div>
              </div>

              <Button
                size="sm"
                onClick={() => navigate("/settings/profile/edit")}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl normal-case text-sm font-semibold px-4 py-2"
              >
                <AiFillEdit className="text-base" />
                Edit Profile
              </Button>
            </div>

            {/* Fields grid */}
            <div className="px-6 py-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Field
                icon={<RiUser3Fill className="text-gray-400" />}
                label={userData.name ? "Full Name" : "Full Name (not set)"}
                value={userData.name || userData.username}
              />
              <Field
                icon={<MdAlternateEmail className="text-gray-400" />}
                label="Username"
                value={userData.username}
              />
              <Field
                icon={<MdAlternateEmail className="text-gray-400" />}
                label="Email Address"
                value={userData.email}
              />
              <Field
                icon={<MdPhone className="text-gray-400" />}
                label="Phone Number"
                value={userData.phone}
              />
              <Field
                icon={<RiShieldUserFill className="text-gray-400" />}
                label="Role / Access Level"
                value={role.label}
              />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default ProfileInfo;