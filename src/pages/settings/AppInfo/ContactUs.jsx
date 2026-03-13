import { Breadcrumbs, Typography } from "@material-tailwind/react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactUs = () => {
  const navigate = useNavigate();

  return (
    <Sidebar>
      <div className="bg-blue-100 w-full min-h-screen">
        {/* Breadcrumbs */}
        <Breadcrumbs fullWidth className="bg-white">
          <a onClick={() => navigate("/")} className="opacity-60 text-xs lg:text-sm cursor-pointer">
            <AiFillHome />
          </a>
          <a onClick={() => navigate("/settings")} className="opacity-60 text-xs lg:text-sm cursor-pointer">
            Settings
          </a>
          <a onClick={() => navigate("/settings/appInfo")} className="opacity-60 text-xs lg:text-sm cursor-pointer">
            App Info
          </a>
          <a className="text-xs lg:text-sm">Contact Us</a>
        </Breadcrumbs>

        {/* Page Title */}
        <div className="px-6 pt-6 pb-2">
          <Typography className="font-bold text-lg lg:text-2xl text-gray-800">
            Contact Information
          </Typography>
          <Typography className="text-gray-500 text-sm mt-1">
            Reach out to us for support or inquiries.
          </Typography>
        </div>

        {/* Contact Cards — centered */}
        <div className="flex flex-col items-center px-6 py-6 gap-6">
          <ContactCard
            name="KABS Digital"
            phoneNumber="773 694 7647"
            whatsappNumber="917736947647"
            email="info@kabsdigital.com"
          />
        </div>
      </div>
    </Sidebar>
  );
};

export default ContactUs;