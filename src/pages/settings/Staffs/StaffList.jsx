import { useContext, useEffect, useState } from "react";
import { Typography, Button, Breadcrumbs } from "@material-tailwind/react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { BsFillPersonVcardFill, BsPersonPlusFill } from "react-icons/bs";
import { AuthContext } from "../../../context/AuthContext";
import ErrControler from "../../../components/controlComps/ErrControler";
import LoadingControler from "../../../components/controlComps/LoadingControler";
import axiosapi from "../../../helpers/axiosapi";
import { AiFillHome } from "react-icons/ai";

function StaffList() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (user === null || user.level !== 3) {
      setError({ message: "You are not authorized to access this page" });
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await axiosapi.get("/user");
        setUsers(res.data);
      } catch (err) {
        setError(err);
      }
      setLoading(false);
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <LoadingControler />;
  }

  if (error) {
    return <ErrControler err={error} />;
  }

  return (
    <Sidebar>
      <div className="m-auto">
        <section className="_heading-container">
          <Breadcrumbs fullWidth>
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
            <a href="#" className="text-xs lg:text-sm">
              Staffs
            </a>
          </Breadcrumbs>

          <div className="_head-comp grid lg:grid-cols-3 md:grid-cols-1 grid-cols-1 gap-4 mx-8 lg:mt-4">
            <div className="_search col-span-2">
              {/* below code for the future update */}
              {/* <form>
                  <div className="flex items-center rounded-full border border-gray-300 px-3 py-2">
                    <MdPersonSearch className="text-gray-500 text-2xl" />
                    <input
                      type="text"
                      name="searchQuery"
                      className="w-full outline-none ml-2 "
                      placeholder="Search Dealer or Brocker"
                    />
                  </div>
                </form> */}
            </div>
            <div className="_head-btn flex md:justify-end lg:justify-end gap-4">
              <div></div>
              {/**ADD staff */}
              <div className="col-span-3 md:col-span-2">
                <Link to="/settings/staffs/add">
                  <Button
                    size="sm"
                    type="button"
                    className="flex items-center gap-2 text-white text-xs lg:text-sm font-normal lg:font-semibold shadow-lg bg-purple-900 hover:bg-primary"
                  >
                    <BsPersonPlusFill size={14} /> Add New
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-3 mt-3 md:mt-10 lg:mt-16">
          {/* Staff start */}
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
                <BsFillPersonVcardFill className="text-3xl text-gray-300" />
              </div>
              <h3 className="text-gray-700 font-bold text-lg mb-1">No Staff Found</h3>
              <p className="text-gray-400 text-sm mb-5">
                There are no staff members yet. Add your first staff member to get started.
              </p>
              <Link to="/settings/staffs/add">
                <Button
                  size="sm"
                  className="flex items-center gap-2 bg-purple-900 hover:bg-purple-800 text-white normal-case"
                >
                  <BsPersonPlusFill size={14} /> Add First Staff
                </Button>
              </Link>
            </div>
          ) : (
            users.map((user, i) => (
              <div
                onClick={() => navigate(`/settings/staffs/${user._id}/profile`)}
                key={i}
                className="bg-gray-100 h-auto mx-5 lg:mx-10 rounded-md drop-shadow-md mt-5 cursor-pointer
             btn relative inline-flex items-center justify-start overflow-hidden transition-all hover:bg-blue-200 group"
              >
                <div className="flex flex-1 gap-2 lg:gap-5">
                  <BsFillPersonVcardFill className="m-3 text-2xl ml-3 flex-none text-accent" />
                  <Typography className="m-3 font-bold lg:text-base md:text-sm text-xs">
                    {user.username || ""}
                  </Typography>
                  <Typography className="m-3 font-bold lg:text-base md:text-sm text-xs">
                    {user.name || "No-Name"}
                  </Typography>
                  <Typography className="m-3 font-bold lg:text-base md:text-sm text-xs">
                    {user.phone || "No-Phone"}
                  </Typography>
                  <Typography className="m-3 font-bold lg:text-base md:text-sm text-xs">
                    {user.level === 3
                      ? "Super-Admin"
                      : user.level === 2
                      ? "Admin"
                      : "Staff"}
                  </Typography>
                </div>
              </div>
            ))
          )}
          {/* Staff End */}
        </div>
      </div>
    </Sidebar>
  );
}

export default StaffList;