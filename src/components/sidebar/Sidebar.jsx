import { useLocation, Link } from "react-router-dom";

//*icons
import {
  RiDashboardFill,
  RiUser3Fill,
  RiUserFollowFill,
  RiUserSettingsFill,
  RiWhatsappFill,
} from "react-icons/ri";
import { MdLocalLibrary, MdAccountBalanceWallet } from "react-icons/md";
import { BsFillCarFrontFill, BsBank2 } from "react-icons/bs";

//*file import
import logoImage from "../../assets/image/logo.png";

const sidebarItems = [
  {
    name: "Dashboard",
    icon: (
      <RiDashboardFill className="text-2xl  md:text-lg lg:text-2xl ml-3 text-white" />
    ),
    link: "/",
    checkName: "",
  },
  {
    name: "Customer",
    icon: (
      <RiUser3Fill className="text-2xl  md:text-lg lg:text-2xl ml-3 text-white" />
    ),
    link: "/customer",
    checkName: "customer",
  },
  {
    name: "Dealer",
    icon: (
      <RiUserFollowFill className="text-2xl  md:text-lg lg:text-2xl ml-3 text-white" />
    ),
    link: "/dealer",
    checkName: "dealer",
  },
  {
    name: "Call records",
    icon: (
      <MdLocalLibrary className="text-2xl  md:text-lg lg:text-2xl ml-3 text-white" />
    ),
    link: "/call",
    checkName: "call",
  },
  // {
  //   name: "Cars",
  //   icon: (
  //     <BsFillCarFrontFill className="text-2xl  md:text-lg lg:text-2xl ml-3 text-white" />
  //   ),
  //   link: "/cars",
  //   checkName: "cars",
  // },
  {
    name: "Bank",
    icon: (
      <BsBank2 className="text-2xl  md:text-lg lg:text-2xl ml-3 text-white" />
    ),
    link: "/bank",
    checkName: "bank",
  },
  {
    name: "Account",
    icon: (
      <MdAccountBalanceWallet className="text-2xl  md:text-lg lg:text-2xl ml-3 text-white" />
    ),
    link: "/account",
    checkName: "account",
  },
  {
    name: "Groups",
    icon: (
      <RiWhatsappFill className="text-2xl  md:text-lg lg:text-2xl ml-3 text-white" />
    ),
    link: "/groups",
    checkName: "groups",
  },
  {
    name: "Settings",
    icon: (
      <RiUserSettingsFill className="text-2xl  md:text-lg lg:text-2xl ml-3 text-white" />
    ),
    link: "/settings",
    checkName: "settings",
  },
];

function Sidebar({ children }) {
  //* sidebar working system
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <section>
      <div>
        <div className="_main-container flex flex-row">
          <div className="_sidebar self-start sticky top-0 bg-slate-50 border-r-[.1px] border-gray-300 bg-light-blue-700  w-[60px] sm:w-28 md:w-44 lg:w-48 xl:w-52">
            <div className="pt-8 ml-2 md:pl-3 lg:pl-4 h-screen overflow-y-auto">
              <div className="_logo-container lg:pl-2 md:ml-3  pb-10 md:w-28 lg:w-32">
                <Link to="/">
                  <div className="bg-white p-2 rounded-full md:rounded-md lg:rounded-lg xl:rounded-xl">
                    <img
                      src={logoImage}
                      alt="Lead Up"
                      className="w-8 md:w-40 lg:w-48 xl:w-52"
                    />
                  </div>
                </Link>
              </div>
              <div className="_btn-cotainer ">
                {sidebarItems.map((item, i) => (
                  <Link
                    to={item.link}
                    key={i}
                    className={
                      path === item.checkName
                        ? "flex flex-row items-center h-10 rounded max-w-[150px] min-w-[140px] bg-indigo-900  font-bold lg:font-bold  mb-3 text-white"
                        : "flex flex-row items-center h-10 mb-3 rounded max-w-[150px] min-w-[140px] ml-4 text-white font-normal hover:bg-indigo-500"
                    }
                  >
                    {item.icon}
                    <span className=" text-xs md:text-sm lg:text-sm lg:font-medium ml-1 md:ml-3 lg:pl-2">
                      {item.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="_content flex-1">
            <div className="h-screen overflow-y-auto">
              {/* Children content */}
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sidebar;
