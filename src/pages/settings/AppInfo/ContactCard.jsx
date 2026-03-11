import { Typography, Card } from "@material-tailwind/react";
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa"; // Import icons

// Reusable ContactCard Component
const ContactCard = ({ name, phoneNumber, email, whatsappNumber }) => {
  // Function for WhatsApp redirection
  const handleWhatsAppRedirect = (number) => {
    window.open(`https://wa.me/${number}`, "_blank");
  };

  return (
    <Card className="p-6 shadow-lg bg-white rounded-lg">
      <Typography className="font-bold text-base lg:text-xl mb-4">
        {name}
      </Typography>
      <div className="flex items-center mb-4">
        <FaPhoneAlt className="text-blue-500 mr-3" />
        <a href={`tel:+91-${phoneNumber}`} className="text-gray-700">
          +91 {phoneNumber}
        </a>
        <FaWhatsapp
          className="text-green-500 cursor-pointer ml-4"
          size={24}
          onClick={() => handleWhatsAppRedirect(whatsappNumber)}
        />
      </div>
      <div className="flex items-center">
        <FaEnvelope className="text-red-500 mr-3" />
        <a href={`mailto:${email}`} className="text-gray-700">
          {email}
        </a>
      </div>
    </Card>
  );
};

export default ContactCard;
