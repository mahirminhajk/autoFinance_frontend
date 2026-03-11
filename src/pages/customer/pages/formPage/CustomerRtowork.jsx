import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Checkbox, Button, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
//* comp
import Sidebar from "../../../../components/sidebar/Sidebar";
import axiosapi from "../../../../helpers/axiosapi";
import // statusChecker,
// StatusCheckerRender,
"../../../../helpers/StatusHelper";
// import StautsUpdateBtn from "../../../../components/formComponents/StautsUpdateBtn";
import Tabbar from "./components/Tabbar";
import FormSubHeading from "../../../../components/formComponents/FormSubHeading";
import FormLoadingComp from "../../../../components/formComponents/FormLoadingComp";
import {
  ToastComp,
  toastError,
  toastSuccess,
} from "../../../../helpers/ToastHelper";
import MessageBtn from "../../../../components/messageButton/MessageBtn";

// const requiredStatus = "conform";
const templateInfo = [
  {
    templateName: "rto_work",
    btnLable: "send customer rto work confirm message",
    send: false,
  },
];

function CustomerRtowork() {
  const cusId = useParams().cusid;
  const [loading, setLoading] = useState(false);
  // const [statusCheck, setStatusCheck] = useState(true);
  // const [userStatus, setUserStatus] = useState(null);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      rtoOfficePlace: "",
      rtoPaperCheck: false,
      origialRc: false,
      loginAddressProof: false,
      mobileNo: "",
      insuranceCopy: false,
      bankPaper: false,
      signLetter: false,
      pollution: false,
      workDetailsApprovedByHR: false,
      workDetailsApprovedByAdmin: false,

      agentName: "",
      customerName: "",
      dealerName: "",
      advanceAmount: 0,
      date: "",
      vehicleNo: "",
      challanReport: false,
      challanReportSendToManager: false,
      rcVerification: false,
      customerCallToInformAboutOtp: false,

      rcChangeParivahanSite: false,
      insuranceChanged: false,

      rcRecivedToCustomer: false,
      checkRcDetailsAndConfirm: false,
      rcDeliveredConfirm: false,
      requestNewRcPhoto: false,
      sendRcPhotoToManager: false,
    },
  });

  const parseBoolean = (value) => {
    if (value === true) return true;
    if (value === false) return false;
    if (value === "true") return true;
    if (value === "false") return false;
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // const statusRes = await axiosapi.get(`/cus/${cusId}/status`);
      // const checker = statusChecker(requiredStatus, statusRes.data.status);
      // console.log(checker);
      // setUserStatus(statusRes.data.status);
      // setStatusCheck(checker);
      // if (checker === false) return;

      await axiosapi
        .get(`/cus/${cusId}/rtowork`)
        .then((res) => {
          const fetchData = res.data.rtoWork;
          if (fetchData !== false) {
            Object.keys(fetchData).forEach((key) => {
              if (
                key === "rtoOfficePlace" ||
                key === "mobileNo" ||
                key === "agentName" ||
                key === "customerName" ||
                key === "dealerName" ||
                key === "vehicleNo" ||
                key === "advanceAmount" ||
                key === "date"
              )
                setValue(key, fetchData[key]);
              else setValue(key, parseBoolean(fetchData[key]));
            });
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };

    fetchData();
  }, []);

  const uploadData = async (data) => {
    try {
      setLoading(true);
      await axiosapi.patch(`/cus/${cusId}/rtowork`, data).then((res) => {
        //* toast
        toastSuccess("RTO Work Updated Successfully");
      });
    } catch (err) {
      toastError("Something went wrong");
    }
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
          <FormSubHeading subheading="RTO" />

          {!loading ? (
            <>
              <form
                onSubmit={handleSubmit(uploadData)}
                className="mt-5 my-auto mx-auto"
              >
                <div className="grid grid-cols lg:grid-cols-2 md:grid-cols-2 ">
                  <div className="mt-0">
                    <Typography className="text-sm lg:text-base font-semibold">
                      RTO Work
                    </Typography>
                    <div className="grid grid-cols lg:grid-cols-1 gap-3 lg:gap-5 mt-5 mx-5 lg:mx-10 lg:text-base md:text-sm text-xs mr-72 md:mx-10">
                      <Input
                        type="text"
                        label="RTO office place"
                        {...register("rtoOfficePlace")}
                      />
                      <Checkbox
                        label="RTO paper check"
                        {...register("rtoPaperCheck")}
                      />
                      <Checkbox label="Origial Rc" {...register("origialRc")} />
                      <Checkbox
                        label="Login address proof"
                        {...register("loginAddressProof")}
                      />
                      <Input
                        type="text"
                        label="Mobile number"
                        {...register("mobileNo")}
                      />
                      <Checkbox
                        label="Insurance copy"
                        {...register("insuranceCopy")}
                      />
                      <Checkbox
                        label="Bank paper(HP34)"
                        {...register("bankPaper")}
                      />
                      <Checkbox
                        label="Sign letter"
                        {...register("signLetter")}
                      />
                      <Checkbox label="Pollution" {...register("pollution")} />
                      <Checkbox
                        label="Approved by HR"
                        {...register("workDetailsApprovedByHR")}
                      />
                      <Checkbox
                        label="Approved by admin"
                        {...register("workDetailsApprovedByAdmin")}
                      />
                    </div>
                  </div>

                  <div className="mt-5 lg:mt-0">
                    <Typography className="text-sm lg:text-base font-semibold">
                      Ready To RTO Work
                    </Typography>
                    <div className="grid grid-cols lg:grid-cols-1 gap-3 lg:gap-5 mt-5 mx-5 lg:mx-10 lg:text-base md:text-sm text-xs mr-72 md:mx-10 ">
                      <Input
                        type="text"
                        label="Agent name"
                        {...register("agentName")}
                      />
                      <Input
                        type="text"
                        label="Customer name"
                        {...register("customerName")}
                      />
                      <Input
                        type="text"
                        label="Dealer name"
                        {...register("dealerName")}
                      />
                      <Input
                        variant="static"
                        type="number"
                        label="Advance amount"
                        min={0}
                        {...register("advanceAmount")}
                      />
                      <Input type="date" label="Date" {...register("date")} />
                      <Input
                        type="text"
                        label="Vehicle number:"
                        {...register("vehicleNo")}
                      />
                      <Checkbox
                        label="Challan report"
                        {...register("challanReport")}
                      />
                      <Checkbox
                        label="Challan report send to manager"
                        {...register("challanReportSendToManager")}
                      />
                      <Checkbox
                        label="RC verification"
                        {...register("rcVerification")}
                      />
                      <Checkbox
                        label="Customer call to inform (OTP from parivahan)"
                        {...register("customerCallToInformAboutOtp")}
                      />
                    </div>
                    <div className=" flex lg:justify-center">
                      {/* <MessageBtn /> */}
                    </div>
                  </div>

                  <div className="mt-5 ">
                    <Typography className="text-sm lg:text-base font-semibold">
                      After 1 Week Customer Call
                    </Typography>
                    <div className="grid grid-cols lg:grid-cols-1 gap-3 lg:gap-5 mt-5 mx-5 lg:mx-10 lg:text-base md:text-sm text-xs">
                      <Checkbox
                        label="RC change parivahan site"
                        {...register("rcChangeParivahanSite")}
                      />

                      <Checkbox
                        label="Insurance changed (call the customer for enquiry)"
                        {...register("insuranceChanged")}
                      />
                    </div>
                  </div>

                  <div className="mt-5 ">
                    <Typography className="text-sm lg:text-base font-semibold">
                      After 15 Days Customer Call
                    </Typography>
                    <div className="grid grid-cols lg:grid-cols-1 gap-3 lg:gap-5 mt-5 mx-5 lg:mx-10 lg:text-base md:text-sm text-xs">
                      <Checkbox
                        label="RC recived to customer"
                        {...register("rcRecivedToCustomer")}
                      />
                      <Checkbox
                        label="Check RC details and confirm"
                        {...register("checkRcDetailsAndConfirm")}
                      />
                      <Checkbox
                        label="RC delivered confirm"
                        {...register("rcDeliveredConfirm")}
                      />
                      <Checkbox
                        label="Request new RC photo"
                        {...register("requestNewRcPhoto")}
                      />
                      <Checkbox
                        label="Send RC photo to manager & dealer"
                        {...register("sendRcPhotoToManager")}
                      />
                    </div>
                  </div>
                </div>
                <div className=" flex lg:justify-center">
                  <MessageBtn cusId={cusId} templateInfo={templateInfo} />
                </div>
                <div className=" flex md:justify-center lg:justify-center my-5 ">
                  <Button size="sm" color="green" type="submit">
                    Update
                  </Button>
                </div>
              </form>
              {/* <div className=" flex md:justify-center lg:justify-center my-5 ">
                <StautsUpdateBtn
                  updateStatus={"rto_work"}
                  cusId={cusId}
                  currentStatus={userStatus}
                />
              </div> */}
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

export default CustomerRtowork;
