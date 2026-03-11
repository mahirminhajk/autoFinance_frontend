import { useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import {
  Typography,
  Button,
  Input,
  Select,
  Option,
  Breadcrumbs,
} from "@material-tailwind/react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosapi from "../../../helpers/axiosapi";
import { useNavigate } from "react-router-dom";
//* comp
import HookInputMaterial from "../../../components/formComponents/HookInputMaterial";
import LoadingControler from "../../../components/controlComps/LoadingControler";
import ErrControler from "../../../components/controlComps/ErrControler";
import {
  ToastComp,
  toastSuccessWithRedirect,
} from "../../../helpers/ToastHelper";
import { AiFillHome } from "react-icons/ai";

function DealerMainForm() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null);

  const dealerSchema = z.object({
    name: z.string().min(3).max(50).nonempty(),
    shopname: z.string().min(3).max(50).nonempty(),
    place: z.string().min(3).max(50).nonempty(),
    phoneNo: z.string().min(10).max(15).optional(),
    type: z.string().default("dealer"),
    photo: z.any().optional(),
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(dealerSchema),
  });

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setPhoto(fileUrl);
    setValue("photo", file);
  };

  const deletePhoto = () => {
    setPhoto(null);
    setValue("photo", null);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosapi.post("/dealer", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      //* go back to dealer list
      toastSuccessWithRedirect(res.data.name + " created", () => {
        navigate(`/dealer/${res.data._id}`);
      });
    } catch (err) {
      setError(err.response.data || err);
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
            onClick={() => navigate("/dealer")}
            className="opacity-60 text-xs lg:text-sm"
          >
            Dealers or Brockers
          </a>
          <a className="text-xs lg:text-sm">Add Dealer or Brocker</a>
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
              {!photo ? (
                <Input
                  type="file"
                  color="blue"
                  accept="image/*"
                  onChange={handlePhotoChange}
                />
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <img
                    src={photo}
                    alt="dealer"
                    className="w-40 h-40 rounded-full"
                  />
                  <Button
                    size="sm"
                    color="red"
                    onClick={deletePhoto}
                    className="mt-3"
                  >
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
                label="Name"
                type="text"
                name="name"
                register={register}
                error={errors.name}
              />

              <HookInputMaterial
                label="Shop name"
                type="text"
                name="shopname"
                register={register}
                error={errors.shopname}
              />

              <HookInputMaterial
                label="Place"
                type="text"
                name="place"
                register={register}
                error={errors.place}
              />

              <HookInputMaterial
                label="Phone no."
                type="text"
                _value="91"
                name="phoneNo"
                register={register}
                error={errors.phoneNo}
              />

              <div className="lg:col-span-2">
                <Controller
                  name="type"
                  control={control}
                  defaultValue="dealer"
                  render={({ field }) => (
                    <Select variant="outlined" label="Type" {...field}>
                      <Option value="dealer">Dealer</Option>
                      <Option value="broker">Broker</Option>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className=" flex justify-center mt-10">
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

export default DealerMainForm;
