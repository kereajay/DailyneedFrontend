import React, { useState,useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UScontext } from "../main";
import loginimage from "../assets/login.jpg"

function Login() {
  const { user, setUser, shopkeeper, setShopkeeper } = useContext(UScontext)

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [role, setRole] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate password confirmation
    if (password !== confirmpassword) {
      toast.error("Passwords do not match!");
      return;
    }
  
    try {
      const res = await fetch("http://localhost:3300/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password,confirmpassword, role }), // Removed confirmpassword
        credentials: "include",
      });
  
      const data = await res.json();
  
      // Check if login is successful before accessing user data
      if (!res.ok) {
        toast.error(data.message || "Login failed!");
        return;
      }
  
      // Ensure user and role exist before accessing
      const userRole = data?.user?.role;
      // console.log(userRole)
      if (userRole=="User") {
        setUser(true);
      } 
      else if(userRole=="Shopkeeper"){
        setShopkeeper(true)
      }
      else {
        console.error("User role not found in response:", data);
      }
  
      toast.success("Login successful!");
  
      // Reset form fields
      setEmail("");
      setPassword("");
      setConfirmpassword("");
      setRole("");
  
      navigate("/");
  
    } catch (error) {
      toast.error("Error during login");
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-no-repeat bg-cover"
    style={{backgroundImage:`url(${loginimage})`}}
    >
      <div className=" px-10 py-4 rounded-xl w-full max-w-xl ">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1 font-semibold text-xl">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold text-xl">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold text-xl">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmpassword}
              onChange={(e) => setConfirmpassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1 font-semibold text-xl">
              Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
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
            Login
          </button>
        </form>
        <br />
        <div>
          <p className="text-center font-semibold">
            For new user <span className="text-blue-400 underline cursor-pointer " onClick={() => navigate("/signup")} >Signup</span>
          </p>
        </div>
      </div>

      {/* <ToastContainer /> */}
    </div>
  );
}

export default Login;
