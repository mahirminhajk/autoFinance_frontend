import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import axiosapi from "../../../../helpers/axiosapi";
import { RiWhatsappFill as WhatsappIcon } from "react-icons/ri";
//*comp
import Sidebar from "../../../../components/sidebar/Sidebar";
import {
  Input,
  Select,
  Option,
  Typography,
  Button,
} from "@material-tailwind/react";
import Tabbar from "./components/Tabbar";
import FormSubHeading from "../../../../components/formComponents/FormSubHeading";
import FormLoadingComp from "../../../../components/formComponents/FormLoadingComp";
import { convertMongoDateToInputDate } from "../../../../helpers/dateConverter";
import {
  ToastComp,
  toastError,
  toastSuccess,
} from "../../../../helpers/ToastHelper";
import MessageBtn from "../../../../components/messageButton/MessageBtn";
import MessageTextarea from "../../../../components/messageTextarea/MessageTextarea";
import HookCheckboxMaterial from "../../../../components/formComponents/HookCheckboxMaterial";
import DocUploadComp from "../../../../components/DocUploadComps/DocUploadComp";

function convertStringToSpacedWords(str) {
  // Regular expression to match camelCase words
  const camelCasePattern = /([A-Z]?[a-z]+)/g;

  // Function to replace camelCase with spaced words
  const replaceWithSpacedWords = (match) =>
    match.replace(
      camelCasePattern,
      (x) => ` ${x.charAt(0).toUpperCase()}${x.slice(1).toLowerCase()}`
    );

  // Apply the replacement function with the regular expression
  return str.replace(camelCasePattern, replaceWithSpacedWords).trim(); // Trim any leading/trailing spaces
}

function createHeadValueSchema(head, values) {
  return {
    head: head,
    values: values,
  };
}

function RenderCheckboxs({
  initalCheckupArray,
  targetHead,
  register,
  surname,
}) {
  // Capitalize the first letter of each word and add space between words in targetHead
  const formattedTargetHead = convertStringToSpacedWords(targetHead);

  return (
    <>
      {initalCheckupArray?.map(
        (item) =>
          item.head === targetHead && (
            <div className="mt-5" key={targetHead}>
              <Typography className="text-sm md:text-base lg:text-lg font-semibold capitalize">
                {formattedTargetHead} {/* Use the formatted targetHead here */}
              </Typography>
              <div className="grid grid-cols lg:grid-cols-1 gap-2 mt-5 mr-72 md:mx-10 lg:mx-10">
                {item.values &&
                  Object.entries(item.values).map(([key, value]) => (
                    <HookCheckboxMaterial
                      key={key}
                      label={convertStringToSpacedWords(key)}
                      name={`${surname}_${key}`}
                      register={register}
                      defaultChecked={value}
                    />
                  ))}
              </div>
            </div>
          )
      )}
    </>
  );
}

const templateInfo = [
  {
    templateName: "set1",
    btnLable: "set 1",
    send: false,
  },
  {
    templateName: "set2",
    btnLable: "set 2",
    send: false,
  },
  {
    templateName: "set3",
    btnLable: "set 3",
    send: false,
  },
  {
    templateName: "set4",
    btnLable: "set 4",
    send: false,
  },
  {
    templateName: "set5",
    btnLable: "set 5",
    send: false,
  },
];

const rcObj = {
  docname: "RC",
  verifydoc: {
    name: false,
  },
  singleImg: false,
};

const insObj = {
  docname: "Insurance",
  verifydoc: {
    name: false,
  },
  singleImg: false,
};

function GeneralForm() {
  const cusId = useParams().cusid;

  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(false);
  const [dealers, setDealers] = useState([]);
  const [selectedDealerPhoneNo, setSelectedDealerPhoneNo] = useState(undefined);
  // const [banks, setBanks] = useState([]);
  // const [selectedBank, setSelectedBank] = useState(undefined);

  //* check box data
  const [initalCheckupData, setInitalCheckupData] = useState(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  useEffect(() => {
    const fetchCustomerDataAndOptions = async () => {
      try {
        setLoading(true);
        //* customer data
        const res = await axiosapi.get(`/cus/${cusId}/general`);
        setCustomerData(res.data);
        setInitalCheckupData(res.data.initalCheckup);
        //* dealer options
        const dealersRes = await axiosapi.get("dealer");
        setDealers(dealersRes.data);
        //* set selected dealer phoneNO
        const selectedDealer = dealersRes.data.find(
          (dealer) => dealer._id === res.data.dealer
        );
        if (selectedDealer) {
          setSelectedDealerPhoneNo(selectedDealer.phoneNo);
        }
        //* bank options
        // const bankRes = await axiosapi.get("bank?forOption=true");
        // setBanks(bankRes.data);
      } catch (err) {
        toastError(`${err.message}, Please try again`);
      }
      setLoading(false);
    };
    fetchCustomerDataAndOptions();
  }, []);

  // useEffect(() => {
  //   //* set select bank default form customer
  //   const setDefaultBank = () => {
  //     if (banks.length > 0) {
  //       const selectBank = banks.find(
  //         (bank) => bank._id === customerData?.bank
  //       );
  //       if (selectBank) {
  //         const employee = selectBank.employees || [];
  //         const employeesArray = employee.filter(
  //           (emp) => emp.role === "Employee"
  //         );
  //         const managerArray = employee.filter((emp) => emp.role === "Manager");
  //         selectBank.employees = employeesArray;
  //         selectBank.managers = managerArray;
  //         console.log("selectBank: ", selectBank);
  //         // setSelectedBank(selectBank);
  //       }
  //     }
  //   };
  //   setDefaultBank();
  // }, [banks]);

  const submitData = async (data) => {
    try {
      setLoading(true);
      //* remove undefined fields
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );

      const initalCheckup = [];
      const CollectRequiredDocumentsValue = {};
      const coApplicantProofValue = {};
      const bankCheckupValue = {};
      const rcCheckupValue = {};
      const insuranceCheckupValue = {};
      const headInfo = {
        ch1: "Collect required documents",
        ch2: "Co-Applicant Proof",
        ch3: "Bank checkup",
        ch4: "RC checkup",
        ch5: "Insurance checkup",
      };

      Object.keys(filteredData).forEach((key) => {
        if (key.includes("ch1")) {
          //* remove ch1_ from the key
          const newKey = key.replace("ch1_", "");
          CollectRequiredDocumentsValue[newKey] = data[key];
          //* delete the key from filteredData
          delete filteredData[key];
        } else if (key.includes("ch2")) {
          //* remove ch2_ from the key
          const newKey = key.replace("ch2_", "");
          coApplicantProofValue[newKey] = data[key];
          //* delete the key from filteredData
          delete filteredData[key];
        } else if (key.includes("ch3")) {
          //* remove ch3_ from the key
          const newKey = key.replace("ch3_", "");
          bankCheckupValue[newKey] = data[key];
          //* delete the key from filteredData
          delete filteredData[key];
        } else if (key.includes("ch4")) {
          //* remove ch4_ from the key
          const newKey = key.replace("ch4_", "");
          rcCheckupValue[newKey] = data[key];
          //* delete the key from filteredData
          delete filteredData[key];
        } else if (key.includes("ch5")) {
          //* remove ch5_ from the key
          const newKey = key.replace("ch5_", "");
          insuranceCheckupValue[newKey] = data[key];
          //* delete the key from filteredData
          delete filteredData[key];
        }
      });

      initalCheckup.push(
        createHeadValueSchema(headInfo.ch1, CollectRequiredDocumentsValue),
        createHeadValueSchema(headInfo.ch2, coApplicantProofValue),
        createHeadValueSchema(headInfo.ch3, bankCheckupValue),
        createHeadValueSchema(headInfo.ch4, rcCheckupValue),
        createHeadValueSchema(headInfo.ch5, insuranceCheckupValue)
      );

      //* set initalCheckup to filteredData
      filteredData.initalCheckup = initalCheckup;

      //* set car
      if (filteredData.carName !== undefined) {
        filteredData.car = {
          carName: filteredData.carName,
        };
        delete filteredData.carName;
      }
      if (filteredData.model !== undefined) {
        filteredData.car = {
          ...filteredData.car,
          model: filteredData.model,
        };
        delete filteredData.model;
      }
      if (filteredData.regNo !== undefined) {
        filteredData.car = {
          ...filteredData.car,
          regNo: filteredData.regNo,
        };
        delete filteredData.regNo;
      }
      if (filteredData.km !== undefined) {
        filteredData.car = {
          ...filteredData.car,
          km: filteredData.km,
        };
        delete filteredData.km;
      }
      if (filteredData.vehicleLocation !== undefined) {
        filteredData.car = {
          ...filteredData.car,
          vehicleLocation: filteredData.vehicleLocation,
        };
        delete filteredData.vehicleLocation;
      }
      if (filteredData.ownership !== undefined) {
        filteredData.car = {
          ...filteredData.car,
          ownership: filteredData.ownership,
        };
        delete filteredData.ownership;
      }
      //* give car value
      if (filteredData.car !== undefined) {
        if (filteredData.car.carName === undefined) {
          filteredData.car.carName = customerData?.carName;
        }
        if (filteredData.car.model === undefined) {
          filteredData.car.model = customerData?.model;
        }
        if (filteredData.car.regNo === undefined) {
          filteredData.car.regNo = customerData?.regNo;
        }
        if (filteredData.car.km === undefined) {
          filteredData.car.km = customerData?.km;
        }
        if (filteredData.car.vehicleLocation === undefined) {
          filteredData.car.vehicleLocation = customerData?.vehicleLocation;
        }
        if (filteredData.car.ownership === undefined) {
          filteredData.car.ownership = customerData?.ownership;
        }
      }

      const res = await axiosapi.patch(`/cus/${cusId}/general`, filteredData);
      if (res.data) {
        toastSuccess(`${res.data.name} Customer Updated Successfully`);
      }
    } catch (err) {
      console.log(err);
      toastError(`${err.message}, Please try again`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sidebar>
      <div className="m-auto">
        <Tabbar cusid={cusId} />

        <section>
          <div className="_form-container mx-10 w-auto mt-5">
            <FormSubHeading subheading="Update General Details" />
            {!loading ? (
              <form
                onSubmit={handleSubmit(submitData)}
                className="mt-5 my-auto mx-auto"
              >
                <Typography className="text-sm md:text-base lg:text-lg font-semibold">
                  Personal Details
                </Typography>
                <div className="grid grid-cols lg:grid-cols-2 md:grid-cols-2 gap-5 mt-5 mr-72 md:mx-10 lg:mx-10">
                  <Controller
                    name="firstName"
                    control={control}
                    defaultValue={customerData?.firstName}
                    render={({ field }) => (
                      <Input
                        {...field}
                        label="First Name"
                        error={errors.firstName ? true : false}
                        type="text"
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    defaultValue={customerData?.lastName}
                    render={({ field }) => (
                      <Input {...field} type="text" label="Last Name" />
                    )}
                  />
                  <Controller
                    name="phoneNo"
                    control={control}
                    defaultValue={customerData?.phoneNo}
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="text"
                        label="Phone No. with +91..."
                      />
                    )}
                  />
                  <Controller
                    name="email"
                    control={control}
                    defaultValue={customerData?.email}
                    render={({ field }) => (
                      <Input {...field} label="Email" type="email" />
                    )}
                  />
                  {/**Dealer */}
                  <Controller
                    name="dealer"
                    control={control}
                    defaultValue={customerData?.dealer}
                    render={({ field }) => (
                      <Select
                        {...field}
                        onChange={(e) => {
                          const selectDealerId = e;
                          //* find the dealer phone no
                          const selectDealer = dealers.find(
                            (dealer) => dealer._id === selectDealerId
                          );
                          if (selectDealer) {
                            setSelectedDealerPhoneNo(selectDealer.phoneNo);
                          }
                          field.onChange(selectDealerId);
                        }}
                      >
                        {dealers.map((dealer, index) => (
                          <Option key={index} value={dealer._id}>
                            {dealer.name} -{" "}
                            {dealer.shopname !== ""
                              ? dealer.shopname
                              : dealer.place}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                  {selectedDealerPhoneNo && (
                    <span>
                      <Link
                        to={`https://wa.me/${selectedDealerPhoneNo}`}
                        target="_blank"
                        className="flex flex-row items-center space-x-2"
                      >
                        <WhatsappIcon size={24} color="green" />
                        <p>send direct whatsapp message to the dealer</p>
                      </Link>
                    </span>
                  )}
                  {/* {customerData?.status &&
                    ![
                      "pending",
                      "unconform1",
                      "unconform2",
                      "unconform3",
                      "conform",
                    ].includes(customerData?.status) ? (
                    <Input
                      type="text"
                      value={customerData?.status
                        ?.replaceAll("_", " ")
                        .toUpperCase()}
                      disabled
                    />
                  ) : (
                    <Controller
                      name="status"
                      control={control}
                      defaultValue={customerData?.status}
                      render={({ field }) => (
                        <Select label="Status" {...field}>
                          <Option value="pending">Pending</Option>
                          <Option value="unconform1">Login</Option>
                          <Option value="unconform2">Pending Documents</Option>
                          <Option value="unconform3">Reject</Option>
                          <Option value="conform">Conform</Option>
                        </Select>
                      )}
                    />
                  )} */}
                </div>
                <MessageBtn cusId={cusId} templateInfo={templateInfo} />

                <div className="grid grid-cols lg:grid-cols-2 md:grid-cols-2 ">
                  <RenderCheckboxs
                    initalCheckupArray={initalCheckupData}
                    targetHead="Collect required documents"
                    register={register}
                    surname="ch1"
                  />

                  <RenderCheckboxs
                    initalCheckupArray={initalCheckupData}
                    targetHead="Co-Applicant Proof"
                    register={register}
                    surname="ch2"
                  />
                  <div className="mt-5">
                    <Typography className="text-sm md:text-base lg:text-lg font-semibold">
                      Car details
                    </Typography>

                    <div className="grid grid-cols lg:grid-cols-1 gap-5 mt-5 mr-72 md:mx-10 lg:mx-10">
                      <Controller
                        name="carName"
                        control={control}
                        defaultValue={customerData?.carName}
                        render={({ field }) => (
                          <Input {...field} type="text" label="Car Name" />
                        )}
                      />

                      <Controller
                        name="model"
                        control={control}
                        defaultValue={customerData?.model}
                        render={({ field }) => (
                          <Input {...field} type="text" label="Model" />
                        )}
                      />

                      <Controller
                        name="regNo"
                        control={control}
                        defaultValue={customerData?.regNo}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            label="Register Number"
                          />
                        )}
                      />
                      <Controller
                        name="km"
                        control={control}
                        defaultValue={customerData?.km}
                        render={({ field }) => (
                          <Input {...field} type="text" label="KM" />
                        )}
                      />

                      <Controller
                        name="vehicleLocation"
                        control={control}
                        defaultValue={customerData?.vehicleLocation}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            label="Vehicle Location"
                          />
                        )}
                      />

                      <Controller
                        name="ownership"
                        control={control}
                        defaultValue={customerData?.ownership}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="number"
                            min={0}
                            max={9}
                            label="Ownership"
                          />
                        )}
                      />

                      <Controller
                        name="insuranceDate"
                        control={control}
                        defaultValue={convertMongoDateToInputDate(
                          customerData?.insuranceDate
                        )}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="date"
                            label="Insurance Validity Date"
                          />
                        )}
                      />

                      <Controller
                        name="insuranceType"
                        control={control}
                        defaultValue={customerData?.insuranceType}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            label="Insurance Full / Third"
                          />
                        )}
                      />
                    </div>
                  </div>

                  {/* <div className="mt-5">
                    <Typography className="text-sm md:text-base lg:text-lg font-semibold">
                      Bank Details
                    </Typography>
                    <div className="grid grid-cols lg:grid-cols-1 gap-5 mt-5 mr-72 md:mx-10 lg:mx-10 ">
                      <Controller
                        name="bank"
                        control={control}
                        defaultValue={customerData?.bank}
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
                                const employee = selectBank.employees || [];
                                const employeesArray = employee.filter(
                                  (emp) => emp.role === "Employee"
                                );
                                const managerArray = employee.filter(
                                  (emp) => emp.role === "Manager"
                                );
                                selectBank.employees = employeesArray;
                                selectBank.managers = managerArray;
                                console.log("selectBank: ", selectBank);
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
                                customerData?.manager ?? ""
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
                                customerData?.executive ?? ""
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
                        defaultValue={customerData?.valuationDetails}
                        render={({ field }) => (
                          <Input
                            {...field}
                            type="text"
                            label="Valuation Details"
                          />
                        )}
                      />

                      <Controller
                        name="method"
                        control={control}
                        defaultValue={customerData?.method}
                        render={({ field }) => (
                          <Input {...field} type="text" label="Method" />
                        )}
                      />

                      <Controller
                        name="policy"
                        control={control}
                        defaultValue={customerData?.policy}
                        render={({ field }) => (
                          <Input {...field} type="text" label="Policy" />
                        )}
                      />

                      
                    </div>
                  </div> */}

                  {/* remove this */}
                  <div className="hidden">
                    <RenderCheckboxs
                      initalCheckupArray={initalCheckupData}
                      targetHead="Bank checkup"
                      register={register}
                      surname="ch3"
                    />
                  </div>

                  <div></div>

                  <div>
                    <DocUploadComp cusId={cusId} docObj={rcObj} />
                  </div>
                  <RenderCheckboxs
                    initalCheckupArray={initalCheckupData}
                    targetHead="RC checkup"
                    register={register}
                    surname="ch4"
                  />
                  <div>
                    {" "}
                    <DocUploadComp cusId={cusId} docObj={insObj} />
                  </div>
                  <RenderCheckboxs
                    initalCheckupArray={initalCheckupData}
                    targetHead="Insurance checkup"
                    register={register}
                    surname="ch5"
                  />
                </div>
                <div>
                  <MessageTextarea
                    cusid={cusId}
                    heading="Customer Messaging System"
                    textareaLabel="Provide your message here"
                    btnLabel="Send Message to Customer"
                  />
                </div>

                <div className=" flex md:justify-center lg:justify-center my-10">
                  <Button
                    size="sm"
                    type="submit"
                    color="green"
                    disabled={loading}
                  >
                    Update
                  </Button>
                </div>
              </form>
            ) : (
              <FormLoadingComp />
            )}
          </div>
        </section>
      </div>
      <ToastComp />
    </Sidebar>
  );
}

export default GeneralForm;
