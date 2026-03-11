import { Link, useLocation } from "react-router-dom";

const Tabbar = ({ cusid }) => {
  const location = useLocation();
  const tabItems = [
    { name: "General", link: "general", checkName: "general" },
    { name: "Verification", link: "verification", checkName: "verification" },
    { name: "Upload Documents", link: "doc", checkName: "doc" },
    { name: "Ready Login", link: "ready", checkName: "ready" },
    { name: "Bank", link: "bank", checkName: "bank" },
    { name: "Login", link: "login", checkName: "login" },
    { name: "FTR", link: "ftr", checkName: "ftr" },
    { name: "Loan Approved", link: "loan", checkName: "loan" },
    { name: "Loan Desp", link: "desp", checkName: "desp" },
    { name: "RTO Work", link: "rto", checkName: "rto" },
    { name: "Completed", link: "completed", checkName: "completed" },
  ];

  const activeTab = tabItems.findIndex(
    (item) => item.checkName === location.pathname.split("/").slice(-1)[0]
  );

  return (
    <div className="h-auto md:h-12 lg:h-14 flex items-center justify-between md:px-2 lg:px-3 space-x-4 bg-deep-purple-700">
      {tabItems.map((item, index) => {
        const reallink = `/customer/${cusid}/${item.link}`;
        return (
          <Link key={index} to={reallink}>
            <button
              className={`lg:text-base md:text-sm text-xs ${
                activeTab === index
                  ? " bg-deep-purple-200 text-black rounded-lg px-2 md:px-3 lg:px-4 py-1 lg:py-[2px]"
                  : "text-white hover:bg-deep-purple-300 rounded-lg px-1 md:px-3 lg:px-4"
              }`}
            >
              <span className="text-xs md:text-sm lg:text-base">
                {item.name}
              </span>
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default Tabbar;
