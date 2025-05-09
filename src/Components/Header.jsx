import React, { useContext, useState, useRef, useEffect } from "react";
import { ImCart } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { UScontext } from "../main";
import { toast } from "react-toastify";
import designer from "../assets/Designer.png";
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

function Header() {
  const { user, setUser } = useContext(UScontext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});
  const navigate = useNavigate();
  const profileRef = useRef();

  const handleLogout = async () => {
    try {
      const res = await fetch(
        "https://dailyneedbackend.onrender.com/api/v1/user/userlogout",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setUser(false);
        navigate("/login");
        setProfileOpen(false);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Error during logout");
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await fetch(
          "https://dailyneedbackend.onrender.com/api/v1/user/getUser",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        setProfileDetails(data.user);
      } catch (err) {
        toast.error(err.message || "Unable to fetch user data");
      }
    };
    fetchCurrentUser();
  }, [profileOpen]);

  const menuItems = (
    <>
      {["Home", "Products", "Contact Us", "About Us"].map((item, idx) => (
        <p
          key={idx}
          className="cursor-pointer text-xl hover:text-green-600 transition-all"
          onClick={() => {
            navigate(`/${item.toLowerCase().replace(/\s/g, "")}`);
            setMenuOpen(false);
          }}
        >
          {item}
        </p>
      ))}
    </>
  );

  const profileDropdown = (
    <div
      ref={profileRef}
      className="absolute md:absolute md:top-14 md:right-0 bg-white rounded-xl shadow-xl p-4 w-64 space-y-2 z-50"
    >
      <p className="text-lg font-semibold text-gray-800">
        👤{" "}
        {profileDetails?.firstname && profileDetails?.lastname
          ? profileDetails.firstname + " " + profileDetails.lastname
          : "User Name"}
      </p>
      <p className="text-sm text-gray-500">
        {profileDetails?.email || "user@example.com"}
      </p>
      <hr />
      <button
        onClick={handleLogout}
        className="w-full text-red-600 hover:text-red-700 font-semibold mt-2 text-left"
      >
        Logout
      </button>
    </div>
  );

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="flex justify-between items-center py-3 px-8 mx-auto relative">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img src={designer} alt="logo" className="w-10 h-10 object-contain" />
          <h1 className="text-2xl font-bold text-green-600">DailyNeed</h1>
        </div>

        {/* Mobile menu toggle */}
        <div
          className="md:hidden text-3xl text-green-600 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <RxCross2 /> : <TiThMenu />}
        </div>

        {/* Desktop menu */}
        <nav className="hidden md:flex gap-8 text-lg font-medium text-gray-700">
          {user && menuItems}
        </nav>

        {/* Desktop user actions */}
        <div className="hidden md:flex items-center gap-5 relative">
          <ImCart
            className="text-2xl cursor-pointer hover:text-green-600 transition"
            onClick={() =>
              user
                ? navigate("/cart")
                : toast.warning("Please login to view cart")
            }
          />
          {user ? (
            <>
              <img
                src="https://cdn-icons-gif.flaticon.com/8121/8121295.gif"
                alt="Profile"
                className="w-10 cursor-pointer"
                onClick={() => setProfileOpen((prev) => !prev)}
              />
              {profileOpen && profileDropdown}
            </>
          ) : (
            <button
              className="px-4 py-1 text-green-700 border border-green-600 rounded-full hover:bg-green-50 transition"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-6 py-4 space-y-4 text-base font-medium bg-white shadow-inner">
          {!user ? (
            <div
              className="border border-green-400 space-y-4 text-lg font-semibold w-24 text-center rounded-3xl"
              onClick={() => {
                navigate("/login");
                setMenuOpen(false);
              }}
            >
              <Link to={"/login"}>Login</Link>
            </div>
          ) : (
            <>
              {menuItems}
              <div className="flex items-center justify-between">
                <ImCart
                  className="text-2xl cursor-pointer hover:text-green-600"
                  onClick={() => {
                    navigate("/cart");
                    setMenuOpen(false);
                  }}
                />
                <img
                  src="https://cdn-icons-gif.flaticon.com/8121/8121295.gif"
                  alt="Profile"
                  className="w-10 cursor-pointer"
                  onClick={() => setProfileOpen((prev) => !prev)}
                />
              </div>
              {profileOpen && (
                <div
                  ref={profileRef}
                  className="mt-2 bg-white shadow-lg rounded-xl p-4 w-full space-y-2"
                >
                  <p className="text-md font-semibold text-gray-800">
                    👤{" "}
                    {profileDetails?.firstname && profileDetails?.lastname
                      ? profileDetails.firstname + " " + profileDetails.lastname
                      : "User Name"}
                  </p>
                  <p className="text-sm text-gray-500">
                    {profileDetails?.email || "user@example.com"}
                  </p>
                  <hr />
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuOpen(false);
                    }}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
