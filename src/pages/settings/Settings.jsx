import { useContext } from "react";
import { Breadcrumbs, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { BsFillPeopleFill } from "react-icons/bs";
import { MdPassword } from "react-icons/md";
import { CgLogOut } from "react-icons/cg";
import { HiDocumentText } from "react-icons/hi";

//*comp
import Sidebar from "../../components/sidebar/Sidebar";
import { AuthContext } from "../../context/AuthContext";
import { AiFillHome } from "react-icons/ai";

function Settings() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

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
          <a className="text-xs lg:text-sm">Settings</a>
        </Breadcrumbs>

        <div className=" flex flex-col gap-6 mt-10 lg:mt-16">
          {/* Admin Profile Start */}
          <div
            className="bg-gray-100 h-8 md:h-10 lg:h-12  mx-5 lg:mx-10 rounded-md drop-shadow-md cursor-pointer btn relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-blue-200 group"
            onClick={() => navigate(`/settings/profile`)}
          >
            <div className="flex flex-1 gap-2">
              <CgProfile className="m-3 text-xl lg:text-2xl ml-3 text-accent" />
              <Typography className="m-3 font-bold lg:text-base md:text-sm text-xs">
                Profile
              </Typography>
            </div>
          </div>
          {/* Admin Profile End */}

          {/* Staffs Start */}
          {user?.level === 3 && (
            <div
              className="bg-gray-100 h-8 md:h-10 lg:h-12  mx-5 lg:mx-10 rounded-md drop-shadow-md cursor-pointer btn relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-blue-200 group"
              onClick={() => navigate(`/settings/staffs`)}
            >
              <div className="flex flex-1 gap-2">
                <BsFillPeopleFill className="m-3 text-xl lg:text-2xl ml-3 text-accent" />
                <Typography className="m-3 font-bold lg:text-base md:text-sm text-xs">
                  Staffs
                </Typography>
              </div>
            </div>
          )}
          {/* Staffs End */}

          {/* Password Start */}
          <div
            className="bg-gray-100 h-8 md:h-10 lg:h-12  mx-5  lg:mx-10 rounded-md drop-shadow-md cursor-pointer btn relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-blue-200 group"
            onClick={() => navigate(`/settings/profile/edit`)}
          >
            <div className="flex flex-1 gap-2">
              <MdPassword className="m-3 text-xl lg:text-2xl ml-3 text-accent" />
              <Typography className="m-3 font-bold lg:text-base md:text-sm text-xs">
                Change Password
              </Typography>
            </div>
          </div>
          {/* Password End */}
          {/* About Start */}
          <div
            className="bg-gray-100 h-8 md:h-10 lg:h-12  mx-5 lg:mx-10 rounded-md drop-shadow-md cursor-pointer btn relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-blue-200 group"
            onClick={() => navigate(`/settings/appinfo`)}
          >
            <div className="flex flex-1 gap-2">
              <HiDocumentText className="m-3 text-xl lg:text-2xl ml-3 text-accent" />
              <Typography className="m-3 font-bold lg:text-base md:text-sm text-xs">
                App Info
              </Typography>
            </div>
          </div>
          {/* About End */}
          {/* Logout Start */}
          <div
            className="bg-gray-100 h-8 md:h-10 lg:h-12  mx-5 lg:mx-10 rounded-md drop-shadow-md cursor-pointer btn relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-blue-200 group"
            onClick={() => navigate(`/logout`)}
          >
            <div className="flex flex-1 gap-2">
              <CgLogOut className="m-3 text-xl lg:text-2xl ml-3 text-accent" />
              <Typography className="m-3 font-bold lg:text-base md:text-sm text-xs">
                Logout
              </Typography>
            </div>
          </div>
          {/* Logout End */}
        </div>
      </div>
    </Sidebar>
  );
}

export default Settings;
