import { useContext, useEffect, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import {
  RiUser3Fill,
  RiUserFollowFill,
  RiUserSearchFill,
} from "react-icons/ri";
import { BsBank2, BsFillPersonCheckFill } from "react-icons/bs";
import { MdPendingActions, MdAlternateEmail } from "react-icons/md";

//*comp
import Sidebar from "../../components/sidebar/Sidebar";
import { Breadcrumbs } from "@material-tailwind/react";
import axiosapi from "../../helpers/axiosapi";
import LoadingControler from "../../components/controlComps/LoadingControler";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// Stat card component
const StatCard = ({ label, value, icon, gradient, onClick, wide }) => (
  <div
    onClick={onClick}
    className={`relative overflow-hidden rounded-2xl cursor-pointer group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl shadow-lg`}
    style={{ background: gradient }}
  >
    {/* Background glow circles */}
    <div className="absolute -right-6 -top-6 w-28 h-28 rounded-full bg-white opacity-10 group-hover:opacity-20 transition-opacity" />
    <div className="absolute -right-2 -bottom-6 w-20 h-20 rounded-full bg-white opacity-5" />

    <div className={`p-5 flex ${wide ? "flex-row items-center justify-between" : "flex-col gap-3"}`}>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-white bg-opacity-20 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        {wide && (
          <span className="text-white font-semibold text-sm uppercase tracking-wide">
            {label}
          </span>
        )}
      </div>
      <div className={wide ? "text-right" : ""}>
        <p className="text-white text-3xl lg:text-4xl font-extrabold leading-none">
          {value ?? "-"}
          <span className="text-white/60 text-xl ml-1">+</span>
        </p>
        {!wide && (
          <p className="text-white/80 text-xs uppercase tracking-wider font-semibold mt-1">
            {label}
          </p>
        )}
      </div>
    </div>
  </div>
);

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const [liveTime, setLiveTime] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axiosapi.get("/das");
      setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Live clock — ticks every second
  useEffect(() => {
    const timer = setInterval(() => setLiveTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    let h = date.getHours();
    const m = String(date.getMinutes()).padStart(2, "0");
    const s = String(date.getSeconds()).padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${String(h).padStart(2, "0")}:${m}:${s} ${ampm}`;
  };

  const formatDate = (date) => {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return { date: `${dd}/${mm}/${yyyy}`, day: days[date.getDay()] };
  };

  const { date: todayDate, day: todayDay } = formatDate(liveTime);

  if (loading) return <LoadingControler />;

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good Morning";
    if (h < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <Sidebar>
      <div className="min-h-screen bg-gray-50 w-full">
        <Breadcrumbs fullWidth className="bg-white shadow-sm">
          <a href="/" className="text-xs lg:text-sm opacity-60">
            <AiFillHome />
          </a>
          <a className="text-xs lg:text-sm">Dashboard</a>
        </Breadcrumbs>

        <div className="px-4 sm:px-6 lg:px-8 py-6 w-full">
          {/* Greeting Banner */}
          <div
            className="rounded-2xl p-6 mb-8 text-white shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
            style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #0ea5e9 60%, #7c3aed 100%)" }}
          >
            {/* Left — Greeting */}
            <div>
              <p className="text-white/70 text-sm font-medium uppercase tracking-widest mb-1">
                {greeting()}
              </p>
              <h1 className="text-2xl lg:text-3xl font-extrabold uppercase">
                {user?.name || user?.username || data?.username || "—"}
              </h1>
              <p className="text-white/60 text-sm mt-1">
                Here&apos;s your business overview.
              </p>
            </div>

            {/* Right — Live clock */}
            <div className="flex flex-col items-start sm:items-end gap-0.5">
              <p className="text-white text-2xl lg:text-3xl font-extrabold tracking-widest tabular-nums">
                {formatTime(liveTime)}
              </p>
              <p className="text-white/70 text-sm font-semibold">
                {todayDate}
              </p>
              <p className="text-white/50 text-xs uppercase tracking-widest">
                {todayDay}
              </p>
            </div>
          </div>

         
          {/* Customers Section */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-4">
              <RiUser3Fill className="text-blue-600 text-xl" />
              <h2 className="text-gray-700 font-bold text-base lg:text-lg uppercase tracking-wide">
                Customers Overview
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <StatCard
                label="Total Customers"
                value={data?.totalCustomers}
                icon={<RiUser3Fill className="text-white text-2xl" />}
                gradient="linear-gradient(135deg, #003f5c, #1a6fa8)"
                onClick={() => navigate("/customer")}
              />
              <StatCard
                label="Pending"
                value={data?.totalPendingCustomers}
                icon={<MdPendingActions className="text-white text-2xl" />}
                gradient="linear-gradient(135deg, #c0392b, #e83d17)"
                onClick={() => navigate("/customer")}
              />
              <StatCard
                label="Confirmed"
                value={data?.totalConformCustomers}
                icon={<BsFillPersonCheckFill className="text-white text-2xl" />}
                gradient="linear-gradient(135deg, #1a7a16, #1cd70f)"
                onClick={() => navigate("/customer")}
              />
            </div>
          </div>

          {/* Dealers & Banks Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <RiUserFollowFill className="text-teal-600 text-xl" />
              <h2 className="text-gray-700 font-bold text-base lg:text-lg uppercase tracking-wide">
                Dealers & Banks
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <StatCard
                label="Total Dealers & Brokers"
                value={data?.totalDealers}
                wide
                icon={<RiUserSearchFill className="text-white text-2xl" />}
                gradient="linear-gradient(135deg, #1a5c47, #36b38d)"
                onClick={() => navigate("/dealer")}
              />
              <StatCard
                label="Total Banks"
                value={data?.totalBanks}
                wide
                icon={<BsBank2 className="text-white text-2xl" />}
                gradient="linear-gradient(135deg, #7a6020, #b39136)"
                onClick={() => navigate("/bank")}
              />
            </div>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default Dashboard;