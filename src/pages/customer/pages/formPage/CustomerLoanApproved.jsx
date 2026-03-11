import { useEffect, useState } from "react";
import Sidebar from "../../../../components/sidebar/Sidebar";
import LoanUploadComp from "./components/LoanUploadComp";
import { useParams } from "react-router-dom";
import { Button, Checkbox, Typography } from "@material-tailwind/react";
import axiosapi from "../../../../helpers/axiosapi";
import {
  // StatusCheckerRender,
  statusChecker,
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
import MessageBtn from "../../../../components/messageButton/MessageBtn";

//* data model
const loanApprovedData = [
  {
    head: "",
    values: {
      Agreement_sign: false,
      Loan_banner: false,
      Loan_chart: false,
    },
  },
  {
    head: "Loan Details Conformation Call",
    values: {
      Authorised_letter: false,
      HR_approved: false,
      Status_success: false,
      Super_admin_aproved: false,
    },
  },
  {
    head: "Old Original RC",
    values: {
      RC_verification_call: false,
      Original_RC_collected: false,
      RC_collected_NOC: false,
      To_dealer_after_RC_verification_call: false,
    },
  },
  {
    head: "Advice",
    values: {
      EMI_date_informed: false,
      Inform_about_benefits_of_paying_EMI_through_account: false,
      Take_over_benefits: false,
    },
  },
];

const requiredStatus = "verification";

const templateInfo = [
  {
    templateName: "approved",
    btnLable: "send loan approved message",
    send: false,
  },
];

function CustomerLoanApproved() {
  const cusId = useParams().cusid;
  const [data, setData] = useState(loanApprovedData);
  // const [statusCheck, setStatusCheck] = useState(true);
  // const [userStatus, setUserStatus] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLoanApprovedData = async () => {
      setLoading(true);
      const statusRes = await axiosapi.get(`/cus/${cusId}/status`);
      const checker = statusChecker(requiredStatus, statusRes.data.status);
      // setUserStatus(statusRes.data.status);
      // setStatusCheck(checker);
      // if (checker === false) return;

      await axiosapi
        .get(`/cus/${cusId}/headvalue?field=loanApproved`)
        .then((res) => {
          if (res.data.length > 0) {
            setData(res.data);
          }
        })
        .catch((err) => console.log(err));
      setLoading(false);
    };

    fetchLoanApprovedData();
  }, []);

  const handleCheckbox = (e, section, key) => {
    const updateData = data.map((item) => {
      if (item.head === section) {
        item.values[key] = e.target.checked;
      }
      return item;
    });
    setData(updateData);
  };

  const handleUpload = async () => {
    setLoading(true);
    await axiosapi
      .post(`/cus/${cusId}/headvalue?field=loanApproved`, data)
      .then((res) => {
        //* toast
        toastSuccess("Loan Approved Updated Successfully");
      })
      .catch((err) => {
        //* toast
        toastError("Loan Approved Updation Failed");
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
          <FormSubHeading subheading="Loan Approval" />

          {!loading ? (
            <>
              <div className=" my-auto mx-auto">
                <div className="grid grid-cols lg:grid-cols-2 md:grid-cols-2">
                  <LoanUploadComp cusId={cusId} />

                  <div>
                    {data.map((item, index) => {
                      return (
                        <div key={index} className="mt-5">
                          <Typography className="text-sm lg:text-base font-semibold">
                            {item.head}
                          </Typography>
                          {Object.entries(item.values).map(([key, value]) => {
                            const convertedLabel = key.replace(/_/g, " ");
                            return (
                              <div
                                key={key}
                                className="mx-10 lg:text-base md:text-sm text-xs"
                              >
                                <Checkbox
                                  label={convertedLabel}
                                  checked={value}
                                  onChange={(e) =>
                                    handleCheckbox(e, item.head, key)
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                    <div className="grid grid-rows md:justify-center lg:justify-center gap-5 my-5 ">
                      <div className=" flex lg:justify-center">
                        <MessageBtn cusId={cusId} templateInfo={templateInfo} />
                      </div>
                      <div className=" flex lg:justify-center">
                        <Button
                          size="sm"
                          type="submit"
                          color="green"
                          onClick={handleUpload}
                        >
                          Update
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className=" flex md:justify-center lg:justify-center mb-5 ">
                <StautsUpdateBtn
                  updateStatus={"loan_approved"}
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

export default CustomerLoanApproved;
