import { useContext, useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import {
  Typography,
  Button,
  Input,
  Breadcrumbs,
} from "@material-tailwind/react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../context/AuthContext";
import axiosapi from "../../../helpers/axiosapi";
import HookTextareaMaterial from "../../../components/formComponents/HookTextareaMaterial";
import HookInputMaterial from "../../../components/formComponents/HookInputMaterial";
import ChangePassword from "./ChangePassword";
import {
  ToastComp,
  toastSuccessWithRedirect,
} from "../../../helpers/ToastHelper";
import LoadingControler from "../../../components/controlComps/LoadingControler";
import ErrControler from "../../../components/controlComps/ErrControler";
import { AiFillHome } from "react-icons/ai";

function ProfileForm() {
  const navigate = useNavigate();

  const { user, dispatch } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [userData, setUserData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  useEffect(() => {
    if (user === null) {
      dispatch({ type: "LOGOUT" });
      navigate("/login");
    }

    const fetchUser = async () => {
      setLoading(true);
      try {
        const res = await axiosapi.get(`/user/${user._id}`);
        const data = res.data;
        setUserData(data);
        Object.keys(data).forEach((key) => {
          if (
            key === "name" ||
            key === "email" ||
            key === "phone" ||
            key === "address"
          ) {
            setValue(key, data[key]);
          }
        });
      } catch (err) {
        setError(err.response.data || err);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await axiosapi.patch(`/user/${user._id}`, data).then((res) => {
        //* toast
        toastSuccessWithRedirect("Profile Updated Successfully", () => {
          navigate(`/settings/profile`);
        });
      });
    } catch (err) {
      setError(err.response.data || err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingControler />;

  if (error) return <ErrControler err={error} />;

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
            onClick={() => navigate("/settings")}
            className="opacity-60 text-xs lg:text-sm"
          >
            Settings
          </a>
          <a
            onClick={() => navigate("/settings/profile")}
            className="opacity-60 text-xs lg:text-sm"
          >
            Admin Profile
          </a>
          <a className="text-xs lg:text-sm">Update Info</a>
        </Breadcrumbs>

        <div className="mx-10 w-auto mt-5">
          {/* personal information */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 my-auto mx-auto"
          >
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
                label="Email"
                type="email"
                name="email"
                register={register}
                error={errors.email}
              />

              <HookInputMaterial
                label="Phone No."
                type="text"
                name="phone"
                register={register}
                error={errors.phone}
              />

              <div className="row-span-2">
                <HookTextareaMaterial
                  label="Address"
                  type="text"
                  name="address"
                  register={register}
                  error={errors.address}
                />
              </div>

              <div className="row-span-1 grid grid-cols-1 lg:grid-cols-2 gap-5">
                <Input
                  disabled
                  label="User Name"
                  value={userData?.username || "username"}
                />

                <Input
                  disabled
                  label="Role"
                  value={
                    userData.level === 3
                      ? "Super-Admin"
                      : userData.level === 2
                      ? "Admin"
                      : "Staff"
                  }
                />
              </div>
            </div>
            <div className=" flex justify-center my-8">
              <Button size="sm" type="submit" color="green">
                Update
              </Button>
            </div>
          </form>
        </div>

        <ChangePassword
          setLoading={setLoading}
          setError={setError}
          id={user._id}
        />
      </div>
      <ToastComp />
    </Sidebar>
  );
}

export default ProfileForm;
