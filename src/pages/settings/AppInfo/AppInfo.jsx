import logoImage from "../../../assets/image/KABS 3D Logo.png";
import { Breadcrumbs, Button, Typography } from "@material-tailwind/react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const AppInfo = () => {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <div className="bg-blue-100 w-full min-h-screen overflow-hidden">
        <Breadcrumbs fullWidth className="bg-white">
          <a onClick={() => navigate("/")} className="opacity-60 text-xs lg:text-sm cursor-pointer">
            <AiFillHome />
          </a>
          <a onClick={() => navigate("/settings")} className="opacity-60 text-xs lg:text-sm cursor-pointer">
            Settings
          </a>
          <a className="text-xs lg:text-sm">App Info</a>
        </Breadcrumbs>

        <div className="flex flex-col items-center justify-center py-12 px-4 gap-6">
          {/* Logo Card */}
          <div className="bg-white rounded-2xl shadow-md p-4 w-32 md:w-40 lg:w-48 flex items-center justify-center">
            <img
              src={logoImage}
              alt="AutoFinance Logo"
              className="w-full h-auto object-contain"
              onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}
            />
          </div>

          {/* App Name */}
          <div className="text-center">
            <h1
              className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight"
              style={{
                background: "linear-gradient(135deg, #1e3a8a, #0ea5e9, #7c3aed)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AutoFinance
            </h1>
            <Typography className="text-gray-500 text-sm md:text-base mt-1 font-medium tracking-widest uppercase">
              Smart Finance Management
            </Typography>
          </div>

          {/* Version & Copyright Card */}
          <div className="bg-white rounded-xl shadow-sm px-8 py-5 text-center w-full max-w-sm">
            <Typography className="text-gray-700 font-semibold text-base md:text-lg">
              Version <span className="text-blue-700">1.2.1</span>
            </Typography>
            <Typography className="text-gray-400 text-xs md:text-sm mt-1">
              © 2026 AutoFinance. All rights reserved.
            </Typography>
          </div>

          {/* Contact Us */}
          <div className="text-center">
            <Typography className="text-sm md:text-base text-gray-600 font-medium">
              Need assistance?{" "}
              <span
                className="text-blue-600 underline cursor-pointer hover:text-blue-800 transition-colors"
                onClick={() => navigate("/settings/appinfo/contactus")}
              >
                Contact Us
              </span>
            </Typography>
            <Button
              color="blue"
              size="sm"
              onClick={() => navigate("/settings/appinfo/contactus")}
              className="mt-3 px-6"
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

