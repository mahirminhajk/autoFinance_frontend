import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoadingControler from "../../../components/controlComps/LoadingControler";
import ErrControler from "../../../components/controlComps/ErrControler";
import HookInputMaterial from "../../../components/formComponents/HookInputMaterial";
import HookTextareaMaterial from "../../../components/formComponents/HookTextareaMaterial";
import axiosapi from "../../../helpers/axiosapi";
import BankEmployeeForm from "./BankEmployeeForm";
import { ToastComp, toastSuccess } from "../../../helpers/ToastHelper";
import { AiFillHome } from "react-icons/ai";

function BankEditForm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const bankId = useParams().bankid;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logo, setLogo] = useState(null);

  const [employees, setEmployees] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      bankName: "",
      branch: "",
      ifsc: "",
      address: "",
      branchPolicy: "",
      mandatoryDoc: "",
      logo: null,
    },
  });

  useEffect(() => {
    const fetchBank = async () => {
      setLoading(true);
      try {
        const res = await axiosapi.get(`/bank/${bankId}`);
        const data = res.data;
        Object.keys(data).forEach((key) => {
          if (key === "logo") {
            setLogo(data[key]);
          } else if (key === "employees") {
            setEmployees(data[key]);
          } else {
            setValue(key, data[key]);
          }
        });
      } catch (err) {
        setError(err.response?.data || err);
      }
      setLoading(false);
    };

    fetchBank();
  }, []);

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setLogo(fileUrl);
    setValue("logo", file);
  };

  const deleteLogo = () => {
    setLogo(null);
    setValue("logo", "remove");
  };

  const onSubmit = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      const res = await axiosapi.patch(`/bank/${bankId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);

      //* go back to bank list
      toastSuccess("Bank Updated Successfully");
    } catch (err) {
      setError(err);
      setError(err.response.data || err);
      setLoading(false);
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingControler />;
  }

  if (error) {
    return <ErrControler err={error} />;
  }

  return (
    <Sidebar>
      <div className="m-auto">
        <Breadcrumbs fullWidth>
          <a
            onClick={() => navigate("/")}
            className="opacity-60 text-xs lg:text-sm"
          >
            <AiFillHome />
          </a>
          <a
            onClick={() => navigate("/bank")}
            className="opacity-60 text-xs lg:text-sm"
          >
            Banks
          </a>
          <a
            onClick={() => navigate(`/bank/${bankId}`)}
            className="opacity-60 text-xs lg:text-sm"
          >
            Bank Info
          </a>
          <a className="text-xs lg:text-sm">Update Info</a>
        </Breadcrumbs>

        <div className="mx-10 w-auto mt-5 ">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 my-auto mx-auto"
          >
            <Typography className="text-sm lg:text-base font-semibold">
              Profile Photo
            </Typography>
            <div className="mx-5 lg:mx-10 my-5">
              {!logo ? (
                <Input
                  type="file"
                  color="blue"
                  accept="image/*"
                  onChange={handleLogoChange}
                />
              ) : (
                <div className="flex lg:flex-col gap-5 items-center lg:justify-center">
                  <img
                    src={logo}
                    alt="dealer"
                    className="w-40 h-40 rounded-full"
                  />
                  <>
                    <Button
                      size="sm"
                      color="red"
                      className="mt-3"
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
                                  onClick={() => setShowModal(false)}
                                >
                                  Close
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-red-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={deleteLogo}
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
                </div>
              )}
            </div>

            <Typography className="text-sm lg:text-base font-semibold">
              Details
            </Typography>
            <div className="grid grid-cols lg:grid-cols-2 gap-5 mt-5 mr-96 md:mx-10 lg:mx-10">
              <HookInputMaterial
                label={"Bank Name"}
                type="text"
                name="bankName"
                register={register}
                error={errors.bankName}
              />

              <HookInputMaterial
                label={"Branch"}
                type="text"
                name="branch"
                register={register}
                error={errors.branch}
              />

              <HookInputMaterial
                label={"IFSC"}
                type="text"
                name="ifsc"
                register={register}
                error={errors.ifsc}
              />

              <HookInputMaterial
                label={"Address"}
                type="text"
                name="address"
                register={register}
                error={errors.address}
              />

              <HookTextareaMaterial
                label={"Branch Policy"}
                name="branchPolicy"
                register={register}
                error={errors.branchPolicy}
              />

              <HookTextareaMaterial
                label={"Mandatory Doc"}
                name="mandatoryDoc"
                register={register}
                error={errors.mandatoryDoc}
              />
            </div>
            <div className=" flex mb-3 md:justify-center lg:justify-center mt-9">
              <Button size="sm" type="submit" color="green" disabled={loading}>
                Update
              </Button>
            </div>
          </form>
          <Typography className="text-sm lg:text-base font-semibold">
            Add Employees
          </Typography>
        </div>
        <BankEmployeeForm
          employees={employees}
          bankId={bankId}
          setError={setError}
        />
      </div>
      <ToastComp />
    </Sidebar>
  );
}

export default BankEditForm;
