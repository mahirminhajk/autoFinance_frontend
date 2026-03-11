import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  Input,
  Button,
  Card,
  CardBody,
  Checkbox,
} from "@material-tailwind/react";
//* comp
import Sidebar from "../../../../components/sidebar/Sidebar";
import axiosapi from "../../../../helpers/axiosapi";
import {
  statusChecker,
  // StatusCheckerRender,
} from "../../../../helpers/StatusHelper";
// import StautsUpdateBtn from "../../../../components/formComponents/StautsUpdateBtn";
import Tabbar from "./components/Tabbar";
import FormSubHeading from "../../../../components/formComponents/FormSubHeading";
import FormLoadingComp from "../../../../components/formComponents/FormLoadingComp";
import {
  ToastComp,
  toastError,
  toastSuccess,
} from "../../../../helpers/ToastHelper";

const requiredStatus = "loan_desp";

function CustomerCompleted() {
  const cusId = useParams().cusid;
  const [loading, setLoading] = useState(false);
  // const [statusCheck, setStatusCheck] = useState(true);
  // const [userStatus, setUserStatus] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      loanAmount: Number,
      payoutTotal: Number,
      totalLoanAmount: Number,
      totalPayoutAmount: Number,
      addToWhatspGroup: false,
      payoutSlip: null,
      invoice: null,
    },
  });

  const [payoutSlip, setPayoutSlip] = useState(null);
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statusRes = await axiosapi.get(`/cus/${cusId}/status`);
        const checker = statusChecker(requiredStatus, statusRes.data.status);
        // setUserStatus(statusRes.data.status);
        // setStatusCheck(checker);
        // if (checker === false) return;

        await axiosapi.get(`/cus/${cusId}/completed`).then((res) => {
          const data = res.data.completed;
          if (data) {
            Object.keys(data).forEach((key) => {
              if (key === "payoutSlip") {
                setPayoutSlip(
                  `https://leadup-crm.s3.ap-south-1.amazonaws.com/${data[key]}`
                );
              } else if (key === "invoice") {
                setInvoice(
                  `https://leadup-crm.s3.ap-south-1.amazonaws.com/${data[key]}`
                );
              } else if (key === "addToWhatspGroup") {
                setValue(key, data[key] === "true" ? true : false);
              } else if (key === "completePayoutToDealer") {
                setValue(key, data[key] === "true" ? true : false);
              } else {
                setValue(key, data[key]);
              }
            });
          }
        });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDespLetterChange = (e, name) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    if (name === "payoutSlip") {
      setPayoutSlip(fileUrl);
      setValue("payoutSlip", file);
    } else if (name === "invoice") {
      setInvoice(fileUrl);
      setValue("invoice", file);
    }
  };

  const deleteImage = (name) => {
    if (name === "payoutSlip") {
      setPayoutSlip(null);
      setValue("payoutSlip", "remove");
    } else if (name === "invoice") {
      setInvoice(null);
      setValue("invoice", "remove");
    }
  };

  const uploadData = async (data) => {
    setLoading(true);
    await axiosapi
      .patch(`cus/${cusId}/completed`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        //* toast
        toastSuccess("Updated Successfully");
      })
      .catch((err) => {
        toastError("Something went wrong");
      });
    setLoading(false);
  };

  // if (!statusCheck) {
  //   return (
  //     <StatusCheckerRender
  //       requiredStatus={requiredStatus}
  //       userStatus={userStatus}
  //       cusid={cusId}
  //     />
  //   );
  // }

  return (
    <Sidebar>
      <section className="m-auto">
        <div>
          <Tabbar cusid={cusId} />
          <div className="_form-container mx-10 w-auto mt-5">
            <FormSubHeading subheading="Completion" />

            {!loading ? (
              <>
                <form
                  onSubmit={handleSubmit(uploadData)}
                  className=" my-auto mx-auto"
                >
                  <div className="grid lg:w-[550px]">
                    <div className="mt-10">
                      <div className="grid grid-cols lg:grid-cols-1 gap-5 mt-5 mx-5 lg:mx-10 mr-72  ">
                        <div className="md:mx-1 grid gap-5 ">
                          <Input
                            type="number"
                            min={0}
                            label="Loan Amount"
                            {...register("loanAmount")}
                          />
                          <Input
                            type="number"
                            min={0}
                            label="Payout Amount"
                            {...register("payoutTotal")}
                          />
                          <Input
                            type="number"
                            min={0}
                            label="Total Loan Amount"
                            {...register("totalLoanAmount")}
                          />
                          <Input
                            type="number"
                            min={0}
                            label="Total Payout Amount"
                            {...register("totalPayoutAmount")}
                          />

                          <Checkbox
                            label="Add to WhatsApp broadcast group"
                            {...register("addToWhatspGroup")}
                          />
                          <Checkbox
                            label="Complete Payout to Dealer"
                            {...register("completePayoutToDealer")}
                          />
                        </div>

                        {!payoutSlip ? (
                          <Input
                            variant="static"
                            type="file"
                            accept="image/*"
                            label="Payout Slip"
                            onChange={(e) =>
                              handleDespLetterChange(e, "payoutSlip")
                            }
                          />
                        ) : (
                          <div className="flex">
                            <Card className="mt-5 w-40">
                              <img
                                src={payoutSlip}
                                alt="payoutSlip"
                                style={{ width: "200px" }}
                              />
                              <CardBody className="m-auto">
                                <>
                                  <Button
                                    size="sm"
                                    color="red"
                                    onClick={() => setShowModal(true)}
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
                                                onClick={() =>
                                                  setShowModal(false)
                                                }
                                              >
                                                Close
                                              </Button>
                                              <Button
                                                size="sm"
                                                className="bg-red-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() =>
                                                  deleteImage("payoutSlip")
                                                }
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
                              </CardBody>
                            </Card>
                          </div>
                        )}
                        <br />
                        {!invoice ? (
                          <Input
                            variant="static"
                            type="file"
                            accept="image/*"
                            label="Invoice"
                            onChange={(e) =>
                              handleDespLetterChange(e, "invoice")
                            }
                          />
                        ) : (
                          <div className="flex">
                            <Card className="mt-5 w-40">
                              <img
                                src={invoice}
                                alt="invoice"
                                style={{ width: "200px" }}
                              />
                              <CardBody className="m-auto">
                                <>
                                  <Button
                                    size="sm"
                                    color="red"
                                    onClick={() => setShowModal(true)}
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
                                                onClick={() =>
                                                  setShowModal(false)
                                                }
                                              >
                                                Close
                                              </Button>
                                              <Button
                                                size="sm"
                                                className="bg-red-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() =>
                                                  deleteImage("invoice")
                                                }
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
                              </CardBody>
                            </Card>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className=" flex lg:justify-center my-5">
                    <Button size="sm" color="green" type="submit">
                      Update
                    </Button>
                  </div>
                </form>
                {/* <div className=" flex lg:justify-center my-5 ">
                  <StautsUpdateBtn
                    updateStatus={"completed"}
                    cusId={cusId}
                    currentStatus={userStatus}
                  />
                </div> */}
              </>
            ) : (
              <FormLoadingComp />
            )}
          </div>
        </div>
      </section>
      <ToastComp />
    </Sidebar>
  );
}

export default CustomerCompleted;
