import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  Input,
  Checkbox,
  Button,
  Typography,
  Card,
  CardBody,
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
import { convertMongoDateToSimpleDate } from "../../../../helpers/dateConverter";
import FormLoadingComp from "../../../../components/formComponents/FormLoadingComp";
import {
  ToastComp,
  toastError,
  toastSuccess,
} from "../../../../helpers/ToastHelper";
// import MessageTextarea from "../../../../components/messageTextarea/MessageTextarea";

const requiredStatus = "loan_approved";
// const messageDefaultValue =
//   "Dear customer,\n\nYour loan have been disbursal stage\n\nPlease confirm the details\n\nLoan approved ----\nProcessing fee : ----\nDocumentation, Stamping + Gst :----\nLoan insurance: ----\n\nLoan ----\nEmi maximum tenure ---- months\n\n10834*48\n9232*60\n8182*72\n\nNet disb: ---- ( Stamp Rs ----)\n\nRto : depends onworkandfine.\n\n\n\nFor further updates please connect with our staffs\nContact number: +919544880098";

function CustomerLoanDesp() {
  const cusId = useParams().cusid;
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  // const [statusCheck, setStatusCheck] = useState(true);
  // const [userStatus, setUserStatus] = useState(null);

  const [transaction, setTransaction] = useState(null);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      loanDespCall: false,
      loanAgreementSign: false,
      askBalanceFundGiven: false,
      askBalanceFundGivenDealer: false,
      askBalanceFundGivenCustomer: false,
      despLetter: null,
      despAmount: 0,
      rtoCuttingAmount: "",
      netDd: "",
    },
  });

  const [despLetterImage, setDespLetterImage] = useState(null);

  const parseBoolean = (value) => {
    if (value === true) return true;
    if (value === false) return false;
    if (value === "true") return true;
    if (value === "false") return false;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const statusRes = await axiosapi.get(`/cus/${cusId}/status`);
      const checker = statusChecker(requiredStatus, statusRes.data.status);

      // setUserStatus(statusRes.data.status);
      // setStatusCheck(checker);
      // if (checker === false) return;

      await axiosapi
        .get(`/cus/${cusId}/loandesp`)
        .then((res) => {
          const fetchData = res.data.loanDesp;
          if (fetchData !== false) {
            Object.keys(fetchData).forEach((key) => {
              if (key === "despLetter") {
                setDespLetterImage(
                  `https://leadup-crm.s3.ap-south-1.amazonaws.com/${fetchData[key]}`
                );
              } else if (
                key === "loanDespCall" ||
                key === "loanAgreementSign" ||
                key === "askBalanceFundGiven" ||
                key === "askBalanceFundGivenDealer" ||
                key === "askBalanceFundGivenCustomer"
              )
                setValue(key, parseBoolean(fetchData[key]));
              else if (key === "despTransaction")
                setTransaction(fetchData[key]);
              else setValue(key, fetchData[key]);
            });
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };

    fetchData();
  }, []);

  const handleDespLetterChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setDespLetterImage(fileUrl);
    setValue("despLetter", file);
  };

  const deleteImage = () => {
    setDespLetterImage(null);
    setValue("despLetter", "remove");
  };

  const uploadData = async (data) => {
    setLoading(true);
    await axiosapi
      .patch(`cus/${cusId}/loanDesp`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        //* toast
        toastSuccess("Loan Desp Updated Successfully");
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
        <Tabbar cusid={cusId} />
        <div className="_form-container mx-10 w-auto mt-5">
          <FormSubHeading subheading="Loan" />

          {!loading ? (
            <>
              <form
                onSubmit={handleSubmit(uploadData)}
                className=" my-auto mx-auto"
              >
                <div className="grid grid-cols lg:grid-cols-2 md:grid-cols-2 ">
                  <div className="mt-5">
                    <Typography className="text-sm lg:text-base font-semibold">
                      Loan Desp
                    </Typography>
                    <div className="grid grid-cols lg:grid-cols-1 gap-3 lg:gap-5 mt-5 mx-5 lg:mx-10 lg:text-base md:text-sm text-xs">
                      <Checkbox
                        label="Loan Desp Call"
                        {...register("loanDespCall")}
                      />
                      <Checkbox
                        label="Loan Agreement Sign"
                        {...register("loanAgreementSign")}
                      />
                      {!despLetterImage ? (
                        <div className="mr-72 md:mx-8 lg:mx-5">
                          <Input
                            variant="static"
                            type="file"
                            accept="image/*"
                            label="Desp Letter"
                            onChange={handleDespLetterChange}
                          />
                        </div>
                      ) : (
                        <div>
                          <Card className="mt-1 w-40">
                            <img
                              src={despLetterImage}
                              alt="Desp Letter"
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
                                              onClick={deleteImage}
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

                      <div className="mr-72 md:mx-8 lg:mx-5">
                        <br />
                        <Input
                          variant="static"
                          type="number"
                          label="Desp Amount"
                          min={0}
                          {...register("despAmount")}
                        />
                        <br />
                        <Input
                          variant="static"
                          type="text"
                          label="RTO cutting amount"
                          {...register("rtoCuttingAmount")}
                        />
                        <br />
                        <Input
                          variant="static"
                          type="text"
                          label="Net DD"
                          {...register("netDd")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-5 ">
                    <Typography className="text-sm lg:text-base font-semibold">
                      Customer Enquiry Call
                    </Typography>
                    <div className="mx-10 grid mt-5 lg:text-base md:text-sm text-xs">
                      <Checkbox
                        label="Ask Balance Fund Given"
                        {...register("askBalanceFundGiven")}
                      />
                      <Checkbox
                        label="Dealer"
                        {...register("askBalanceFundGivenDealer")}
                      />
                      <Checkbox
                        label="Customer"
                        {...register("askBalanceFundGivenCustomer")}
                      />
                    </div>

                    {/* <div className="mt-5">
                      <Typography className="text-sm lg:text-base font-semibold">
                        Desp Conformation Message
                      </Typography>
                      <form
                        action=""
                        className="mt-5 md:mx-10 lg:mx-10 mb-2 w-80 max-w-screen-lg sm:w-96"
                      >
                        <Textarea label="Desp Message Contents" />
                        <Button size="sm" type="submit">
                          Messege Pass
                        </Button>
                      </form>
                    </div> */}
                    {/* <MessageTextarea
                      cusid={cusId}
                      heading="Desp Conformation Message"
                      value={messageDefaultValue}
                      textareaLabel="Type message here"
                      btnLabel="Send Message"
                    /> */}
                  </div>
                </div>

                <div className=" flex md:justify-center gap-5 lg:justify-center my-5">
                  <Button size="sm" color="green" type="submit">
                    Update
                  </Button>
                </div>
              </form>
              {transaction && (
                <Card className="mx-10 w-96 md:w-2/3 lg:w-fit">
                  <CardBody>
                    <Typography variant="h6" className="mb-3">
                      Loan Desp Transaction
                    </Typography>

                    <Typography>
                      Date: {convertMongoDateToSimpleDate(transaction.date)}
                    </Typography>
                    <Typography>Label: {transaction.label || ""}</Typography>
                    <Typography>
                      Details: {transaction.details || ""}
                    </Typography>
                    <Typography>Amount: {transaction.amount || ""}</Typography>
                  </CardBody>
                </Card>
              )}
              {/* <div className=" flex md:justify-center lg:justify-center my-5 ">
                <StautsUpdateBtn
                  updateStatus={"loan_desp"}
                  cusId={cusId}
                  currentStatus={userStatus}
                />
              </div>{" "} */}
            </>
          ) : (
            <FormLoadingComp />
          )}
        </div>
      </section>
      <ToastComp />
    </Sidebar>
  );
}

export default CustomerLoanDesp;
