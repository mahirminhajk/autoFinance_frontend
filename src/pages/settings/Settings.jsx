import { useContext, useState } from "react";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import { HiDocumentText } from "react-icons/hi";
import { AiFillHome } from "react-icons/ai";
import { RiLogoutBoxFill } from "react-icons/ri";

//*comp
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";

function Settings() {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login", { replace: true });
  };

  return (
    <Sidebar>
      <div className="m-auto">
        <Breadcrumbs fullWidth>
          <a onClick={() => navigate("/")} className="opacity-60 text-xs lg:text-sm cursor-pointer">
            <AiFillHome />
          </a>
          <a className="text-xs lg:text-sm">Settings</a>
        </Breadcrumbs>

        <div className="flex flex-col gap-6 mt-10 lg:mt-16">
          {/* Admin Profile */}
          <div
            className="bg-gray-100 h-8 md:h-10 lg:h-12 mx-5 lg:mx-10 rounded-md drop-shadow-md cursor-pointer btn relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-blue-200 group"
            onClick={() => navigate(`/settings/profile`)}
          >
            <div className="flex flex-1 gap-2">
              <CgProfile className="m-3 text-xl lg:text-2xl ml-3 text-accent" />
              <Typography className="m-3 font-bold lg:text-base md:text-sm text-xs">Profile</Typography>
            </div>
          </div>

          {/* Staffs (Super Admin only) */}
          {user?.level === 3 && (
            <div
              className="bg-gray-100 h-8 md:h-10 lg:h-12 mx-5 lg:mx-10 rounded-md drop-shadow-md cursor-pointer btn relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-blue-200 group"
              onClick={() => navigate(`/settings/staffs`)}
            >
              <div className="flex flex-1 gap-2">
                <BsFillPeopleFill className="m-3 text-xl lg:text-2xl ml-3 text-accent" />
                <Typography className="m-3 font-bold lg:text-base md:text-sm text-xs">Staffs</Typography>
              </div>
            </div>
          )}

          {/* Change Password */}
          <div
            className="bg-gray-100 h-8 md:h-10 lg:h-12 mx-5 lg:mx-10 rounded-md drop-shadow-md cursor-pointer btn relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-blue-200 group"
            onClick={() => navigate(`/settings/profile/edit`)}
          >
            <div className="flex flex-1 gap-2">
              <MdPassword className="m-3 text-xl lg:text-2xl ml-3 text-accent" />
              <Typography className="m-3 font-bold lg:text-base md:text-sm text-xs">Change Password</Typography>
            </div>
          </div>

          {/* App Info */}
          <div
            className="bg-gray-100 h-8 md:h-10 lg:h-12 mx-5 lg:mx-10 rounded-md drop-shadow-md cursor-pointer btn relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-blue-200 group"
            onClick={() => navigate(`/settings/appinfo`)}
          >
            <div className="flex flex-1 gap-2">
              <HiDocumentText className="m-3 text-xl lg:text-2xl ml-3 text-accent" />
              <Typography className="m-3 font-bold lg:text-base md:text-sm text-xs">App Info</Typography>
            </div>
          </div>

          {/* Logout */}
          <div
            className="bg-red-50 h-8 md:h-10 lg:h-12 mx-5 lg:mx-10 rounded-md drop-shadow-md cursor-pointer btn relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-red-100 group"
            onClick={() => setShowLogoutModal(true)}
          >
            <div className="flex flex-1 gap-2">
              <CgLogOut className="m-3 text-xl lg:text-2xl ml-3 text-red-500" />
              <Typography className="m-3 font-bold lg:text-base md:text-sm text-xs text-red-600">Logout</Typography>
            </div>
          </div>
        </div>
      </div>

      {/* ── Logout Confirmation Modal ── */}
      {showLogoutModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowLogoutModal(false)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-[min(90vw,380px)] p-6 flex flex-col items-center text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Icon */}
            <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
              <RiLogoutBoxFill className="text-red-500 text-2xl" />
            </div>

            <h3 className="text-gray-900 font-bold text-lg mb-1">Confirm Logout</h3>
            <p className="text-gray-500 text-sm mb-6">
              Are you sure you want to logout? You will need to sign in again to access your account.
            </p>

            <div className="flex gap-3 w-full">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                <CgLogOut className="text-base" />
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </Sidebar>
  );
}

export default Settings;