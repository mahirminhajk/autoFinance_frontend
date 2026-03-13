import React, { useState } from "react";
import axiosapi from "../../helpers/axiosapi";
import { useNavigate, Link } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { MdAlternateEmail, MdOutlineVpnKey, MdLockOutline, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { BsArrowLeft } from "react-icons/bs";
import logoImage from "../../assets/image/AutoFinance Logo.png";

// Shared Layout Component to match Login.jsx
const AuthLayout = ({ children, title, subtitle }) => (
  <div className="min-h-screen flex">
    {/* ── Left Panel (Brand) ── */}
    <div
      className="hidden md:flex flex-col items-center justify-center w-1/2 px-12 gap-8"
      style={{ background: "linear-gradient(145deg, #0f172a 0%, #1e3a8a 50%, #4c1d95 100%)" }}
    >
      <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-5 border border-white/20 shadow-2xl">
        <img
          src={logoImage}
          alt="AutoFinance"
          className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover"
        />
      </div>
      <div className="text-center">
        <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Auto Finance
        </h1>
        <p className="text-white/50 text-sm uppercase tracking-[0.2em] font-medium mt-2">
          Smart Finance Management
        </p>
      </div>
      <div className="flex flex-col gap-3 w-full max-w-xs">
        {["Customer Tracking", "Dealer & Bank Management"].map((feat) => (
          <div key={feat} className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />
            <span className="text-white/70 text-sm font-medium">{feat}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── Right Panel (Form) ── */}
    <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-gray-50 px-6 lg:px-16 relative py-12">
      <div className="flex justify-start w-full absolute top-6 left-6 md:top-8 md:left-8">
        <Link to="/login" className="text-gray-500 hover:text-indigo-600 flex items-center gap-2 font-semibold text-sm transition-colors bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
          <BsArrowLeft /> Back
        </Link>
      </div>

      <div className="flex md:hidden flex-col items-center gap-3 mb-8">
        <img src={logoImage} alt="AutoFinance" className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
        <h1 className="text-2xl font-extrabold text-gray-900">AutoFinance</h1>
      </div>

      <div className="w-full max-w-md">
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">{title}</h2>
          <p className="text-gray-500 font-medium text-sm mt-2">{subtitle}</p>
        </div>
        {children}
        <p className="text-center text-gray-400 text-xs mt-8">
          © 2026 AutoFinance ·{" "}
          <a href="https://www.kabsdigital.com" target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:text-indigo-700 font-semibold transition-colors">
            KABS Digital
          </a>
        </p>
      </div>
    </div>
  </div>
);

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
  const { register, handleSubmit } = useForm({ defaultValues: { username: "" } });

  const onUserNameSubmit = async (data) => {
    try {
      message = null;
      errMes = null;
      setLoading(true);
      if (!data.username) {
        errMes = "Please enter your username.";
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
      errMes = error.response?.data?.message || "Something went wrong.";
    }
    setLoading(false);
  };

  return (
    <AuthLayout title="Forgot Password" subtitle="Enter your username to receive a One-Time Password (OTP).">
      <form onSubmit={handleSubmit(onUserNameSubmit)} className="flex flex-col gap-5">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Username</label>
          <div className="flex items-center gap-3 bg-white border border-gray-200 focus-within:border-indigo-400 rounded-xl px-4 py-3 shadow-sm transition-colors">
            <MdAlternateEmail className="text-gray-400 text-lg flex-shrink-0" />
            <input
              type="text"
              placeholder="Enter your username"
              className="flex-1 outline-none bg-transparent text-gray-800 text-sm"
              {...register("username")}
            />
          </div>
          <p className="text-gray-500 text-xs mt-2 italic">
            * Enter your username and click "Send OTP". You will receive the OTP on your registered WhatsApp mobile number.
          </p>
        </div>

        {errMes && <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm font-medium">{errMes}</div>}
        {message && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">{message}</div>}

        <button type="submit" className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
          Send OTP
        </button>
      </form>
    </AuthLayout>
  );
}

function VerfiyOTP({ setLoading }) {
  const { register, handleSubmit } = useForm({ defaultValues: { otp: "" } });

  const onOTPSubmit = async (data) => {
    try {
      message = null;
      errMes = null;
      setLoading(true);
      if (!data.otp) {
        errMes = "Please enter the OTP.";
        setLoading(false);
        return;
      }
      const res = await axiosapi.patch("/auth/verfiy-otp", { username: username, otp: data.otp });
      if (res.status === 200 && res.data.message) {
        message = res.data.message;
        CurrentStep = stepsEnum["enterPassword"];
      } else {
        errMes = res.data.message;
      }
    } catch (error) {
      errMes = error.response?.data?.message || "Invalid OTP.";
    }
    setLoading(false);
  };

  return (
    <AuthLayout title="Verify OTP" subtitle={`We sent a verification code to your WhatsApp for ${username || "your account"}.`}>
      <form onSubmit={handleSubmit(onOTPSubmit)} className="flex flex-col gap-5">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Verification Code</label>
          <div className="flex items-center gap-3 bg-white border border-gray-200 focus-within:border-indigo-400 rounded-xl px-4 py-3 shadow-sm transition-colors">
            <MdOutlineVpnKey className="text-gray-400 text-lg flex-shrink-0" />
            <input
              type="text"
              maxLength={6}
              placeholder="Enter 6-digit code"
              className="flex-1 outline-none bg-transparent text-gray-800 text-sm tracking-widest font-semibold"
              {...register("otp")}
            />
          </div>
          <p className="text-gray-500 text-xs mt-2 italic">
            * Check your registered WhatsApp mobile number for the OTP, enter it here, and proceed.
          </p>
        </div>

        {errMes && <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm font-medium">{errMes}</div>}
        {message && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">{message}</div>}

        <button type="submit" className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}>
          Verify OTP
        </button>
      </form>
    </AuthLayout>
  );
}

function EnterPassword({ setLoading }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit } = useForm({ defaultValues: { password: "" } });

  const onPasswordSubmit = async (data) => {
    try {
      message = null;
      errMes = null;
      setLoading(true);
      if (!data.password) {
        errMes = "Please enter a new password.";
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
      errMes = error.response?.data?.message || "Failed to reset password.";
    }
    setLoading(false);
  };

  return (
    <AuthLayout title="New Password" subtitle="OTP verified successfully. Please set a new password for your account.">
      <form onSubmit={handleSubmit(onPasswordSubmit)} className="flex flex-col gap-5">
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">New Password</label>
          <div className="flex items-center gap-3 bg-white border border-gray-200 focus-within:border-indigo-400 rounded-xl px-4 py-3 shadow-sm transition-colors">
            <MdLockOutline className="text-gray-400 text-lg flex-shrink-0" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create strong password"
              className="flex-1 outline-none bg-transparent text-gray-800 text-sm"
              {...register("password")}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-gray-600 transition-colors focus:outline-none"
              tabIndex={-1}
            >
              {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-2 italic">
            * Enter your new password and submit. Then, securely log in to your account.
          </p>
        </div>

        {errMes && <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm font-medium">{errMes}</div>}
        {message && <div className="bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">{message}</div>}

        <button type="submit" className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all hover:-translate-y-0.5 shadow-md flex items-center justify-center gap-2" style={{ background: "linear-gradient(135deg, #22c55e, #16a34a)" }}>
          Update Password & Login
        </button>
      </form>
    </AuthLayout>
  );
}

function ForgetPassword() {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading ? (
        <div className="min-h-screen flex justify-center items-center bg-gray-50">
          <Spinner className="w-10 h-10" color="indigo" />
        </div>
      ) : (
        <CurrentStep setLoading={setLoading} />
      )}
    </>
  );
}

export default ForgetPassword;
