import { useEffect, useState } from "react";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { Button, Checkbox } from "@material-tailwind/react";
import axiosapi from "../../../../helpers/axiosapi";
import { useParams } from "react-router-dom";
import {
  // StatusCheckerRender,
  statusChecker,
} from "../../../../helpers/StatusHelper";
// import StautsUpdateBtn from "../../../../components/formComponents/StautsUpdateBtn";
import Tabbar from "./components/Tabbar";
import FormSubHeading from "../../../../components/formComponents/FormSubHeading";
import FormLoadingComp from "../../../../components/formComponents/FormLoadingComp";
import { ToastComp, toastSuccess } from "../../../../helpers/ToastHelper";
import MessageBtn from "../../../../components/messageButton/MessageBtn";

const requiredStatus = "ready_login";

const templateInfo = [
  {
    templateName: "logged",
    btnLable: "send logged message",
    send: false,
  },
];

function CustomerLoginForm() {
  const cusId = useParams().cusid;

  const [login, setLogin] = useState(false);
  // const [statusCheck, setStatusCheck] = useState(true);
  // const [userStatus, setUserStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const statusRes = await axiosapi.get(`/cus/${cusId}/status`);
        const checker = statusChecker(requiredStatus, statusRes.data.status);
        // setUserStatus(statusRes.data.status);
        // setStatusCheck(checker);
        // if (checker === false) return;

        const response = await axiosapi.get(`/cus/${cusId}/login`);
        if (
          response.data &&
          response.data.login &&
          response.data.login.loginStatus !== undefined
        ) {
          setLogin(response.data.login.loginStatus);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleCheckbox = (e) => {
    setLogin(e.target.checked);
  };

  const uploadData = async () => {
    setLoading(true);
    await axiosapi.patch(`/cus/${cusId}/login`, { login }).then((res) => {
      //* toast
      toastSuccess(`Login status updated`);
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
          <FormSubHeading subheading="Login" />

          {!loading ? (
            <>
              <div className="mt-6 my-auto mx-auto lg:text-base md:text-sm text-xs">
                <Checkbox
                  label="Login"
                  checked={login}
                  onChange={(e) => handleCheckbox(e)}
                />
              </div>
              <div className="grid grid-rows lg:justify-center gap-5 my-5">
                <div className=" flex lg:justify-center">
                  <MessageBtn cusId={cusId} templateInfo={templateInfo} />
                </div>
                <div className=" flex lg:justify-center">
                  <Button
                    size="sm"
                    type="submit"
                    color="green"
                    onClick={uploadData}
                  >
                    Update
                  </Button>
                </div>
              </div>
              {/* <div className=" flex lg:justify-center my-5">
                <StautsUpdateBtn
                  updateStatus={"login"}
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

export default CustomerLoginForm;
