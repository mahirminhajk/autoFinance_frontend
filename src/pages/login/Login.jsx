import { useContext, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { Spinner } from "@material-tailwind/react";
import { MdAlternateEmail, MdLockOutline, MdVisibility, MdVisibilityOff } from "react-icons/md";

//* auth
import { AuthContext } from "../../context/AuthContext";
import axiosapi from "../../helpers/axiosapi";

//* assets
import logoImage from "../../assets/image/KABS 3D Logo.jpg";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { loading, error, dispatch } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const loginSchema = z.object({
    username: z.string().min(2).max(30).toLowerCase(),
    password: z.string().min(4).max(30),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const handleLogin = async (data) => {
    try {
      dispatch({ type: "LOGIN_START" });
      const res = await axiosapi.post("/auth/login", data);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      navigate("/", { replace: true });
    } catch (error) {
      dispatch({
        type: "LOGIN_FAILURE",
        payload: error.response?.data || { message: "Network error. Please try again." },
      });
    }
  };

  const handleUsernameInput = (e) => {
    e.target.value = e.target.value.toLowerCase();
  };

  return (
    <div className="min-h-screen flex">
      {/* ── Left Panel (Brand) ── */}
      <div
        className="hidden md:flex flex-col items-center justify-center w-1/2 px-12 gap-8"
        style={{ background: "linear-gradient(145deg, #0f172a 0%, #1e3a8a 50%, #4c1d95 100%)" }}
      >
        {/* Logo */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-5 border border-white/20 shadow-2xl">
          <img
            src={logoImage}
            alt="AutoFinance"
            className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl object-cover"
          />
        </div>

        {/* Brand text */}
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            AutoFinance
          </h1>
          <p className="text-white/50 text-sm uppercase tracking-[0.2em] font-medium mt-2">
            Smart Finance Management
          </p>
        </div>

        {/* Feature pills */}
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
      <div className="flex flex-col items-center justify-center w-full md:w-1/2 bg-gray-50 px-6 lg:px-16">
        {/* Mobile logo */}
        <div className="flex md:hidden flex-col items-center gap-3 mb-8">
          <img src={logoImage} alt="AutoFinance" className="w-16 h-16 rounded-2xl object-cover shadow-lg" />
          <h1 className="text-2xl font-extrabold text-gray-900">AutoFinance</h1>
        </div>

        <div className="w-full max-w-md">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">Welcome back</h2>
            <p className="text-gray-400 text-sm mt-1">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-5">
            {/* Username */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Username
              </label>
              <div className={`flex items-center gap-3 bg-white border rounded-xl px-4 py-3 shadow-sm transition-colors ${errors.username ? "border-red-400" : "border-gray-200 focus-within:border-indigo-400"}`}>
                <MdAlternateEmail className="text-gray-400 text-lg flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="flex-1 outline-none bg-transparent text-gray-800 text-sm"
                  onInput={handleUsernameInput}
                  {...register("username")}
                />
              </div>
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className={`flex items-center gap-3 bg-white border rounded-xl px-4 py-3 shadow-sm transition-colors ${errors.password ? "border-red-400" : "border-gray-200 focus-within:border-indigo-400"}`}>
                <MdLockOutline className="text-gray-400 text-lg flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="flex-1 outline-none bg-transparent text-gray-800 text-sm"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot password */}
            <div className="flex justify-end -mt-2">
              <Link to="/forget-password" className="text-indigo-600 hover:text-indigo-800 text-xs font-semibold transition-colors">
                Forgot Password?
              </Link>
            </div>

            {/* Error message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 rounded-xl px-4 py-3 text-sm font-medium">
                {error.message}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
            >
              {loading ? (
                <>
                  <Spinner color="white" className="h-4 w-4" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="text-center text-gray-400 text-xs mt-8">
            © 2026 AutoFinance ·{" "}
            <a
              href="https://www.kabsdigital.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 hover:text-indigo-700 font-semibold transition-colors"
            >
              KABS Digital
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
