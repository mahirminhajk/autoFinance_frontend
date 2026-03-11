import { useEffect, useState } from "react";
import Sidebar from "../../../../components/sidebar/Sidebar";
import { useParams } from "react-router-dom";
import {
  Input,
  Checkbox,
  Button,
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

function CustomerBankForm() {
  const cusId = useParams().cusid;
  const [loading, setLoading] = useState(false);

  //* bank data
  const [bankData, setBankData] = useState({});
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState(undefined);

  const { register, handleSubmit, setValue, watch, control } = useForm({
    defaultValues: {
      //   Vehicle_Location: "",
      //   Vehicle_Holder_Name: "",
      //   Vehicle_Holder_Number: "",
      Company_Name: "",
      // Vehicle_Photo_Take_After_Report: false,
      Amount: "",
      Valuation_Amount: "",
      //   Post_Approvel_Pending: false,
    },
  });
  //* form hook watch
  // const VPTARCheckbox = watch("Vehicle_Photo_Take_After_Report");
  // const PAPCheckbox = watch("Post_Approvel_Pending");
  // const managerCallCheckbox = watch("managerCall");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const bankRes = await axiosapi.get("bank?forOption=true");
        setBanks(bankRes.data);
        const response = await axiosapi.get(`/cus/${cusId}/bank`);
        const data = response.data.ftr;
        const resBankData = response.data.bank;
        setBankData(resBankData);
        if (data) {
          Object.keys(data).forEach((key) => {
            if (key === "Status" || key === "FTR" || key === "FI")
              setValue(key, `${data[key]}`);
            else setValue(key, data[key]);
          });
        }
        //* set the bank data
        if (resBankData) {
          Object.keys(resBankData).forEach((key) => {
            setValue(key, resBankData[key]);
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

  const parseBoolean = (value) => value === true || value === "true";

  useEffect(() => {
    //* set select bank default form customer
    const setDefaultBank = () => {
      if (banks.length > 0) {
        const selectBank = banks.find((bank) => bank._id === bankData?.bank);
        if (selectBank) {
          const employee = selectBank.employees || [];
          const employeesArray = employee.filter(
            (emp) => emp.role === "Employee"
          );
          const managerArray = employee.filter((emp) => emp.role === "Manager");
          selectBank.employees = employeesArray;
          selectBank.managers = managerArray;
          setSelectedBank(selectBank);
        }
      }
    };
    setDefaultBank();
  }, [bankData]);

  const uploadData = async (data) => {
    console.log("datatatata", data);
    
    setLoading(true);
    const keysToMoveToBank = [
      "bank",
      "executive",
      "manager",
      // "method",
      // "policy",
      "valuationDetails",
      // "customerVehicleLocation",
      "dealerName",
      // "oldOwnerPhoneNumber",
      // "managerCall",
    ];
    const bankData = {};
    keysToMoveToBank.forEach((key) => {
      if (key in data) {
        bankData[key] = data[key];
        delete data[key];
      }
    });
    //* assign the bankData to data;
    data.bank = bankData;
    //* upload
    await axiosapi
      .patch(`/cus/${cusId}/bank`, data)
      .then((res) => {
        //* Toast
        toastSuccess("Bank Updated Successfully");
      })
      .catch((err) => {
        console.log(err);
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
                    <FormSubHeading subheading="Bank Details" />
                    <div className="grid grid-cols lg:grid-cols-1 gap-5 mt-5 mr-72 md:mx-10 lg:mx-10 ">
                      <Controller
                        name="bank"
                        control={control}
                        defaultValue={bankData?.bank}
                        render={({ field }) => (
                          <Select
                            label="Select Bank"
                            {...field}
                            onChange={(e) => {
                              const selectBankId = e;
                              const selectBank = banks.find(
                                (bank) => bank._id === selectBankId
                              );
                              if (selectBank) {
                                setValue("executive", undefined);
                                setValue("manager", undefined);
                                const employee = selectBank.employees || [];
                                const employeesArray = employee.filter(
                                  (emp) => emp.role === "Employee"
                                );
                                const managerArray = employee.filter(
                                  (emp) => emp.role === "Manager"
                                );
                                selectBank.employees = employeesArray;
                                selectBank.managers = managerArray;

                                setSelectedBank(selectBank);
                              }
                              field.onChange(selectBankId);
                            }}
                          >
                            {banks.map((bank, index) => (
                              <Option key={index} value={bank._id}>
                                {`${bank.bankName} - ${bank.branch}`.toUpperCase()}
                              </Option>
                            ))}
                          </Select>
                        )}
                      />

                      {selectedBank !== undefined && (
                        <>
                          <div>
                            <Controller
                              name="manager"
                              control={control}
                              defaultValue={(
                                bankData?.manager ?? ""
                              ).toString()}
                              render={({ field }) => (
                                <Select {...field} label="Select Manager">
                                  {selectedBank?.managers?.map(
                                    (employee, i) => (
                                      <Option key={i} value={employee.name}>
                                        {employee.name}
                                      </Option>
                                    )
                                  )}
                                </Select>
                              )}
                            />
                          </div>
                          <div>
                            <Controller
                              name="executive"
                              control={control}
                              defaultValue={(
                                bankData?.executive ?? ""
                              ).toString()}
                              render={({ field }) => (
                                <Select {...field} label="Select Executive">
                                  {selectedBank?.employees?.map(
                                    (employee, index) => (
                                      <Option key={index} value={employee.name}>
                                        {employee.name}
                                      </Option>
                                    )
                                  )}
                                </Select>
                              )}
                            />
                          </div>
                          <div>
                            <Input
                              type="text"
                              label="Branch"
                              value={selectedBank?.branch || "----"}
                              disabled
                            />
                          </div>
                          <div>
                            <Input
                              type="text"
                              label="IFSC"
                              value={selectedBank?.ifsc || "----"}
                              disabled
                            />
                          </div>
                          <div>
                            <Input
                              type="text"
                              label="Address"
                              value={selectedBank?.address || "----"}
                              disabled
                            />
                          </div>
                        </>
                      )}

                      <Controller
                        name="valuationDetails"
                        control={control}
                        defaultValue={bankData?.valuationDetails}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            label="Valuation Details"
                          />
                        )}
                      />
                      {/* <Controller
                        name="customerVehicleLocation"
                        control={control}
                        defaultValue={bankData?.customerVehicleLocation}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            label="Customer Vehicle Location"
                          />
                        )}
                      /> */}
                      <Controller
                        name="dealerName"
                        control={control}
                        defaultValue={bankData?.dealerName}
                        render={({ field }) => (
                          <Input {...field} type="text" label="Dealer Name" />
                        )}
                      />

                      {/* <Controller
                        name="oldOwnerPhoneNumber"
                        control={control}
                        defaultValue={bankData?.oldOwnerPhoneNumber}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            label="Old Owner Phone Number"
                          />
                        )}
                      /> */}
                      {/* <Controller
                        name="method"
                        control={control}
                        defaultValue={bankData?.method}
                        render={({ field }) => (
                          <Input {...field} type="text" label="Method" />
                        )}
                      /> */}

                      {/* <Controller
                        name="policy"
                        control={control}
                        defaultValue={bankData?.policy}
                        render={({ field }) => (
                          <Input {...field} type="text" label="Policy" />
                        )}
                      /> */}

                      {/* <Checkbox
                        label="Manager Call"
                        {...register("managerCall")}
                        checked={managerCallCheckbox}
                      /> */}
                    </div>
                  </div>

                  <div className="mt-5">
                    <FormSubHeading subheading="Valuation" />

                    <div className="grid grid-cols lg:grid-cols-1 gap-5 mt-5 mx-5 mr-72 md:mx-10 lg:mx-10">
                      {/* <Input
                        label="Vehicle Location"
                        {...register("Vehicle_Location")}
                      /> */}

                      {/* <Input
                        label="Vehicle Holder Name"
                        {...register("Vehicle_Holder_Name")}
                      /> */}

                      {/* <Input
                        label="Vehicle Holder Number"
                        {...register("Vehicle_Holder_Number")}
                      /> */}

                      <Input
                        label="Company name"
                        {...register("Company_Name")}
                      />

                      <Input label="Amount" {...register("Amount")} />

                      <Input
                        label="Valuation amount"
                        {...register("Valuation_Amount")}
                      />

                      {/* <div className="grid grid-rows lg:text-base md:text-sm text-xs">
                        <Checkbox
                          label="Vehicle Photo Take After Report"
                          {...register("Vehicle_Photo_Take_After_Report")}
                          checked={VPTARCheckbox}
                        /> */}

                      {/* <Checkbox
                          label="Post Approvel Pending"
                          {...register("Post_Approvel_Pending")}
                          checked={PAPCheckbox}
                        /> */}
                      {/* </div> */}
                    </div>
                  </div>
                </div>

                <div className=" flex md:justify-center lg:justify-center my-5 ">
                  <Button size="sm" color="green" type="submit">
                    Update
                  </Button>
                </div>
              </form>
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

export default CustomerBankForm;
