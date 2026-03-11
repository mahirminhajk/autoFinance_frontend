import { useEffect, useState, useRef, useContext } from "react";
import {
  // Link,
  useNavigate,
  useParams,
} from "react-router-dom";
import Sidebar from "../../../../components/sidebar/Sidebar";
import axiosapi from "../../../../helpers/axiosapi";
import {
  Avatar,
  Breadcrumbs,
  Button,
  Typography,
} from "@material-tailwind/react";
// import { getNextActionForCusInfo } from "../../../../helpers/StatusHelper";
import { convertMongoDateToSimpleDateTime } from "../../../../helpers/dateConverter";
import LoadingControler from "../../../../components/controlComps/LoadingControler";
import ErrControler from "../../../../components/controlComps/ErrControler";
import { CustomerVerify } from "./CustomerVerify";
import { CustomerReadyLogin } from "./CustomerReadyLogin";
import { CustomerFTR } from "./CustomerFTR";
import { CustomerLoanApproved } from "./CustomerLoanApproved";
import { CustomerLoanDesp } from "./CustomerLoanDesp";
import { CustomerRtowork } from "./CustomerRtowork";
import { CustomerCompleted } from "./CustomerCompleted";
import CustomerGeneral from "./CustomerGeneral";
import CustomerDocuments from "./CustomerDocuments";
import CustoemrLoginInfo from "./CustomerLoginInfo";

import { useReactToPrint } from "react-to-print";
import { AiFillHome, AiFillPrinter } from "react-icons/ai";
import ImageViewer from "../../../../components/ImageViewer";
import { AuthContext } from "../../../../context/AuthContext";
import { CustomerBank } from "./customerBank";

function CustomerInfo() {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "customer-data",
    // onAfterPrint: () => alert("Print Success"),
  });

  const navigate = useNavigate();

  const cusId = useParams().cusid;

  const { user } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);

  const [cusData, setCusData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axiosapi.get(`/cus/${cusId}`);

      if (response?.sucess === false) {
        setErr(response.data);
      } else {
        setCusData(response.data);
      }
      setLoading(false);
    } catch (err) {
      setErr(err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCustomerDelete = async () => {
    try {
      setLoading(true);
      const response = await axiosapi.delete(`/cus/${cusId}`);
      //* redirect to customer list
      navigate("/customer");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingControler size={3} />;
  }

  if (err) {
    return <ErrControler err={err} />;
  }

  return (
    <Sidebar>
      <div className="m-auto ">
        <section className="_main-container h-screen w-auto ">
          <Breadcrumbs fullWidth>
            <a
              onClick={() => navigate("/")}
              className="opacity-60 text-xs lg:text-sm"
            >
              <AiFillHome />
            </a>
            <a
              onClick={() => navigate("/customer")}
              className="opacity-60 text-xs lg:text-sm"
            >
              Customers
            </a>
            <a className="text-xs lg:text-sm">Customer Info</a>
          </Breadcrumbs>

          <div className="lg:flex my-5 ml-8 justify-self-center gap-1 md:gap-2 lg:gap-3">
            <div className="flex h-min">
              <div className="mr-5">
                <Button
                  size="sm"
                  className="bg-green-500 flex text-white active:bg-emerald-600 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={handlePrint}
                >
                  <AiFillPrinter className="text-2xl md:text-lg lg:text-2xl mr-2 text-white" />
                </Button>
              </div>
              <>
                <Button
                  size="sm"
                  className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  onClick={() => setShowModal(true)}
                  disabled={user?.level === 3 ? false : true}
                >
                  Delete
                </Button>
                {showModal ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto mx-auto max-w-sm">
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
                              Close
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => handleCustomerDelete()}
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
            </div>
          </div>

          <div
            className="mt-5"
            ref={componentRef}
            style={{ width: "auto", height: window.innerHeight }}
          >
            {/**Main Action, Created At, Updated At  */}
            <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-4 gap-4 ">
              <div className="bg-white justify-self-center flex w-max ">
                {cusData?.docuploads?.some(
                  (doc) => doc?.docname === "Photo"
                ) ? (
                  <ImageViewer
                    alt="profile"
                    imageUrl={
                      cusData?.docuploads?.find(
                        (doc) => doc?.docname === "Photo"
                      )?.img1
                    }
                  />
                ) : (
                  <Avatar
                    alt="no photo aviailable"
                    size="xxl"
                    src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  />
                )}
              </div>

              {/* <div>
                {getNextActionForCusInfo(cusData?.general?.status, cusId, Link)}
              </div> */}

              <div className="my-3 ml-2 py-3 h-min rounded-lg bg-blue-100">
                <span className="flex ml-4">
                  <p className="text-sm font-semibold">Customer ID :</p>
                  <p className="ml-2 text-sm font-semibold text-gray-600  ">
                    {cusData?.index}
                  </p>
                </span>
              </div>

              <div className="my-3 ml-2 py-3 h-min rounded-lg bg-red-100">
                <span className="flex ml-4 ">
                  <p className="text-sm font-semibold">Created At :</p>
                  <p className="ml-2 text-sm font-semibold text-gray-600  ">
                    {convertMongoDateToSimpleDateTime(cusData?.createdAt)}
                  </p>
                </span>
              </div>

              <div className="my-3 ml-2 py-3 h-min rounded-lg bg-green-100">
                <span className="flex ml-4">
                  <p className="text-sm font-semibold">Updated At :</p>
                  <p className="ml-2 text-sm font-semibold text-gray-600  ">
                    {convertMongoDateToSimpleDateTime(cusData?.updatedAt)}
                  </p>
                </span>
              </div>
            </div>

            {/* Customer Informations */}
            <div className="ml-3 my-10 ">
              <>
                {/* General Details */}
                <Typography className="font-semibold md:text-xl lg:text-xl md:font-semibold lg:font-semibold  md:ml-2 lg:ml-5 ">
                  General Details
                </Typography>
                <CustomerGeneral cusData={cusData} />
              </>

              {cusData?.verification.length !== 0 && (
                <>
                  {/**Customer Verify Documents*/}
                  <Typography className="font-semibold md:text-xl lg:text-xl md:font-semibold lg:font-semibold  md:ml-2 lg:ml-5 ">
                    Verification
                  </Typography>
                  <CustomerVerify verifyData={cusData?.verification} />
                </>
              )}

              {cusData?.docuploads.length !== 0 && (
                <>
                  {/**Documents*/}
                  <Typography className="font-semibold md:text-xl lg:text-xl md:font-semibold lg:font-semibold  md:ml-2 lg:ml-5 ">
                    Documents
                  </Typography>
                  <CustomerDocuments docs={cusData?.docuploads} />
                </>
              )}

              {cusData?.readyLogin.length !== 0 && (
                <>
                  {/* Ready to Login */}
                  <CustomerReadyLogin readyLogin={cusData?.readyLogin} />
                </>
              )}

              {cusData?.ftr && (
                <>
                  {/* Bank */}
                  <Typography className="font-semibold md:text-xl lg:text-xl md:font-semibold lg:font-semibold  md:ml-2 lg:ml-5 ">
                    Bank
                  </Typography>
                  <CustomerBank
                    ftr={cusData?.ftr}
                    bank={cusData?.general?.bank}
                    otherData={{
                      executive: cusData?.general?.executive,
                      executivePhoneNO: cusData?.general?.employeePhoneNo,
                      manager: cusData?.general?.manager,
                      managerPhoneNo: cusData?.general?.managerPhoneNo,
                      // customerVehicleLocation:
                      //   cusData?.general?.customerVehicleLocation,
                      valuationDetails: cusData?.general?.valuationDetails,
                      dealerName: cusData?.general?.dealerName,
                      // oldOwnerPhoneNumber:
                      //   cusData?.general?.oldOwnerPhoneNumber,
                      // method: cusData?.general?.method,
                      // policy: cusData?.general?.policy,
                      // managerCall:
                      //   cusData.general.initalCheckup[2]?.values?.ManagerCall ||
                      //   false,
                    }}
                  />
                </>
              )}

              {cusData?.login && (
                <>
                  {/*Login */}
                  <Typography className="font-semibold md:text-xl lg:text-xl md:font-semibold lg:font-semibold  md:ml-2 lg:ml-5 ">
                    Login Details
                  </Typography>
                  <CustoemrLoginInfo loginObj={cusData?.login} />
                </>
              )}

              {cusData?.ftr && (
                <>
                  {/* FTR */}
                  <Typography className="font-semibold md:text-xl lg:text-xl md:font-semibold lg:font-semibold  md:ml-2 lg:ml-5 ">
                    FTR
                  </Typography>
                  <CustomerFTR
                    ftr={cusData?.ftr}
                    status={cusData?.general?.status}
                  // bank={cusData?.general?.bank}
                  // otherData={{
                  //   executive: cusData?.general?.executive,
                  //   executivePhoneNO: cusData?.general?.employeePhoneNo,
                  //   manager: cusData?.general?.manager,
                  //   managerPhoneNo: cusData?.general?.managerPhoneNo,
                  // customerVehicleLocation:
                  //   cusData?.general?.customerVehicleLocation,
                  // valuationDetails: cusData?.general?.valuationDetails,
                  // dealerName: cusData?.general?.dealerName,
                  // oldOwnerPhoneNumber:
                  //   cusData?.general?.oldOwnerPhoneNumber,
                  // method: cusData?.general?.method,
                  // policy: cusData?.general?.policy,
                  // managerCall:
                  //   cusData.general.initalCheckup[2]?.values?.ManagerCall ||
                  //   false,
                  // }}
                  />
                </>
              )}

              {(cusData?.loan || cusData?.loanApproved.length !== 0) && (
                // Loan Approvel
                <>
                  <Typography className="font-semibold md:text-xl lg:text-xl md:font-semibold lg:font-semibold  md:ml-2 lg:ml-5 ">
                    Loan Approved
                  </Typography>
                  <CustomerLoanApproved
                    loanApprovedData={cusData?.loanApproved}
                    loanData={cusData?.loan}
                  />
                </>
              )}

              {cusData?.loanDesp && (
                <>
                  {/* Loan Desp */}
                  <Typography className="font-semibold md:text-xl lg:text-xl md:font-semibold lg:font-semibold  md:ml-2 lg:ml-5 ">
                    Loan Desp
                  </Typography>
                  <CustomerLoanDesp loanDespData={cusData?.loanDesp} />
                </>
              )}

              {cusData?.rtoWork && (
                <>
                  {/* RTO Work */}
                  <Typography className="font-semibold md:text-xl lg:text-xl md:font-semibold lg:font-semibold  md:ml-2 lg:ml-5 ">
                    RTO Work
                  </Typography>
                  <CustomerRtowork rtoWorkData={cusData?.rtoWork} />
                </>
              )}

              {cusData?.completed && (
                <>
                  {/* Completed */}
                  <Typography className="font-semibold md:text-xl lg:text-xl md:font-semibold lg:font-semibold  md:ml-2 lg:ml-5 ">
                    Completed
                  </Typography>
                  <CustomerCompleted cusCompleteData={cusData?.completed} />
                </>
              )}
            </div>

            {cusData?.messSendInfo && (
              <div className="flex h-min md:mt-2 mt-2 flex-wrap">
                {cusData?.messSendInfo.map((info, i) => (
                  <div
                    className="h-min ml-3 bg-green-200 hover:bg-green-800 rounded-md mt-2"
                    key={i}
                  >
                    <div className=" m-2 hover:text-white text-xs md:text-sm lg:text-base font-medium">
                      <p>{info.name}</p>
                      <p>{convertMongoDateToSimpleDateTime(info.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* print close */}
        </section>
      </div>
    </Sidebar>
  );
}

export default CustomerInfo;
