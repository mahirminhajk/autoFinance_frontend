import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

//*icons
import {
  RiDashboardFill,
  RiUser3Fill,
  RiUserFollowFill,
  RiUserSettingsFill,
  RiWhatsappFill,
} from "react-icons/ri";
import { MdLocalLibrary, MdAccountBalanceWallet, MdMenu, MdClose } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";

//*file import
import logoImage from "../../assets/image/AutoFinance Logo.png";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: (
      <RiDashboardFill className="text-2xl md:text-lg lg:text-2xl" />
    ),
    link: "/",
    checkName: "",
  },
  {
    name: "Customer",
    icon: (
      <RiUser3Fill className="text-2xl md:text-lg lg:text-2xl" />
    ),
    link: "/customer",
    checkName: "customer",
  },
  {
    name: "Dealer",
    icon: (
      <RiUserFollowFill className="text-2xl md:text-lg lg:text-2xl" />
    ),
    link: "/dealer",
    checkName: "dealer",
  },
  {
    name: "Call records",
    icon: (
      <MdLocalLibrary className="text-2xl md:text-lg lg:text-2xl" />
    ),
    link: "/call",
    checkName: "call",
  },
  // {
  //   name: "Cars",
  //   icon: (
  //     <BsFillCarFrontFill className="text-2xl md:text-lg lg:text-2xl" />
  //   ),
  //   link: "/cars",
  //   checkName: "cars",
  // },
  {
    name: "Bank",
    icon: (
      <BsBank2 className="text-2xl md:text-lg lg:text-2xl" />
    ),
    link: "/bank",
    checkName: "bank",
  },
  {
    name: "Account",
    icon: (
      <MdAccountBalanceWallet className="text-2xl md:text-lg lg:text-2xl" />
    ),
    link: "/account",
    checkName: "account",
  },
  {
    name: "Groups",
    icon: (
      <RiWhatsappFill className="text-2xl md:text-lg lg:text-2xl" />
    ),
    link: "/groups",
    checkName: "groups",
  },
  {
    name: "Settings",
    icon: (
      <RiUserSettingsFill className="text-2xl md:text-lg lg:text-2xl" />
    ),
    link: "/settings",
    checkName: "settings",
  },
];

function Sidebar({ children }) {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check window width to manage mobile state
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind 'md' breakpoint
      if (window.innerWidth >= 768) {
        setIsOpen(true); // Always open on md+ screens (handled by CSS via width)
      } else {
        setIsOpen(false); // Default closed on mobile
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [location, isMobile]);

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Mobile Overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`fixed md:sticky top-0 left-0 h-screen z-50 flex flex-col bg-indigo-900 text-white shadow-xl transition-all duration-300 ease-in-out
          ${isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full lg:w-64 lg:translate-x-0 md:w-20 md:translate-x-0"}
        `}
      >
        {/* Mobile Close Button */}
        {isMobile && (
          <div className="absolute top-4 right-4">
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <MdClose size={24} />
            </button>
          </div>
        )}

        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center px-4 border-b border-indigo-800">
          <Link to="/" className="w-full flex justify-center">
            {/* Constant, fixed rounded box without any animation */}
            <div className="flex items-center justify-center bg-white rounded-xl w-11 h-11 lg:w-44 lg:h-12 overflow-hidden px-0 lg:px-3 gap-0 lg:gap-2">
              <img
                src={logoImage}
                alt="Auto Finance"
                className="flex-shrink-0 object-contain h-7 lg:h-8"
              />
              {/* Only show text on large screens where sidebar is always expanded, no animation */}
              <span className="text-indigo-900 font-extrabold tracking-wide hidden lg:block text-base whitespace-nowrap">
                Auto Finance
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar flex flex-col gap-1.5">
          {sidebarItems.map((item, i) => {
            const isActive = path === item.checkName;
            return (
              <Link
                to={item.link}
                key={i}
                className={`flex items-center rounded-xl p-3 transition-all duration-200 group
                  ${isActive 
                    ? "bg-white text-indigo-900 shadow-md font-bold" 
                    : "text-white/80 hover:bg-white/10 hover:text-white font-medium"
                  }
                `}
                title={item.name} // Tooltip for collapsed mode
              >
                <div className={`flex-shrink-0 transition-transform group-hover:scale-110 ${isActive ? "text-indigo-900" : "text-white"}`}>
                  {item.icon}
                </div>
                {/* Text: hidden on md, shown on lg or when specifically open (mobile) */}
                <span className={`ml-4 whitespace-nowrap md:hidden lg:block ${isOpen ? "block" : "hidden"}`}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>

        {/* Bottom spacer or version info could go here */}
        <div className="p-4 border-t border-indigo-800 hidden lg:block">
          <p className="text-white/40 text-xs text-center font-medium">Auto Finance v1.0</p>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Mobile Top Bar (Only visible when < md) */}
        {!isOpen && (
          <div className="md:hidden flex items-center px-4 h-16 bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 -ml-2 text-gray-600 hover:text-indigo-900 hover:bg-indigo-50 rounded-lg transition-colors"
            >
              <MdMenu size={28} />
            </button>
            <div className="flex-1 flex justify-center mr-8">
              <Link to="/" className="flex items-center gap-2">
                <img src={logoImage} alt="Logo" className="h-7 object-contain" />
                <span className="text-indigo-900 font-extrabold text-lg tracking-wide">Auto Finance</span>
              </Link>
            </div>
          </div>
        )}

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-0 m-0">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;