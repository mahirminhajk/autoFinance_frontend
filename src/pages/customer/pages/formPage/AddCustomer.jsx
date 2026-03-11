import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { z } from "zod";
import { Button, Typography, Breadcrumbs } from "@material-tailwind/react";
// import { zodResolver } from "@hookform/resolvers/zod";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
//*comp
import Sidebar from "../../../../components/sidebar/Sidebar";
//*helper
import axiosapi from "../../../../helpers/axiosapi";
import HookInputMaterial from "../../../../components/formComponents/HookInputMaterial";
import FormLoadingComp from "../../../../components/formComponents/FormLoadingComp";
import {
  ToastComp,
  toastError,
  toastSuccessWithRedirect,
} from "../../../../helpers/ToastHelper";
import { AiFillHome } from "react-icons/ai";
import { RiWhatsappFill as WhatsappIcon } from "react-icons/ri";
import SearchSelect from "../../../../components/formComponents/SearchSelect";
import HookCheckboxMaterial from "../../../../components/formComponents/HookCheckboxMaterial";

function createHeadValueSchema(head, values) {
  return {
    head: head,
    values: values,
  };
}

function AddCustomer() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [dealers, setDealers] = useState([]);
  const [selectedDealerPhoneNo, setSelectedDealerPhoneNo] = useState(undefined);
  // const [banks, setBanks] = useState([]);

  // const [selectedBank, setSelectedBank] = useState(undefined);

  useEffect(() => {
    const getOptions = async () => {
      try {
        setLoading(true);
        const dealersRes = await axiosapi.get("dealer");
        setDealers(dealersRes.data);

        // const bankRes = await axiosapi.get("bank?forOption=true");
        // setBanks(bankRes.data);
      } catch (error) {
        toastError(`${error.message}, Please try to reload`);
      }
      setLoading(false);
    };
    getOptions();
  }, []);

  const setDealerPhoneNoUsingDealerId = (e) => {
    const selectDealerId = e.value;
    const selectDealer = dealers.find(
      (dealer) => dealer._id === selectDealerId
    );
    if (selectDealer) {
      setSelectedDealerPhoneNo(selectDealer.phoneNo);
    }
  };

  // const generalSchema = z.object({
  //   firstName: z
  //     .string({
  //       required_error: "First name is required",
  //       min_error: "First name is short",
  //       max_error: "First name is long",
  //     })
  //     .min(2)
  //     .max(30),
  //   lastName: z.string().optional(),
  //   phoneNo: z.string().min(10).max(13),
  //   email: z.string().optional(),
  //   dealer: z.string().optional(),
  //   status: z.string(),

  //   carName: z.string().optional(),
  //   vehicleLocation: z.string().optional(),
  //   model: z.string().optional(),
  //   regNo: z.string().optional(),
  //   km: z.string().optional(),
  //   ownership: z.string().optional(),
  //   insuranceDate: z.string().optional(),
  //   insuranceType: z.string().optional(),

  //   bank: z.string().optional(),
  //   executive: z.string().optional(),
  //   manager: z.string().optional(),
  //   valuationDetails: z.string().optional(),
  //   dealerName: z.string().optional(),
  //   oldOwnerPh: z.string().optional(),
  //   method: z.string().optional(),
  //   policy: z.string().optional(),
  // });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // resolver: zodResolver(generalSchema),

  const submitData = async (data) => {
    // console.log(data);

    const initalCheckup = [];
    const modifiedData = {};

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

    Object.keys(data).forEach((key) => {
      if (key.includes("ch1")) {
        //* remove ch1_ from the key
        const newKey = key.replace("ch1_", "");
        CollectRequiredDocumentsValue[newKey] = data[key];
      } else if (key.includes("ch2")) {
        //* remove ch2_ from the key
        const newKey = key.replace("ch2_", "");
        coApplicantProofValue[newKey] = data[key];
      } else if (key.includes("ch3")) {
        //* remove ch3_ from the key
        const newKey = key.replace("ch3_", "");
        bankCheckupValue[newKey] = data[key];
      } else if (key.includes("ch4")) {
        //* remove ch4_ from the key
        const newKey = key.replace("ch4_", "");
        rcCheckupValue[newKey] = data[key];
      } else if (key.includes("ch5")) {
        //* remove ch5_ from the key
        const newKey = key.replace("ch5_", "");
        insuranceCheckupValue[newKey] = data[key];
      } else {
        //* if data have empty or "" value remove it from the data
        if (data[key] !== "" && data[key] !== undefined) {
          modifiedData[key] = data[key];
        }
      }
    });

    initalCheckup.push(
      createHeadValueSchema(headInfo.ch1, CollectRequiredDocumentsValue),
      createHeadValueSchema(headInfo.ch2, coApplicantProofValue),
      createHeadValueSchema(headInfo.ch3, bankCheckupValue),
      createHeadValueSchema(headInfo.ch4, rcCheckupValue),
      createHeadValueSchema(headInfo.ch5, insuranceCheckupValue)
    );

    //* add the initalCheckup to the modifiedData
    modifiedData.initalCheckup = initalCheckup;

    setLoading(true);
    await axiosapi
      .post("/cus/general", modifiedData)
      .then((res) => {
        if (res.data.success) {
          toastSuccessWithRedirect(
            `${res.data.name} Created Successfully`,
            () => navigate(`/customer/${res.data._id}/general`)
          );
        }
      })
      .catch((err) => {
        toastError(`${err.message}, Please try to reload`);
      });
    setLoading(false);
  };

  return (
    <Sidebar>
      <div className="m-auto">
        <section className="_main-container">
          <Breadcrumbs fullWidth>
            <a
              onClick={() => navigate("/")}
              className="opacity-60 text-xs lg:text-sm"
            >
              <AiFillHome />
            </a>
            <a
              onClick={() => navigate("/customer")}
              className="opacity-60 text-xs lg:text-sm"
            >
              Customers
            </a>
            <a className="text-xs lg:text-sm">Add Customer</a>
          </Breadcrumbs>

          {/*Form*/}
          <div className="_form-container mx-10 w-auto mt-5">
            {!loading ? (
              <form
                onSubmit={handleSubmit(submitData)}
                className="mt-5 my-auto mx-auto"
                autoComplete="off"
              >
                <Typography className="text-sm md:text-base lg:text-lg font-semibold">
                  Personal Details
                </Typography>
                <div className="grid grid-cols lg:grid-cols-2 gap-5 mt-5 mx-3 lg:mx-10">
                  <HookInputMaterial
                    label="First Name"
                    type="text"
                    name="firstName"
                    register={register}
                    error={errors.firstName}
                  />
                  <HookInputMaterial
                    label="Last Name"
                    type="text"
                    name="lastName"
                    register={register}
                    error={errors.lastName}
                  />
                  <HookInputMaterial
                    label="Phone No."
                    type="text"
                    _value="91"
                    name="phoneNo"
                    register={register}
                    error={errors.phoneNo}
                  />
                  <HookInputMaterial
                    label="Email"
                    type="email"
                    name="email"
                    register={register}
                    error={errors.email}
                  />
                  {/* Dealer Select*/}
                  <SearchSelect
                    options={dealers}
                    name={"dealer"}
                    setValue={setValue}
                    setDealerPhoneNoUsingDealerId={
                      setDealerPhoneNoUsingDealerId
                    }
                  />
                  {selectedDealerPhoneNo && (
                    <span>
                      <Link
                        to={`https://wa.me/${selectedDealerPhoneNo}`}
                        target="_blank"
                        className="flex flex-row items-center space-x-2"
                      >
                        <WhatsappIcon size={24} color="green" />
                        <p>Send direct whatsapp message to the dealer</p>
                      </Link>
                    </span>
                  )}
                  {/* <div className="flex flex-col gap-3 lg:flex-row">
                    <Controller
                      name="dealer"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <Select label="Select Dealer" {...field}>
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
                  </div> */}

                  {/* <Controller
                    name="status"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <Select label="Status" {...field}>
                        <Option value="pending">Pending</Option>
                        <Option value="login">Login</Option>
                        <Option value="pending_doc">Pending Documents</Option>
                        <Option value="reject">Reject</Option>
                        <Option value="conform">Conform</Option>
                      </Select>
                    )}
                  /> */}
                </div>
                {/* </div> */}
                <div className="grid grid-cols lg:grid-cols-2 md:grid-cols-2 ">
                  <div className="mt-5">
                    <Typography className="text-sm md:text-base lg:text-lg font-semibold">
                      Collect required documents
                    </Typography>

                    <div className="grid grid-cols lg:grid-cols-1 gap-2 mt-5 mr-72 md:mx-10 lg:mx-10 ">
                      <HookCheckboxMaterial
                        label="Aadhaar Card"
                        name="ch1_aadharCard"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="PAN Card"
                        name="ch1_panCard"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Voter ID"
                        name="ch1_voterId"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Licence"
                        name="ch1_licence"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Passport"
                        name="ch1_passport"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Nikuthi Copy"
                        name="ch1_nikuthiCopy"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Photo"
                        name="ch1_photo"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Land Tax"
                        name="ch1_landTax"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="KSEB bill"
                        name="ch1_ksebBill"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Last 6 month statement"
                        name="ch1_lastSixMonthStatement"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="RC"
                        name="ch1_rc"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Insurance"
                        name="ch1_insurance"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="IT"
                        name="ch1_it"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Cheque leaf 4"
                        name="ch1_chequeLeafFour"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="ATM card (working)"
                        name="ch1_atmCard"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="House pic"
                        name="ch1_housePic"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Shop pic"
                        name="ch1_shopPic"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Business proof"
                        name="ch1_businessProof"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="GST paper"
                        name="ch1_GstPaper"
                        register={register}
                      />

                      <HookCheckboxMaterial
                        label="GST"
                        name="ch1_gst"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="ITR last 2 year"
                        name="ch1_itrLastTwoYear"
                        register={register}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <Typography className="text-sm md:text-base lg:text-lg font-semibold">
                      Co-Applicant Proof
                    </Typography>
                    <div className="grid grid-cols lg:grid-cols-1 gap-2 mt-5 mr-72 md:mx-10 lg:mx-10">
                      <HookCheckboxMaterial
                        label="Aadhar card"
                        name="ch2_coAadharCard"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="PAN card"
                        name="ch2_coPanCard"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Phone"
                        name="ch2_coPhone"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Photo"
                        name="ch2_coPhoto"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="RC"
                        name="ch2_coRc"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Insurance"
                        name="ch2_coInsurance"
                        register={register}
                      />
                    </div>
                  </div>

                  <div className="mt-5">
                    <Typography className="text-sm md:text-base lg:text-lg font-semibold">
                      Car Details
                    </Typography>
                    <div className="grid grid-cols lg:grid-cols-1 gap-5 mt-5 mx-3 lg:mx-10">
                      <HookInputMaterial
                        label="Car Name"
                        type="text"
                        name="carName"
                        register={register}
                        error={errors.carName}
                      />
                      <HookInputMaterial
                        label="Model"
                        type="text"
                        name="model"
                        register={register}
                        error={errors.model}
                      />
                      <HookInputMaterial
                        label="Register Number"
                        type="text"
                        name="regNo"
                        register={register}
                        error={errors.regNo}
                      />
                      <HookInputMaterial
                        label="KM"
                        type="number"
                        name="km"
                        register={register}
                        error={errors.km}
                      />
                      <HookInputMaterial
                        label="Vehicle Location"
                        type="text"
                        name="vehicleLocation"
                        register={register}
                        error={errors.vehicleLocation}
                      />
                      <HookInputMaterial
                        label="Ownership"
                        type="number"
                        name="ownership"
                        register={register}
                        error={errors.ownership}
                        _min={1}
                        _max={10}
                      />
                      <HookInputMaterial
                        label="Insurance Validity Date"
                        type="date"
                        name="insuranceDate"
                        register={register}
                        error={errors.insuranceDate}
                      />
                      <HookInputMaterial
                        label="Insurance Full / Third"
                        type="text"
                        name="insuranceType"
                        register={register}
                        error={errors.insuranceType}
                      />
                    </div>
                  </div>

                  {/* <div className="mt-5">
                    <Typography className="text-sm md:text-base lg:text-lg font-semibold">
                      Bank Details
                    </Typography>
                    <div className="grid grid-cols lg:grid-cols-1 gap-5 mt-5 mx-3 lg:mx-10">
                      <Controller
                        name="bank"
                        control={control}
                        defaultValue=""
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
                              defaultValue=""
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
                              defaultValue=""
                              render={({ field }) => (
                                <Select {...field} label="Select Executive">
                                  {selectedBank?.employees?.map(
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
                      <HookInputMaterial
                        label="Valuation Details"
                        type="text"
                        name="valuationDetails"
                        register={register}
                        error={errors.valuationDetails}
                      />

                      <HookInputMaterial
                        label="Dealer Name"
                        type="text"
                        name="dealerName"
                        register={register}
                        error={errors.dealerName}
                      />
                      <HookInputMaterial
                        label="Old owner ph no."
                        type="text"
                        name="oldOwnerPh"
                        register={register}
                        error={errors.oldOwnerPh}
                      />
                      <HookInputMaterial
                        label="Method"
                        type="text"
                        name="method"
                        register={register}
                        error={errors.method}
                      />
                      <HookInputMaterial
                        label="Policy"
                        type="text"
                        name="policy"
                        register={register}
                        error={errors.policy}
                      />
                    </div>

                    <div className="mt-5">
                      <Typography className="text-sm md:text-base lg:text-lg font-semibold">
                        Bank checkup
                      </Typography>
                      <div className="grid grid-cols lg:grid-cols-2 gap-2 mt-5 mr-72 md:mx-10 lg:mx-10 ">
                        
                      </div>
                    </div>
                  </div> */}

                  <div className="hidden">
                    <HookCheckboxMaterial
                      label="Manager Call"
                      name="ch3_ManagerCall"
                      register={register}
                    />
                  </div>

                  <div className="mt-5">
                    <Typography className="text-sm md:text-base lg:text-lg font-semibold">
                      RC checkup
                    </Typography>
                    <div className="grid grid-cols lg:grid-cols-1 gap-2 mt-5 mr-72 md:mx-10 lg:mx-10 ">
                      <HookCheckboxMaterial
                        label="RC Ownership"
                        name="ch4_rcOwnership"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="RC Change"
                        name="ch4_rcChange"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="RC loan ask NOC from customer"
                        name="ch4_rcLoan"
                        register={register}
                      />

                      <HookCheckboxMaterial
                        label="NOC"
                        name="ch4_noc"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="RC loan available stop login"
                        name="ch4_rcLoanAvailableStopLogin"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Collect closed receipt"
                        name="ch4_gatherClosedReceipt"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="No camera fine"
                        name="ch4_noCameraFine"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Permit Tax"
                        name="ch4_permitTax"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="E challan"
                        name="ch4_eChallan"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Blacklist"
                        name="ch4_blackList"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Death RC"
                        name="ch4_deathRc"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Check old owner RC phone number linked with Aadhar"
                        name="ch4_checkRcphLinkedWithAadhar"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Check customer Aadhar and PAN linked phone number"
                        name="ch4_checkCustomerAadharLinkedPhno"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="RC ownership crosscheck Insurance Owner"
                        name="ch4_rcOwnershipCrosscheckInsuranceOwner"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Chasis number crosscheck Engine number"
                        name="ch4_chasisNumberCrosscheckEngineNumber"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Old owner company seal in RC"
                        name="ch4_oldOwnerCompanySealInRc"
                        register={register}
                      />
                    </div>
                  </div>
                  <div className="mt-5">
                    <Typography className="text-sm md:text-base lg:text-lg font-semibold">
                      Insurance checkup
                    </Typography>
                    <div className="grid grid-cols lg:grid-cols-1 gap-2 mt-5 mr-72 md:mx-10 lg:mx-10 ">
                      <HookCheckboxMaterial
                        label="Name Check"
                        name="ch5_nameCheck"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="IDV"
                        name="ch5_idv"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Insurance owner crosscheck RC owner"
                        name="ch5_insuranceOwnerCrosscheckRcOwner"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Inform dealer about insurance IDV to Loan amount"
                        name="ch5_informDealerAboutInsuranceIdvToLoanAmount"
                        register={register}
                      />
                      <HookCheckboxMaterial
                        label="Engine number crosscheck Chasis number"
                        name="ch5_engineNumberCrosscheckChasisNumber"
                        register={register}
                      />
                    </div>
                  </div>
                </div>
                <div className=" flex justify-center my-8">
                  <Button type="submit" color="green" disabled={loading}>
                    Create
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

export default AddCustomer;
