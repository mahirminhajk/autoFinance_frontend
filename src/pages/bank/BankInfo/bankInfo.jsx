import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Typography,
  Button,
  Avatar,
  Breadcrumbs,
} from "@material-tailwind/react";
import { AiFillDelete, AiFillEdit, AiFillHome } from "react-icons/ai";
import { useParams } from "react-router-dom";
import Sidebar from "../../../components/sidebar/Sidebar";

import BankPolicy from "./bankPolicy";
import LoadingControler from "../../../components/controlComps/LoadingControler";
import ErrControler from "../../../components/controlComps/ErrControler";
import axiosapi from "../../../helpers/axiosapi";
import BankEmployees from "./BankEmployees";
import ImageViewer from "../../../components/ImageViewer";

function BankInfo() {
  const navigate = useNavigate();
  const bankId = useParams().bankid;

  const [bankInfo, setBankInfo] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBankData = async () => {
      try {
        setLoading(true);
        const res = await axiosapi.get(`/bank/${bankId}`);
        setBankInfo(res.data);
      } catch (err) {
        setError(err?.response?.data ? err.response.data : err);
      } finally {
        setLoading(false);
      }
    };

    fetchBankData();
  }, []);

  const deleteBank = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      await axiosapi.delete(`/bank/${bankId}`).then((res) => {
        navigate("/bank");
      });
    } catch (err) {
      setError(err.response.data ? err.response.data : err);
    }
    setLoading(false);
  };

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
            onClick={() => navigate("/bank")}
            className="opacity-60 text-xs lg:text-sm"
          >
            Banks
          </a>
          <a className="text-xs lg:text-sm">Bank Info</a>
        </Breadcrumbs>

        <div className="w-auto h-auto flex flex-col justify-center p-5 lg:my-10  lg:mx-10">
          <div className="grid grid-cols-1">
            <div className="justify-self-end">
              <>
                <Button
                  size="sm"
                  onClick={() => setShowModal(true)}
                  variant="gradient"
                  className="m-2 p-2.5 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white"
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
                              onClick={deleteBank}
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
              </>

              <Button
                size="sm"
                onClick={() => navigate(`/bank/${bankId}/edit`)}
                className="m-2 p-2.5 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white"
              >
                <AiFillEdit className="text-lg lg:text-2xl" />
              </Button>
            </div>
          </div>
          <div className=" h-auto ">
            <div className="grid grid-cols-2 gap-x-6 w-[80%] lg:w-[40%] md:w-[50%] ">
              <div>
                <ImageViewer
                  imageUrl={
                    bankInfo.logo ||
                    "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
                  }
                  alt="bank logo"
                  className="row-span-4 mx-auto"
                />
              </div>
              <div>
                <Typography
                  color="blue-gray"
                  className="mb-1 font-bold uppercase text-base md:text-xl lg:text-xl"
                >
                  {bankInfo?.bankName || "-"}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="mb-1 font-bold text-base md:text-xl lg:text-xl"
                >
                  {bankInfo?.branch || "-"}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="mb-1 font-bold text-base md:text-xl lg:text-xl"
                >
                  {bankInfo?.address || "-"}
                </Typography>
                <Typography
                  color="blue-gray"
                  className="mb-1 font-bold uppercase text-base md:text-xl lg:text-xl"
                >
                  {bankInfo?.ifsc || "-"}
                </Typography>
              </div>
            </div>
          </div>
          <div className="my-5">
            <BankEmployees employees={bankInfo?.employees} />
            <BankPolicy
              branchPolicy={bankInfo?.branchPolicy}
              mandatoryDoc={bankInfo?.mandatoryDoc}
            />
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

export default BankInfo;
