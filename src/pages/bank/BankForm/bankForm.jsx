import { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import {
  Breadcrumbs,
  Button,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingControler from "../../../components/controlComps/LoadingControler";
import ErrControler from "../../../components/controlComps/ErrControler";
import HookInputMaterial from "../../../components/formComponents/HookInputMaterial";
import HookTextareaMaterial from "../../../components/formComponents/HookTextareaMaterial";
import axiosapi from "../../../helpers/axiosapi";
import {
  ToastComp,
  toastSuccessWithRedirect,
} from "../../../helpers/ToastHelper";
import { AiFillHome } from "react-icons/ai";

function BankForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [logo, setLogo] = useState(null);

  const bankSchema = z.object({
    bankName: z.string().min(3).max(50).nonempty(),
    branch: z.string().min(3).max(50).nonempty(),
    ifsc: z.string().optional(),
    address: z.string().optional(),
    branchPolicy: z.string().optional(),
    mandatoryDoc: z.string().optional(),
    logo: z.any().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(bankSchema),
  });

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setLogo(fileUrl);
    setValue("logo", file);
  };

  const deleteLogo = () => {
    setLogo(null);
    setValue("logo", null);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosapi.post("/bank", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //* go back to bank list
      toastSuccessWithRedirect("Bank added successfully", () => {
        navigate(`/bank/${res.data._id}`);
      });
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
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
          <a className="text-xs lg:text-sm">Add Bank</a>
        </Breadcrumbs>

        <div className="mx-10 w-auto mt-5">
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
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={logo}
                    alt="dealer"
                    className="w-40 h-40 rounded-full"
                  />
                  <Button color="red" onClick={deleteLogo} className="mt-3">
                    Delete
                  </Button>
                </div>
              )}
            </div>

            <Typography className="text-sm lg:text-base font-semibold">
              Details
            </Typography>
            <div className="grid grid-cols lg:grid-cols-2 gap-5 mt-5 mx-5 lg:mx-10">
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
                label={"Mandatory Documents"}
                name="mandatoryDoc"
                register={register}
                error={errors.mandatoryDoc}
              />
            </div>
            <div className=" flex justify-center my-5">
              <Button size="sm" type="submit" color="green" disabled={loading}>
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
      <ToastComp />
    </Sidebar>
  );
}

export default BankForm;
