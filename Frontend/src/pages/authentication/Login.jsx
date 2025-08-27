import {
  Button,
  Card,
  Checkbox,
  Label,
  Spinner,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { HashLoader } from "react-spinners";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/reducers/authSlice";
import { loginUser } from "../../services/userService";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(signInStart());

    try {
      const data = await loginUser(email, password);
      dispatch(signInSuccess(data));
      toast.success(data.message);

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      dispatch(signInFailure(err));
      toast.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center px-6 lg:h-screen bg-gradient-to-br from-green-200 via-white to-green-300 relative">
        {loading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black opacity-75 z-50">
            <HashLoader color="#ffcb00" size={200} />
          </div>
        )}

        <Card className="w-full md:max-w-2xl bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-200">
          <h1 className="mb-3 text-3xl font-extrabold text-center text-gray-800">
            🌱 Welcome Back
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Sign in to continue your plant health journey
          </p>

          <form onSubmit={handleLogin}>
            {/* Email */}
            <div className="mb-4 flex flex-col gap-y-2">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email
              </Label>
              <TextInput
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                type="email"
                required
                className="rounded-lg"
              />
            </div>

            {/* Password */}
            <div className="mb-6 flex flex-col gap-y-2 relative">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <TextInput
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                type={showPassword ? "text" : "password"}
                required
                className="rounded-lg"
              />
              <button
                type="button"
                className="absolute right-3 top-[55%] transform"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <MdVisibilityOff className="h-5 w-5 text-gray-500" />
                ) : (
                  <MdVisibility className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="mb-6 flex items-center justify-between text-sm">
              <div className="flex items-center gap-x-2">
                <Checkbox id="rememberMe" />
                <Label htmlFor="rememberMe">Remember me</Label>
              </div>
              <a
                href="#"
                className="text-green-600 hover:underline font-medium"
              >
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <div className="mb-6 w-full">
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-x-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 transition-transform duration-300 hover:scale-105"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    Logging in...
                  </>
                ) : (
                  "Login to your account"
                )}
              </Button>
            </div>

            {/* Sign Up Link */}
            <p className="mt-4 text-center text-gray-600">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="text-green-600 font-semibold hover:underline"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </>
  );
};

export default LoginPage;
