import React, { useContext, useState, useRef, useEffect } from "react";
import { ImCart } from "react-icons/im";
import { Link, useNavigate } from "react-router-dom";
import { UScontext } from "../main";
import { toast } from "react-toastify";
import designer from "../assets/Designer.png";
import { TiThMenu } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";

function Header() {
  const { user, setUser } = useContext(UScontext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [profiledetails,setProfiledetails]=useState({})
  const navigate = useNavigate();
  const profileRef = useRef();
  // console.log(user);
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:3300/api/v1/user/userlogout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setUser(false);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Error during logout");
      console.error("Error:", error);
    }
  };

  // Close profile dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(()=>{
    const fetchcurrentuser = async () => {
      try{

      const res = await fetch("http://localhost:3300/api/v1/user/getUser", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      // console.log(data)
      setProfiledetails(data.user)
    }
      catch(err){
            console.log(err)
            toast.error(err.message || "unable to fetch")
      
    }
      
    };
    fetchcurrentuser();
  },[profileOpen])

  const menuItems = (
    <>
      <p
        className="cursor-pointer hover:text-green-600"
        onClick={() => {
          navigate("/home");
          setMenuOpen(false);
        }}
      >
        Home
      </p>
      <p
        className="cursor-pointer hover:text-green-600"
        onClick={() => {
          navigate("/products");
          setMenuOpen(false);
        }}
      >
        Products
      </p>
      <p
        className="cursor-pointer hover:text-green-600"
        onClick={() => {
          navigate("/contactus");
          setMenuOpen(false);
        }}
      >
        Contact Us
      </p>
      <p
        className="cursor-pointer hover:text-green-600"
        onClick={() => {
          navigate("/aboutus");
          setMenuOpen(false);
        }}
      >
        About Us
      </p>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-3 relative">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={designer} alt="logo" className="w-10 h-10 object-contain" />
          <h1 className="text-2xl font-bold text-green-600 tracking-wide">
            DailyNeed
          </h1>
        </div>

        {/* Hamburger Icon for sm/md */}
        <div
          className="md:hidden text-3xl text-green-600 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <RxCross2 /> : <TiThMenu />}
        </div>

        {/* Menu for Desktop */}
        {user && (
          <div className="hidden md:flex gap-6 text-xl font-semibold text-gray-700">
            {menuItems}
          </div>
        )}

        {/* Right side icons */}
        <div className="hidden md:flex items-center gap-5 relative">
          <ImCart
            className="text-2xl cursor-pointer hover:text-green-600 transition"
            onClick={() =>user ? navigate("/cart") :toast.warning("Please Login to view cart")}
          />
          {user ? (
            <>
              <div onClick={() => setProfileOpen(!profileOpen)}>
                <img
                  src="https://cdn-icons-gif.flaticon.com/8121/8121295.gif"
                  alt=""
                  className="w-10"
                />
              </div>

              {profileOpen && (
                <div
                  ref={profileRef}
                  className="absolute top-12 right-0 bg-white shadow-lg rounded-xl p-4 w-64 z-50"
                >
                  <p className="font-semibold text-gray-800">
                    👤 {profiledetails.firstname + " " + profiledetails.lastname || "User Name"}
                  </p>
                  <p className="text-sm text-gray-500 mb-2">
                    {profiledetails.email || "user@example.com"}
                  </p>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-semibold hover:underline"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <p
              className="text-lg font-bold text-green-700 cursor-pointer hover:underline"
              onClick={() => navigate("/login")}
            >
              Login
            </p>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && user && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-4 text-lg font-medium bg-white shadow-inner z-40">
          {menuItems}
          <div className="flex items-center justify-between pt-4">
            <ImCart
              className="text-2xl cursor-pointer hover:text-green-600 transition"
              onClick={() => {
                navigate("/cart");
                setMenuOpen(false);
              }}
            />
            <div onClick={() => setProfileOpen(!profileOpen)}>
              <img
                src="https://cdn-icons-gif.flaticon.com/8121/8121295.gif"
                alt=""
                className="w-10"
              />
            </div>
            {profileOpen && (
              <div
                ref={profileRef}
                className="absolute top-12 right-0 bg-white shadow-lg rounded-xl p-4 w-64 z-50"
              >
                <p className="font-semibold text-gray-800">
                  👤 {user.name || "User Name"}
                </p>
                <p className="text-sm text-gray-500 mb-2">
                  {user.email || "user@example.com"}
                </p>
                <hr className="my-2" />
                <button
                  onClick={handleLogout}
                  className="text-red-600 font-semibold hover:underline"
                >
                  Logout
                </button>
              </div>
            )}
            {user ? (
              <p
                className="text-red-600 font-semibold cursor-pointer hover:underline"
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
              >
                Logout
              </p>
            ) : (
              <p
                className="text-green-700 font-semibold cursor-pointer hover:underline"
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
              >
                Login
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
