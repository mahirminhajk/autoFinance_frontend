import { useEffect, useState } from "react";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { useParams } from "react-router-dom";
import {
  Input,
  Checkbox,
  Button,
  Radio,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import axiosapi from "../../../../helpers/axiosapi";
import // StatusCheckerRender,
// statusChecker,
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
// const requiredStatus = "login";

function CustomerFTR() {
  const cusId = useParams().cusid;
  const [loading, setLoading] = useState(false);
  const [cusStatus, setCusStatus] = useState(null);

  const { register, handleSubmit, setValue, watch, control } = useForm({
    defaultValues: {
      CIBIL_Score: "",
      Status: false,
      CIBIL_Reject_Reason: "",
      FTR: false,
      FTR_Pending_Reason: "",
      FI: false,
      FI_Negative_Reason: "",
      Post_Approval_Manager: false,
      Vehicle_Photo_Take_After_Report: false,
    },
  });
  //* form hook watch
  const statusRadio = watch("Status");
  const FTRRadio = watch("FTR");
  const FIRadio = watch("FI");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosapi.get(`/cus/${cusId}/ftr`);
        const data = response.data.ftr;
        const cusStatusres = response.data.status;
        setCusStatus(cusStatusres);
        setValue("status", cusStatusres);
        if (data) {
          Object.keys(data).forEach((key) => {
            if (key === "Status" || key === "FTR" || key === "FI")
              setValue(key, `${data[key]}`);
            else setValue(key, data[key]);
          });
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to parse string to boolean
  const parseBoolean = (value) => value === true || value === "true";

  const uploadData = async (data) => {
    setLoading(true);
    //* text to boolean
    data.Status = parseBoolean(data.Status);
    data.FTR = parseBoolean(data.FTR);
    data.FI = parseBoolean(data.FI);
    //* if status || FTR || FI is true remove the reason
    if (data.Status === true) data.CIBIL_Reject_Reason = "";
    if (data.FTR === true) data.FTR_Pending_Reason = "";
    if (data.FI === true) data.FI_Negative_Reason = "";

    //* upload
    await axiosapi
      .patch(`/cus/${cusId}/ftr`, data)
      .then((res) => {
        //* Toast
        toastSuccess("FTR & Bank Updated Successfully");
      })
      .catch((err) => {
        toastError("Error in updating FTR");
      });
    setLoading(false);
  };

  return (
    <Sidebar>
      <section className="m-auto">
        <Tabbar cusid={cusId} />
        <div className="_form-container mx-10 w-auto mt-5">
          {!loading ? (
            <>
              <form
                onSubmit={handleSubmit(uploadData)}
                className="mt-5 my-auto mx-auto"
              >
                <div className="grid grid-cols lg:grid-cols-2 md:grid-cols-2 ">
                  <div className="mt-5">
                    <FormSubHeading subheading="FTR" />
                    <div className="grid grid-cols lg:grid-cols-1 gap-5 mt-5 mx-5 mr-72 md:mx-10 lg:mx-10">
                      <div className="flex items-center">
                        <label className="text-sm lg:text-base">FTR:</label>
                        <div className="flex lg:text-base md:text-sm text-xs">
                          <Radio
                            label="Pending"
                            value={false}
                            {...register("FTR")}
                            defaultChecked={!FTRRadio}
                          />
                          <Radio
                            label="Forward"
                            value={true}
                            {...register("FTR")}
                            defaultChecked={FTRRadio}
                          />
                        </div>
                      </div>
                      {parseBoolean(FTRRadio) == false && (
                        <Textarea
                          size="md"
                          label="FTR Pending Reason"
                          {...register("FTR_Pending_Reason")}
                        />
                      )}

                      <div className="flex items-center">
                        <label className="text-sm lg:text-base">
                          FI Verification:
                        </label>
                        <div className="flex lg:text-base md:text-sm text-xs">
                          <Radio
                            label="Negative"
                            value={false}
                            {...register("FI")}
                            defaultChecked={!FIRadio}
                          />
                          <Radio
                            label="Positive"
                            value={true}
                            {...register("FI")}
                            defaultChecked={FIRadio}
                          />
                        </div>
                      </div>
                      {parseBoolean(FIRadio) == false && (
                        <Textarea
                          size="md"
                          label="FI Negative Reason"
                          {...register("FI_Negative_Reason")}
                        />
                      )}
                    </div>
                  </div>

                  <div className="mt-5">
                    <FormSubHeading subheading="Cibil Report" />
                    <div className="grid grid-cols lg:grid-cols-1 gap-5 mt-5 mx-5 mr-72 md:mx-10 lg:mx-10 ">
                      <Input
                        label="CIBIL Score"
                        {...register("CIBIL_Score")}
                        type="number"
                        min={0}
                      />
                      <div className="flex items-center">
                        <label className="text-sm lg:text-base">Status:</label>
                        <div className="flex lg:text-base md:text-sm text-xs">
                          <Radio
                            label="Reject"
                            value={false}
                            {...register("Status")}
                            defaultChecked={!statusRadio}
                          />
                          <Radio
                            label="Forward"
                            value={true}
                            {...register("Status")}
                            defaultChecked={statusRadio}
                          />
                        </div>
                      </div>
                      {parseBoolean(statusRadio) === false && (
                        <Textarea
                          size="md"
                          label="CIBIL Reject Reason"
                          {...register("CIBIL_Reject_Reason")}
                        />
                      )}
                      <Checkbox
                        label="Vehicle Photo take after report"
                        {...register("Vehicle_Photo_Take_After_Report")}
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <FormSubHeading subheading="Status" />
                    <div className="grid grid-cols lg:grid-cols-1 gap-5 mt-5 mx-5 mr-72 md:mx-10 lg:mx-10 ">
                      {cusStatus &&
                      ![
                        "pending",
                        "login",
                        "pending_doc",
                        "reject",
                        "conform",
                      ].includes(cusStatus) ? (
                        <Input
                          type="text"
                          value={cusStatus?.replaceAll("_", " ").toUpperCase()}
                          disabled
                        />
                      ) : (
                        <Controller
                          name="status"
                          control={control}
                          defaultValue={cusStatus}
                          render={({ field }) => (
                            <Select label="Status" {...field}>
                              <Option value="pending">Pending</Option>
                              <Option value="login">Login</Option>
                              <Option value="pending_doc">
                                Pending Documents
                              </Option>
                              <Option value="reject">Reject</Option>
                              <Option value="conform">Conform</Option>
                            </Select>
                          )}
                        />
                      )}
                      {/* pending, login, pending doc, reject, confirm */}

                      <Checkbox
                        label="Post Approval Manager"
                        {...register("Post_Approval_Manager")}
                      />
                    </div>
                  </div>
                </div>

                <div className=" flex md:justify-center lg:justify-center my-5 ">
                  <Button size="sm" color="green" type="submit">
                    Update
                  </Button>
                </div>
              </form>
              {/* <div className=" flex md:justify-center lg:justify-center my-5 ">
                <StautsUpdateBtn
                  updateStatus={"ftr"}
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

export default CustomerFTR;
