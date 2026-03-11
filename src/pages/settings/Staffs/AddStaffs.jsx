import { useState } from "react";
import {
  Typography,
  Button,
  Select,
  Option,
  Breadcrumbs,
} from "@material-tailwind/react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//* comp
import Sidebar from "../../../components/sidebar/Sidebar";
import HookInputMaterial from "../../../components/formComponents/HookInputMaterial";
import LoadingControler from "../../../components/controlComps/LoadingControler";
import axiosapi from "../../../helpers/axiosapi";
import { useNavigate } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";

function AddStaffs() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const staffSchema = z
    .object({
      username: z
        .string()
        .min(3)
        .max(50)
        .regex(
          /^[a-z0-9]+$/,
          "username can only contain lowercase letters and numbers"
        )
        .nonempty(),
      level: z.string(),
      password: z.string().min(3).max(50).nonempty(),
      confirmPassword: z.string().min(3).max(50).nonempty(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(staffSchema),
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const { username, password, level } = data;
      const res = await axiosapi.post("/auth/signup", {
        username,
        password,
        level,
      });
      if (res.data.success) {
        //* after 1 second
        setTimeout(() => {
          navigate(`/settings/staffs/${res.data.id}/profile`);
        }, 1000);
      }
    } catch (error) {
      setError(error?.response?.data || error);
    }
    setLoading(false);
  };

  if (loading) {
    return <LoadingControler />;
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
            onClick={() => navigate("/settings")}
            className="opacity-60 text-xs lg:text-sm"
          >
            Settings
          </a>
          <a
            onClick={() => navigate("/settings/staffs")}
            className="opacity-60 text-xs lg:text-sm"
          >
            Staffs
          </a>
          <a className="text-xs lg:text-sm">Add Staff</a>
        </Breadcrumbs>

        <div className="mx-10 w-auto mt-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mt-5 mx-auto my-auto"
          >
            <Typography className="text-sm lg:text-base font-semibold">
              Details
            </Typography>

            <div className="grid grid-cols lg:grid-cols-2 gap-5 mt-5 mx-5 lg:mx-10">
              <HookInputMaterial
                label="User Name"
                type="text"
                name="username"
                register={register}
                error={errors.username}
              />

              <Controller
                name="level"
                control={control}
                defaultValue="1"
                render={({ field }) => (
                  <Select {...field} label="Select User Level">
                    <Option value="1">1 - Staff</Option>
                    <Option value="2">2 - Admin</Option>
                    <Option value="3">3 - SuperAdmin</Option>
                  </Select>
                )}
              />

              <HookInputMaterial
                label="Password"
                type={showPassword ? "text" : "password"}
                name="password"
                register={register}
                error={errors.password}
              />

              <HookInputMaterial
                label="Confirm Password"
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                register={register}
                error={errors.confirmPassword}
              />
            </div>

            <div className="flex items-center gap-2 mt-5">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
                id="showPassword"
                className="rounded"
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>
            <div className=" flex justify-center my-8">
              <Button size="sm" type="submit" color="green">
                Create
              </Button>
            </div>
          </form>
        </div>
        {error && (
          <p className="text-red-800 font-semibold m-5">
            {error.message || "something went wrong"}
          </p>
        )}
      </div>
    </Sidebar>
  );
}

export default AddStaffs;
