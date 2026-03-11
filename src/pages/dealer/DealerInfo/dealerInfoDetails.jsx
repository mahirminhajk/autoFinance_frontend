import { useEffect, useState } from "react";
import { Typography, Button } from "@material-tailwind/react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { useNavigate } from "react-router";
import { DealerStaffs } from "./dealerStaffs";
import axiosapi from "../../../helpers/axiosapi";
import DealerCustomers from "./dealerCustomers";
import ImageViewer from "../../../components/ImageViewer";

function DealerInfoDetails({ dealerId, setError, setLoading }) {
  const navigate = useNavigate();

  const [dealerInfo, setDealerInfo] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchDealerData = async () => {
      try {
        const res = await axiosapi.get(`/dealer/${dealerId}?customers=true`);
        setDealerInfo(res.data);
      } catch (err) {
        setError(err?.response?.data ? err.response.data : err);
      } finally {
        //setLoading(false);
      }
    };
    fetchDealerData();
  }, [dealerId]);

  const deleteDealer = async () => {
    setShowModal(false);
    setLoading(true);
    try {
      await axiosapi.delete(`/dealer/${dealerId}`).then((res) => {
        navigate("/dealer");
      });
    } catch (err) {
      setError(err.response.data ? err.response.data : err);
    }
    setLoading(false);
  };

  return (
    <>
      {/* card */}
      <div className="w-auto h-auto lg:mx-20 lg:my-10 flex flex-col justify-center p-4 shadow-lg rounded-lg">
        <div className="grid grid-cols ">
          <div className="justify-self-end">
            <>
              <Button
                size="sm"
                variant="gradient"
                className="m-2 p-2.5  rounded-xl hover:rounded-3xl bg-blue-500 transition-all duration-300 hover:text-black text-white"
                onClick={() => setShowModal(true)}
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
                            onClick={() => deleteDealer()}
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
              onClick={() => navigate(`/dealer/${dealerId}/edit`)}
              className="m-2 p-2.5 bg-blue-500 rounded-xl hover:rounded-3xl hover:bg-blue-600 transition-all duration-300 text-white"
            >
              <AiFillEdit className="text-lg lg:text-2xl" />
            </Button>
          </div>
        </div>
        <div>
          <Typography className="uppercase px-3 mt-2 w-max mx-3 lg:mx-10 bg-gray-100 rounded-lg shadow-md text-black-700 text-xs md:text-sm lg:text-base">
            <span className="font-bold"> {dealerInfo.type || ""}</span>
          </Typography>
          {/* profile-image */}
          <div className="image mx-auto w-max">
            <ImageViewer
              imageUrl={
                dealerInfo.photo ||
                "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
              }
              alt="IMG"
              className="rounded-full w-40 h-40"
            />
          </div>
          <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md tex-black-700 mt-4 text-xs md:text-sm lg:text-base">
            Name: <span className="font-bold">{dealerInfo.name || ""}</span>
          </Typography>
          <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md text-black-700  mt-4 text-xs md:text-sm lg:text-base">
            Shop Name:{" "}
            <span className="font-bold">{dealerInfo.shopname || ""}</span>
          </Typography>
          <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md text-black-700 mt-4 text-xs md:text-sm lg:text-base">
            Phone No.:{" "}
            <span className="font-bold">{dealerInfo.phoneNo || ""}</span>
          </Typography>
          <Typography className="name py-1 px-3 mb-2 mx-5 lg:mx-10 bg-gray-100 rounded-lg shadow-md text-black-700 mt-4 text-xs md:text-sm lg:text-base">
            Place: <span className="font-bold">{dealerInfo.place || ""}</span>
          </Typography>
          <hr />
        </div>

        {dealerInfo?.staffs && <DealerStaffs staffs={dealerInfo.staffs} />}
      </div>
      <div>
        {dealerInfo.customers && (
          <DealerCustomers customers={dealerInfo.customers} />
        )}
      </div>
    </>
  );
}

export default DealerInfoDetails;
