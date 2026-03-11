import { useEffect, useState } from "react";
import { Button, Checkbox, Typography } from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import axiosapi from "../../../../helpers/axiosapi";

//*comp
import Sidebar from "../../../../components/sidebar/Sidebar";
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

//* data model
const verificationData = [
  {
    head: "Passport",
    values: {
      Expiry_Date: false,
      DOB: false,
      Residance_Address: false,
      Relation_Conform: false,
    },
  },

  {
    head: "Land Tax",
    values: {
      Expiry_Date: false,
      Blood_Relation: false,
      Village: false,
      Building_Tax: false,
    },
  },
  {
    head: "Guarantor(*if the customer age less than 30  guarantor is compulsory)",
    values: {
      Guarantor_Is_Blood_Relative: false,
      Guarantor_Photo: false,
      Guarantor_Aadhaar: false,
      Guarantor_Pan: false,
    },
  },
  {
    head: "Driving Licence",
    values: {
      DOB: false,
      Sign: false,
      Expiry_Date: false,
    },
  },
  {
    head: "Check Leaf",
    values: {
      Check_LeafName: false,
      Got_Five_Check_Leafs: false,
      CTS_2010: false,
    },
  },

  {
    head: "Bank Statement",
    values: {
      Acc_No: false,
      Bank_Details: false,
      Customer_Details: false,
    },
  },

  {
    head: "Nikuthi Statement",
    values: {
      Date_Check: false,
    },
  },
  {
    head: "Current Bill",
    values: {
      Consumer_No: false,
      Registered_Mobile_Number: false,
    },
  },

  {
    head: "ATM",
    values: {
      Active: false,
    },
  },
  {
    head: "Firm Details",
    values: {
      Firm_Loan: false,
      Last_Two_Year_ITR: false,
      Computation: false,
      Balance_Sheet: false,
      Pan_Card: false,
      Last_Six_Month_Statement: false,
      Partnership_D_D: false,
      Partner_All_Pan_Card: false,
      Firm_Seal: false,
    },
  },
];

const requiredStatus = "ftr";

function CustomerVerification() {
  const cusId = useParams().cusid;
  const [data, setData] = useState(verificationData);

  const [loading, setLoading] = useState(false);

  // const [statusCheck, setStatusCheck] = useState(true);
  // const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
    const fetchVerificationData = async () => {
      setLoading(true);
      const statusRes = await axiosapi.get(`/cus/${cusId}/status`);
      const checker = statusChecker(requiredStatus, statusRes.data.status);
      // setUserStatus(statusRes.data.status);
      // setStatusCheck(checker);
      // if (checker === false) return;

      await axiosapi
        .get(`/cus/${cusId}/headvalue?field=verification`)
        .then((res) => {
          if (res.data.length > 0) {
            setData(res.data);
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    };

    fetchVerificationData();
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
    //* if the data head:Firm Details value:Firm_Loan then make sure all other value of that head is false
    const updateData = data.map((item) => {
      if (item.head === "Firm Details") {
        if (item.values.Firm_Loan === false) {
          Object.entries(item.values).map(([key, value]) => {
            if (key !== "Firm_Loan") {
              item.values[key] = false;
            }
          });
        }
      }
      return item;
    });
    setData(updateData);
    await axiosapi
      .post(`/cus/${cusId}/headvalue?field=verification`, data)
      .then((res) => {
        //* toast
        toastSuccess("Verification Details Updated");
      })
      .catch((err) => {
        //* toast
        toastError("Verification Details Not Updated");
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
      <div className="m-auto">
        <Tabbar cusid={cusId} />

        <div className="_form-container mx-10 w-auto mt-5">
          <FormSubHeading subheading="Verify Documents" />

          {!loading ? (
            <>
              <div className="grid grid-cols lg:grid-cols-3 md:grid-cols-3 gap-4 mt-2">
                {data.map((item, index) => {
                  if (item.head === "Firm Details") {
                    return (
                      <div key={index}>
                        <Typography className="text-sm lg:text-base font-semibold">
                          {item.head}
                        </Typography>
                        {Object.entries(item.values).map(([key, value]) => {
                          const convertedLabel = key.replace(/_/g, " ");
                          if (key === "Firm_Loan") {
                            return (
                              <div
                                key={key}
                                className="lg:text-base md:text-sm text-xs"
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
                          } else if (item.values.Firm_Loan === true) {
                            return (
                              <div
                                key={key}
                                className="lg:text-base md:text-sm text-xs"
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
                          }
                        })}
                      </div>
                    );
                  } else {
                    return (
                      <div key={index}>
                        <Typography className="mt-3 text-sm lg:text-base font-semibold">
                          {item.head}
                        </Typography>
                        {Object.entries(item.values).map(([key, value]) => {
                          const convertedLabel = key.replace(/_/g, " ");
                          return (
                            <div
                              key={key}
                              className="lg:text-base md:text-sm text-xs"
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
                  }
                })}
              </div>

              <div className=" flex md:justify-center lg:justify-center my-5">
                <Button
                  size="sm"
                  type="submit"
                  color="green"
                  onClick={handleUpload}
                >
                  Update
                </Button>
              </div>
              {/* <div className=" flex md:justify-center lg:justify-center my-5">
                <StautsUpdateBtn
                  updateStatus={"verification"}
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
      <ToastComp />
    </Sidebar>
  );
}

export default CustomerVerification;
