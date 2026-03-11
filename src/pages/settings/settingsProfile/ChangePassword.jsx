import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import HookInputMaterial from "../../../components/formComponents/HookInputMaterial";
import { Button, Typography } from "@material-tailwind/react";
import axiosapi from "../../../helpers/axiosapi";
import { useNavigate } from "react-router-dom";

function ChangePassword({ setLoading, id }) {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const passwordSchema = z
    .object({
      password: z.string().min(3).max(50).nonempty(),
      newPassword: z.string().min(3).max(50).nonempty(),
      confirmPassword: z.string().min(3).max(50).nonempty(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data) => {

    try {
      setLoading(true);
      const res = await axiosapi.patch(`/auth/changepassword/${id}`, data);
      if (res.data.success) {
        setError(null);
        setTimeout(() => {
          navigate("/settings/profile");
        }, 1000);
      } else {
        setError(res.data.message);
      }
    } catch (err) {
      setError(err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section>
      <div className="mx-10">
        <Typography className="text-sm lg:text-base font-semibold">
          Change Password
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
          <div className="grid lg:grid-cols-2 lg:grid-rows-2 gap-5 mx-5 lg:mx-10">
            <HookInputMaterial
              label="Current Password"
              type={showPassword ? "text" : "password"}
              name="password"
              register={register}
              error={errors.password}
            />

            <div></div>

            <HookInputMaterial
              label="New Password"
              type={showPassword ? "text" : "password"}
              name="newPassword"
              register={register}
              error={errors.newPassword}
            />

            <HookInputMaterial
              label="Confirm New Password"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              register={register}
              error={errors.confirmPassword}
            />
          </div>
          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              id="showPassword"
              className="rounded"
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          <div className=" flex justify-center my-10">
            <Button size="sm" type="submit" color="red">
              Update Password
            </Button>
          </div>
        </form>
        {error && (
          <p className="text-red-800 font-semibold m-5">
            {error.message || "something went wrong"}
          </p>
        )}
      </div>
    </section>
  );
}

export default ChangePassword;
