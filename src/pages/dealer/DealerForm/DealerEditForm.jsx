import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import {
  Typography,
  Button,
  Input,
  Select,
  Option,
  Breadcrumbs,
} from "@material-tailwind/react";
import { Controller, useForm } from "react-hook-form";
import axiosapi from "../../../helpers/axiosapi";
import { useNavigate, useParams } from "react-router-dom";
//*comp
import HookInputMaterial from "../../../components/formComponents/HookInputMaterial";
import LoadingControler from "../../../components/controlComps/LoadingControler";
import ErrControler from "../../../components/controlComps/ErrControler";
import StaffsForm from "./components/StaffsForm";
import {
  ToastComp,
  toastSuccessWithRedirect,
} from "../../../helpers/ToastHelper";
import { AiFillHome } from "react-icons/ai";

function DealerEditForm() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const dealerId = useParams().dealerid;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState(null);

  const [staffs, setStaffs] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      shopname: "",
      place: "",
      phoneNo: "",
      type: "",
      photo: null,
    },
  });

  useEffect(() => {
    const fetchDealer = async () => {
      setLoading(true);
      try {
        const res = await axiosapi.get(`/dealer/${dealerId}`);
        const data = res.data;
        Object.keys(data).forEach((key) => {
          if (key === "photo") {
            setPhoto(data[key]);
          } else if (key === "staffs") {
            setStaffs(data[key]);
          } else {
            setValue(key, data[key]);
          }
        });
      } catch (err) {
        setError(err.response.data || err);
      }
      setLoading(false);
    };

    fetchDealer();
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const fileUrl = URL.createObjectURL(file);
    setPhoto(fileUrl);
    setValue("photo", file);
  };

  const deletePhoto = () => {
    setPhoto(null);
    setValue("photo", "remove");
  };

  const onsubmit = async (data) => {
    setLoading(true);
    try {
      const res = await axiosapi.patch(`/dealer/${dealerId}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      //*Toast
      toastSuccessWithRedirect(res.data.name + " updated", () => {
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
          <a
            onClick={() => navigate(`/dealer/${dealerId}`)}
            className="opacity-60 text-xs lg:text-sm"
          >
            Dealer or Brocker Info
          </a>
          <a className="text-xs lg:text-sm">Update Info</a>
        </Breadcrumbs>

        <div className="mx-10 w-auto mt-5">
          <form
            onSubmit={handleSubmit(onsubmit)}
            className="mt-5 my-auto mx-auto"
          >
            <Typography className="text-sm lg:text-base font-semibold">
              Profile Photo
            </Typography>
            <div className=" mx-5 lg:mx-10 my-5">
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
                                  <span>Close</span>
                                </Button>
                                <Button
                                  size="sm"
                                  className="bg-red-500 text-white background-transparent font-bold uppercase text-sm outline-none focus:outline-none mr-2 mb-1 ease-linear transition-all duration-150"
                                  type="button"
                                  onClick={deletePhoto}
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
            <div className="grid grid-cols lg:grid-cols-2 gap-5 mt-5 mx-5 lg:mx-10">
              <HookInputMaterial
                label="Name"
                type="text"
                name="name"
                register={register}
                error={errors.name}
              />

              <HookInputMaterial
                label="Shopname"
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
                label="Phone No."
                type="text"
                name="phoneNo"
                register={register}
                error={errors.phoneNo}
              />

              <div className="lg:col-span-2">
                <Controller
                  name="type"
                  control={control}
                  render={({ field }) => (
                    <Select variant="outlined" label="Type" {...field}>
                      <Option value="dealer">Dealer</Option>
                      <Option value="broker">Broker</Option>
                    </Select>
                  )}
                />
              </div>
            </div>
            <div className=" flex justify-center my-10">
              <Button size="sm" type="submit" color="green" disabled={loading}>
                Update
              </Button>
            </div>
          </form>
          <Typography className="text-sm lg:text-base font-semibold">
            Add Staffs
          </Typography>
        </div>

        <StaffsForm
          dealerId={dealerId}
          tableRows={staffs}
          setError={setError}
        />
      </div>
      <ToastComp />
    </Sidebar>
  );
}

export default DealerEditForm;
