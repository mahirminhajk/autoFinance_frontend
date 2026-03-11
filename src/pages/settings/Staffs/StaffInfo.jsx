import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Typography, Button, Breadcrumbs } from "@material-tailwind/react";
import Sidebar from "../../../components/sidebar/Sidebar";
import { AiFillDelete, AiFillEdit, AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router";
import ErrControler from "../../../components/controlComps/ErrControler";
import LoadingControler from "../../../components/controlComps/LoadingControler";
import axiosapi from "../../../helpers/axiosapi";

function StaffInfo() {
  const userId = useParams().id;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        await axiosapi.get(`/user/${userId}`).then((res) => {
          setUserData(res.data);
        });
      } catch (err) {
        setError(err?.response?.data ? err.response.data : err);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  const deleteTheUser = async () => {
    try {
      setLoading(true);
      await axiosapi.delete(`/user/${userId}`);
      navigate("/settings/staffs");
    } catch (err) {
      setError(err);
    }
    setLoading(false);
  };

  const [showModal, setShowModal] = useState(false);

  if (loading) {
    return <LoadingControler />;
  }

  if (error) {
    return <ErrControler err={error} />;
  }

  return (
    <Sidebar>
      <div className="m-auto">
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
          <a
            onClick={() => navigate("/settings/staffs")}
            className="opacity-60 text-xs lg:text-sm"
          >
            Staffs
          </a>
          <a className="text-xs lg:text-sm">Staff Info</a>
        </Breadcrumbs>

        <div className="w-auto h-auto lg:mx-20 lg:my-10 flex flex-col justify-center p-4 shadow-lg rounded-lg">
          <div className="grid grid-cols ">
            <div className="justify-self-end">
              <Button
                onClick={() => setShowModal(true)}
                variant="gradient"
                className="m-2 p-2.5  rounded-xl hover:rounded-3xl bg-blue-500 transition-all duration-300 hover:text-black text-white"
              >
                <AiFillDelete className="text-xl lg:text-2xl" />
              </Button>
              {showModal ? (
                <>
                  <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-sm">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-sm md:text-base lg:text-xl font-semibold">
                            Are you sure ?
                          </h3>
                        </div>

                        {/*footer*/}
                        <div className="flex items-center justify-end m-auto gap-5 my-3 border-t border-solid border-slate-200 rounded-b">
                          <Button
                            size="sm"
                            className="bg-slate-500 text-black-500 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ml-2 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => setShowModal(false)}
                          >
                            <span>Close</span>
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={deleteTheUser}
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-50 fixed inset-0 z-40 bg-black" />
                </>
              ) : null}

              <Button
                onClick={() => navigate(`/settings/staffs/${userId}/edit`)}
                className="m-2 p-2.5 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white"
              >
                <AiFillEdit className="text-lg lg:text-2xl" />
              </Button>
            </div>
          </div>

          {/* staff details */}

          <div className="mt-5 lg:mt-10">
            <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md tex-black-700 mt-4 text-xs md:text-sm lg:text-base">
              Name: <span className="font-bold">{userData.name || "--"}</span>
            </Typography>
            <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md tex-black-700 mt-4 text-xs md:text-sm lg:text-base">
              Username: <span className="font-bold">{userData.username}</span>
            </Typography>
            <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md tex-black-700 mt-4 text-xs md:text-sm lg:text-base">
              Email: <span className="font-bold">{userData.email || "--"}</span>
            </Typography>
            <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md tex-black-700 mt-4 text-xs md:text-sm lg:text-base">
              Phone No.:{" "}
              <span className="font-bold">{userData.phone || "--"}</span>
            </Typography>
            <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md tex-black-700 mt-4 text-xs md:text-sm lg:text-base">
              Role:{" "}
              <span className="font-bold">
                {userData.level === 3
                  ? "Super-Admin"
                  : userData.level === 2
                  ? "Admin"
                  : "Staff"}
              </span>
            </Typography>
            <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md tex-black-700 mt-4 text-xs md:text-sm lg:text-base">
              Address:{" "}
              <span className="font-bold">{userData.address || "--"}</span>
            </Typography>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default StaffInfo;
StaffInfo;
