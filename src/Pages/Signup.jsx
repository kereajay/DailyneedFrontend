import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import signupimage from "../assets/signup.jpg";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://dailyneedbackend.onrender.com/api/v1/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Signup successful!");
        navigate("/login")
        setFormData({});
      } else {
        toast.error(data.message || "Signup failed!");
      }
    } catch (error) {
      toast.error("Error during signup");
      console.error("Error:", error);
    }
  };

  return (
    <div
    className="flex items-center justify-center px-4 py-16 pt-18 w-full min-h-screen bg- bg-no-repeat bg-cover"
    style={{ backgroundImage: `url(${signupimage})` }}
  >
  
      <div className=" px-10 py-4  rounded-xl w-full max-w-xl opacity-80 ">
        <h2 className="text-2xl font-bold text-center text-green-400 mb-6">
          Signup
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {[
            { label: "First Name", name: "firstname", type: "text" },
            { label: "Last Name", name: "lastname", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone No", name: "phone", type: "number" },
            { label: "DOB", name: "dob", type: "date" },
            { label: "Password", name: "password", type: "password" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-gray-700 mb-1 font-semibold text-xl">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 "
                required
              />
            </div>
          ))}

          <div>
            <label className="block text-gray-700 mb-1 font-semibold text-xl">
              Gender
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 mb-1 font-semibold text-xl">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            >
              <option value="">Select Role</option>
              <option value="User">User</option>
              <option value="Shopkeeper">Shopkeeper</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-green-400 font-semibold text-white py-2 rounded-lg hover:bg-green-500 transition"
          >
            Signup
          </button>
        </form>

        <br />
        <div className="m-auto">
          <p className="text-center font-semibold">
            already registered{" "}
            <span
              className="text-blue-400 underline cursor-pointer "
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
