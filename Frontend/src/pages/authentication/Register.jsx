import { Button, Card, Label, Spinner, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { HiMail } from "react-icons/hi";
import { MdKey, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { HashLoader } from "react-spinners";
import {
  signUpFailure,
  signUpStart,
  signUpSuccess,
} from "../../redux/reducers/authSlice";
import { registerUser } from "../../services/userService";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.authentication);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    dispatch(signUpStart());

    try {
      const data = await registerUser(formData);
      dispatch(signUpSuccess());
      toast.success(data.message);
      navigate("/login");
    } catch (err) {
      dispatch(signUpFailure(err));
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

        <Card className="w-full md:max-w-3xl bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl border border-gray-200">
          <h1 className="mb-2 text-3xl font-extrabold text-center text-gray-800">
            🌱 Create Your Free Account
          </h1>
          <p className="text-center text-gray-600 mb-6">
            Join LeafGuard AI and start protecting your plants today!
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
          >
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-full">
              {/* Username */}
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="username" className="text-gray-700 font-medium">
                  Username
                </Label>
                <TextInput
                  id="username"
                  name="username"
                  addon="@"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  placeholder="username"
                  type="text"
                  className="rounded-lg"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">
                  Email
                </Label>
                <TextInput
                  id="email"
                  name="email"
                  icon={HiMail}
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="name@company.com"
                  type="email"
                  className="rounded-lg"
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-y-2 relative">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </Label>
                <TextInput
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  icon={MdKey}
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
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

              {/* Confirm Password */}
              <div className="flex flex-col gap-y-2 relative">
                <Label
                  htmlFor="confirmPassword"
                  className="text-gray-700 font-medium"
                >
                  Confirm Password
                </Label>
                <TextInput
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  icon={MdKey}
                  required
                  placeholder="••••••••"
                  type={showConfirmPassword ? "text" : "password"}
                  className="rounded-lg"
                />
                <button
                  type="button"
                  className="absolute right-3 top-[55%] transform"
                  onClick={toggleConfirmPasswordVisibility}
                >
                  {showConfirmPassword ? (
                    <MdVisibilityOff className="h-5 w-5 text-gray-500" />
                  ) : (
                    <MdVisibility className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6 w-full">
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-x-3 rounded-lg bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 transition-transform duration-300 hover:scale-105"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    Signing up...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>

            {/* Login Link */}
            <p className="text-sm text-gray-600 mt-6 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </>
  );
};

export default RegisterPage;
