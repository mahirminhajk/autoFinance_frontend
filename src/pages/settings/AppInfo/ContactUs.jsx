import { Breadcrumbs, Typography } from "@material-tailwind/react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <div className="m-auto bg-blue-100 h-screen">
        {/* Breadcrumbs */}
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
          <a
            onClick={() => navigate("/settings/appInfo")}
            className="opacity-60 text-xs lg:text-sm"
          >
            AppInfo
          </a>
          <a className="text-xs lg:text-sm">Contact Us</a>
        </Breadcrumbs>

        {/* Page Title */}
        <div className="text-left ">
          <Typography className="font-bold p-6 text-lg lg:text-2xl text-gray-800">
            Developer Contact Information
          </Typography>
        </div>

        {/* Developer Contact Cards */}
        <div className="grid grid-cols-1 p-6 lg:grid-cols-2 gap-8 ">
          {/* Reusable ContactCard component instances */}
          <ContactCard
            name="Sabiq Hashil"
            phoneNumber="755 987 3623"
            whatsappNumber="917559873623"
            email="sabiqhashilkp786@gmail.com"
          />
          <ContactCard
            name="Mahir Minhaj"
            phoneNumber="808 600 9808"
            whatsappNumber="918086009808"
            email="mahirminhajk.developer@gmail.com"
          />
        </div>
      </div>
    </Sidebar>
  );
};

export default ContactUs;
