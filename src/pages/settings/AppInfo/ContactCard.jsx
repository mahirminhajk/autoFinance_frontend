import { FaWhatsapp, FaPhoneAlt, FaEnvelope, FaBuilding } from "react-icons/fa";
import PropTypes from "prop-types";

const ContactCard = ({ name, phoneNumber, email, whatsappNumber }) => {
  const handleWhatsAppRedirect = (number) => {
    window.open(`https://wa.me/${number}`, "_blank");
  };

  // Get initials for avatar
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-md mx-auto">
      {/* Header Banner */}
      <div
        className="h-24 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #1e3a8a, #0ea5e9, #7c3aed)" }}
      >
        <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
          <span className="text-2xl font-extrabold text-blue-700">{initials}</span>
        </div>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        {/* Name */}
        <div className="flex items-center gap-2 mb-5">
          <FaBuilding className="text-indigo-500 text-lg flex-shrink-0" />
          <span className="font-bold text-lg text-gray-800">{name}</span>
        </div>

        {/* Phone */}
        <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-blue-500 text-base flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Phone</p>
              <span className="text-gray-800 font-semibold text-sm">
                +91 {phoneNumber}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:+91${phoneNumber.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors no-underline"
            >
              <FaPhoneAlt size={12} />
              Call
            </a>
            <button
              onClick={() => handleWhatsAppRedirect(whatsappNumber)}
              className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              <FaWhatsapp size={14} />
              WhatsApp
            </button>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-red-400 text-base flex-shrink-0" />
            <div>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">Email</p>
              <span className="text-gray-800 font-semibold text-sm break-all">{email}</span>
            </div>
          </div>
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors no-underline flex-shrink-0 ml-2"
          >
            <FaEnvelope size={12} />
            Mail
          </a>
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  name: PropTypes.string.isRequired,
  phoneNumber: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  whatsappNumber: PropTypes.string.isRequired,
};

export default ContactCard;

