import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Button,
  Checkbox,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
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
import { ToastComp, toastSuccess } from "../../../../helpers/ToastHelper";

//* data model
const readyLoginData = [
  {
    head: "Applicant",
    values: {
      Phone_2: "",
      Date_of_birth: "",
      Father_name: "",
      Mother_name: "",
      Wife_name: "",
      House_landmark: "",
      PIN_code: "",
      Consumer_number: "",
    },
  },
  {
    head: "Co-Applicant",
    values: {
      Name: "",
      Phone: "",
      Date_of_birth: "",
      Father_name: "",
      Mother_name: "",
      Wife_name: "",
      House_landmark: "",
      PIN_code: "",
      Consumer_number: "",
    },
  },
  {
    head: "Business Details",
    values: {
      Business_type: "",
      Business_name: "",
      Office_landmark: "",
    },
  },

  {
    head: "Co-Applicant Business Details",
    values: {
      Business_type: "",
      Business_name: "",
      Office_landmark: "",
    },
  },
  {
    head: "Friend Details",
    values: {
      Name: "",
      Phone_number: "",
      Full_initial: "",
      PIN_code: "",
      Post: "",
    },
  },
  {
    head: "Relative Details",
    values: {
      Name: "",
      Phone_number: "",
      Full_initial: "",
      PIN_code: "",
      Post: "",
    },
  },
  {
    head: "Vehicle Details",
    values: {
      Vehicle_location: "",
      Vehicle_holder_name: "",
      Vehicle_holder_number: "",
    },
  },
  {
    head: "Other Details",
    values: {
      Existing_car_RC: false,
      Existing_loan: false,
      Live_loan: false,
    },
  },
  {
    head: "Extra Details",
    values: {
      Extra_details: "",
    },
  },
  {
    head: "RTO old owners",
    values: {
      Aadhar_card: false,
      Mobile_number: false,
    },
  },
 
];

const requiredStatus = "upload_docs";

function CustomerReadyLogin() {
  const cusId = useParams().cusid;
  const [data, setData] = useState(readyLoginData);
  // const [statusCheck, setStatusCheck] = useState(true);
  // const [userStatus, setUserStatus] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statusRes = await axiosapi.get(`/cus/${cusId}/status`);
        const checker = statusChecker(requiredStatus, statusRes.data.status);
        // setUserStatus(statusRes.data.status);
        // setStatusCheck(checker);
        // if (checker === false) return;

        const response = await axiosapi.get(
          `/cus/${cusId}/headvalue?field=readyLogin`
        );

        if (response.data.length > 0) {
          setData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleChange = (e, section, key) => {
    const updatedData = data.map((item) => {
      if (item.head === section) {
        item.values[key] = e.target.value;
      }
      return item;
    });
    setData(updatedData);
  };

  const handleCheckbox = (e, section, key) => {
    const updatedData = data.map((item) => {
      if (item.head === section) {
        item.values[key] = e.target.checked;
      }
      return item;
    });
    setData(updatedData);
  };

  const handleUpload = async () => {
    try {
      setLoading(true);
      const response = await axiosapi.post(
        `/cus/${cusId}/headvalue?field=readyLogin`,
        data
      );
      //* toast
      toastSuccess("Details Successfully Updated");
    } catch (error) {
      toastSuccess("Something went wrong");
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
      <div className="m-auto">
        <Tabbar cusid={cusId} />
        <div className="_form-container mx-10 w-auto mt-5">
          <FormSubHeading subheading="Ready Login" />

          {!loading ? (
            <>
              <div className=" my-auto mx-auto">
                <div className="grid grid-cols lg:grid-cols-2 md:grid-cols-2">
                  {data.map((item, index) => {
                    return (
                      <div key={index} className="mt-5">
                        <Typography className="text-sm md:text-base lg:text-lg font-semibold">
                          {item.head}
                        </Typography>
                        {Object.entries(item.values).map(([key, value]) => {
                          const convertedLabel = key.replace(/_/g, " ");
                          if (key === "Date_of_Birth") {
                            return (
                              <div
                                key={key}
                                className="mt-5 mx-5 mr-72 md:mx-10 lg:mx-10"
                              >
                                <Input
                                  type="date"
                                  value={value}
                                  onChange={(e) =>
                                    handleChange(e, item.head, key)
                                  }
                                  label={convertedLabel}
                                />
                              </div>
                            );
                          } else if (
                            item.head === "Other Details" ||
                            item.head === "Insurance checkup" ||
                            item.head === "RC checkup" ||
                            item.head === "RTO old owners"
                          ) {
                            return (
                              <div
                                key={key}
                                className=" mx-5 lg:mx-10 lg:text-base md:text-sm text-xs"
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
                          } else if (item.head === "Extra Details") {
                            return (
                              <div
                                key={key}
                                className="mt-1 mx-5 lg:mx-10 lg:text-base md:text-sm text-xs"
                              >
                                <Textarea
                                  label={convertedLabel}
                                  value={value}
                                  onChange={(e) =>
                                    handleChange(e, item.head, key)
                                  }
                                />
                              </div>
                            );
                          } else {
                            return (
                              <div
                                key={key}
                                className="mt-5 mx-5 mr-72 md:mx-10 lg:mx-10"
                              >
                                <Input
                                  type="text"
                                  value={value}
                                  onChange={(e) =>
                                    handleChange(e, item.head, key)
                                  }
                                  label={convertedLabel}
                                />
                              </div>
                            );
                          }
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className=" flex md:justify-center lg:justify-center my-5 ">
                <Button
                  size="sm"
                  type="submit"
                  color="green"
                  onClick={handleUpload}
                >
                  Update
                </Button>
              </div>
              {/* <div className=" flex md:justify-center lg:justify-center my-5 ">
                <StautsUpdateBtn
                  updateStatus={"ready_login"}
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

export default CustomerReadyLogin;
