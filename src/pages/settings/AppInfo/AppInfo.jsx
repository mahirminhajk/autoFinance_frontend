import logoImage from "../../../assets/image/logo.png";
import { Breadcrumbs, Button, Typography } from "@material-tailwind/react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AppInfo = () => {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <div className="bg-blue-100 w-full overflow-hidden">
        <Breadcrumbs fullWidth className="bg-white">
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
          <a className="text-xs lg:text-sm">AppInfo</a>
        </Breadcrumbs>
        <div className="grid grid-rows-2 justify-center">
          <div className="p-6 lg:p-16 text-center grid justify-center">
            <Typography className="font-bold text-lg md:text-xl lg:text-3xl text-gray-900 mb-2">
              AutoFinance
            </Typography>
            <Typography className="font-medium text-sm md:text-lg lg:text-xl text-gray-700 mb-2">
              Version 1.2.1
            </Typography>

            <div className="bg-white mx-10 rounded-md overflow-hidden">
              <img
                onClick={() => navigate("/")}
                src={logoImage}
                alt="Lead Up"
                className="p-2 w-20 md:w-40 lg:w-48 xl:w-52"
              />
            </div>

            <Typography className="font-normal text-sm md:text-base lg:text-lg my-2">
              2023 - 24 <span className="text-blue-900 font-bold">AutoFinance</span>
            </Typography>
          </div>
          <div className="text-center">
            <Typography
              variant="body1"
              className="text-sm md:text-base lg:text-lg font-medium"
            >
              Need assistance? Visit{" "}
              <span
                className="text-blue-600 underline cursor-pointer"
                onClick={() => navigate("/settings/appinfo/contactus")}
              >
                Contact Us
              </span>
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/settings/appinfo/contactus")}
              className="mt-2"
            >
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </Sidebar>
  );
};

export default AppInfo;
