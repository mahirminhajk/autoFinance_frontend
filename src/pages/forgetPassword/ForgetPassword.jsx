import React, { useState } from "react";
import axiosapi from "../../helpers/axiosapi";
import { useNavigate } from "react-router-dom";
import { Spinner, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { MdPassword, MdSecurityUpdateWarning } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const stepsEnum = {
  enterUserName: EnterUserName,
  verifyOTP: VerfiyOTP,
  enterPassword: EnterPassword,
};

var CurrentStep = stepsEnum["enterUserName"];
var username = null;
var message = null;
var errMes = null;

function EnterUserName({ setLoading }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      username: "",
    },
  });

  const onUserNameSubmit = async (data) => {
    try {
      message = null;
      errMes = null;
      setLoading(true);
      //* check the data.username is empty or not if empty then return error
      if (!data.username) {
        errMes = "Please enter username";
        setLoading(false);
        return;
      }
      const res = await axiosapi.patch("/auth/forget-password", data);
      username = data.username;
      if (res.status === 200 && res.data.message) {
        message = res.data.message;
        CurrentStep = stepsEnum["verifyOTP"];
      } else {
        errMes = res.data.message;
      }
    } catch (error) {
      errMes = error.response?.data?.message;
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <section className="bg-blue-300 h-screen flex place-items-center">
      <div className="mx-auto md:w-96 lg:w-full ">
        <div className="bg-white max-w-md w-auto lg:w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-4 lg:p-8 space-y-5">
          <MdPassword className="text-center mx-auto text-xl md:text-2xl lg:text-4xl" />
          <Typography className="font-semibold lg:font-bold text-lg lg:text-xl text-center">
            Forgot Password
          </Typography>
          <form onSubmit={handleSubmit(onUserNameSubmit)}>
            <Input
              color="black"
              label="Enter UserName"
              {...register("username")}
            />
            {errMes && (
              <div className="text-red-500 text-center text-xs md:text-sm lg:text-base my-1 lg:my-2">
                {errMes}
              </div>
            )}

            {message && (
              <div className="text-green-500 text-center text-xs md:text-sm lg:text-base my-1 lg:my-2">
                {message}
              </div>
            )}

            <div className="text-center my-5">
              <Button size="sm" type="submit">
                Submit UserName
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function VerfiyOTP({ setLoading }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: "",
    },
  });

  const onOTPSubmit = async (data) => {
    try {
      message = null;
      errMes = null;
      setLoading(true);
      //* check the data.otp is empty or not if empty then return error
      if (!data.otp) {
        errMes = "Please enter OTP";
        setLoading(false);
        return;
      }
      const res = await axiosapi.patch("/auth/verfiy-otp", {
        username: username,
        otp: data.otp,
      });
      if (res.status === 200 && res.data.message) {
        message = res.data.message;
        CurrentStep = stepsEnum["enterPassword"];
      } else {
        errMes = res.data.message;
      }
    } catch (error) {
      errMes = error.response?.data?.message;
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <section className="bg-blue-300 h-screen flex place-items-center">
      <div className="mx-auto md:w-96 lg:w-full ">
        <div className="bg-white max-w-md w-auto lg:w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-4 lg:p-8 space-y-5">
          <MdSecurityUpdateWarning className="text-center mx-auto text-xl md:text-2xl lg:text-4xl" />
          <Typography className="font-semibold lg:font-bold text-lg lg:text-xl text-center">
            Verify OTP
          </Typography>

          <form onSubmit={handleSubmit(onOTPSubmit)}>
            <Input
              color="black"
              label="Enter OTP"
              type="text"
              {...register("otp")}
            />
            {errMes && (
              <div className="text-red-500 text-center text-xs md:text-sm lg:text-base my-1 lg:my-2">
                {errMes}
              </div>
            )}

            {message && (
              <div className="text-green-500 text-center text-xs md:text-sm lg:text-base my-1 lg:my-2">
                {message}
              </div>
            )}
            <div className="text-center my-5">
              <Button size="sm" type="submit">
                Submit OTP
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function EnterPassword({ setLoading }) {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
    },
  });

  const onPasswordSubmit = async (data) => {
    try {
      message = null;
      errMes = null;
      setLoading(true);
      //* check the data.password is empty or not if empty then return error
      if (!data.password) {
        errMes = "Please a password";
        setLoading(false);
        return;
      }
      const res = await axiosapi.patch("/auth/changepassword", data);
      if (res.status === 200 && res.data.message) {
        message = res.data.message;
        CurrentStep = stepsEnum["enterUserName"];
        username = null;
        message = null;
        errMes = null;
        navigate("/login", { replace: true });
      } else {
        errMes = res.data.message;
      }
    } catch (error) {
      errMes = error.response?.data?.message;
      setLoading(false);
    }
    setLoading(false);
  };

  return (
    <section className="bg-blue-300 h-screen flex place-items-center">
      <div className="mx-auto md:w-96 lg:w-full ">
        <div className="bg-white max-w-md w-auto lg:w-full mx-auto overflow-hidden shadow-lg bg-ct-dark-200 rounded-2xl p-4 lg:p-8 space-y-5">
          <RiLockPasswordFill className="text-center mx-auto text-xl md:text-2xl lg:text-4xl" />
          <Typography className="font-semibold lg:font-bold text-lg lg:text-xl text-center">
            Enter New Password
          </Typography>
          <form className="" onSubmit={handleSubmit(onPasswordSubmit)}>
            <Input
              color="black"
              label="Enter New Password"
              type="password"
              {...register("password")}
            />
            {errMes && (
              <div className="text-red-500 text-center text-xs md:text-sm lg:text-base my-1 lg:my-2">
                {errMes}
              </div>
            )}

            {message && (
              <div className="text-green-500 text-center text-xs md:text-sm lg:text-base my-1 lg:my-2">
                {message}
              </div>
            )}
            <div className="text-center my-5">
              <Button size="sm" type="submit">
                Update Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function ForgetPassword() {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading ? (
        <div className="bg-blue-100 h-screen flex justify-center items-center">
          <Spinner className="w-8 h-8" color="red" />
        </div>
      ) : (
        <CurrentStep setLoading={setLoading} />
      )}
    </div>
  );
}

export default ForgetPassword;
