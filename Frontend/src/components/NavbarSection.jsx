import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownHeader,
  DropdownItem,
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import LeafGuardLogo from "../assets/LeafGuard AI.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getProfile, logoutUser } from "../services/userService";
import { toast } from "react-toastify";
import { signoutSuccess } from "../redux/reducers/authSlice";
import { useEffect, useState } from "react";

const NavbarSection = () => {
  const { currentUser } = useSelector((state) => state.authentication);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleSignout = async () => {
    try {
      const data = await logoutUser();
      toast.success(data.message);
      dispatch(signoutSuccess());
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while trying to log out");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const userResponse = await getProfile();

        setUsername(userResponse.rest.username || "");
        setEmail(userResponse.rest.email || "");
        setAvatar(userResponse.rest.user_profile || "");
      } catch (error) {
        toast.error(
          error.response?.data?.error || "Failed to fetch profile data"
        );
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      fetchUserData();
    }
  }, [currentUser]);

  return (
    <div className="bg-[#08ab6f] px-6 py-3">
      <Navbar fluid rounded className="bg-[#08ab6f] max-w-5xl mx-auto">
        <NavbarBrand href="/">
          <img
            src={LeafGuardLogo}
            className="mr-3 h-6 sm:h-9"
            alt="LeafGuard AI Logo"
          />
          <span className="self-center whitespace-nowrap text-3xl font-semibold text-black">
            LeafGuard AI
          </span>
        </NavbarBrand>

        <div className="flex md:order-2 items-center gap-4">
          {currentUser ? (
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <div className="flex items-center gap-2 cursor-pointer">
                  <Avatar alt="User settings" img={avatar} rounded />
                  <span className="hidden md:block font-semibold text-white">
                    {username}
                  </span>
                </div>
              }
              className="w-80 shadow-lg rounded-xl overflow-hidden bg-white border"
            >
              <DropdownHeader className="rounded-xl bg-green-600 text-white p-4">
                <span className="block text-xl font-semibold">{username}</span>
                <span className="block text-lg truncate">{email}</span>
              </DropdownHeader>

              <DropdownDivider className="my-0" />

              <DropdownItem
                as={Link}
                to="/get_profile"
                className="hover:bg-[#e6f9f1] transition-colors"
              >
                <span className="flex items-center gap-2 text-lg">
                  <i className="fa-regular fa-user text-[#08ab6f]"></i> Profile
                </span>
              </DropdownItem>

              <DropdownItem
                as={Link}
                to="/my-predictions"
                className="hover:bg-[#e6f9f1] transition-colors"
              >
                <span className="flex items-center gap-2 text-lg">
                  <i className="fa-solid fa-chart-line text-[#08ab6f]"></i> My
                  Predictions
                </span>
              </DropdownItem>

              <DropdownDivider className="my-0" />

              <DropdownItem
                as={Link}
                onClick={handleSignout}
                className="hover:bg-red-100 text-red-600 font-medium transition-colors"
              >
                <span className="flex items-center gap-2 text-lg">
                  <i className="fa-solid fa-right-from-bracket"></i> Sign out
                </span>
              </DropdownItem>
            </Dropdown>
          ) : (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-5 py-2.5 text-base font-semibold text-[#08ab6f] bg-white rounded-xl shadow-md hover:bg-gray-100 hover:scale-105 transition-transform duration-200"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-5 py-2.5 text-base font-semibold text-white bg-[#067a51] rounded-xl shadow-md hover:bg-[#056342] hover:scale-105 transition-transform duration-200"
              >
                Sign Up
              </Link>
            </div>
          )}
          <NavbarToggle />
        </div>

        <NavbarCollapse>
          <NavbarLink
            href="/"
            className="text-white font-semibold text-lg hover:text-yellow-300 transition"
          >
            Home
          </NavbarLink>
          <NavbarLink
            href="/about-us"
            className="text-white font-semibold text-lg hover:text-yellow-300 transition"
          >
            About
          </NavbarLink>
          <NavbarLink
            href="/services"
            className="text-white font-semibold text-lg hover:text-yellow-300 transition"
          >
            Services
          </NavbarLink>
          {currentUser && (
            <NavbarLink
              href="/upload-image"
              className="text-white font-semibold text-lg hover:text-yellow-300 transition"
            >
              Predict Disease
            </NavbarLink>
          )}
        </NavbarCollapse>
      </Navbar>
    </div>
  );
};

export default NavbarSection;
