import { useContext, useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Aboutus from "./Pages/Aboutus";
import Contactus from "./Pages/Contactus";
import Products from "./Pages/Products";
import Footer from "./Components/Footer";
import PaymentComponent from "./Rozerpay";
import Header from "./Components/Header";
import Cart from "./Pages/Cart";
import Details from "./Pages/Details";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UScontext } from "./main";

const Layout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const roytera = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/contactus",
        element: <Contactus />,
      },
      {
        path: "/aboutus",
        element: <Aboutus />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/details/:id",
        element: <Details />,
      },
    ],
  },
]);

const App = () => {
  // const navigate=useNavigate()
  const { user, setUser, shopkeeper, setShopkeeper } = useContext(UScontext);
    useEffect(() => {
      const fetchcurrentuser = async () => {
        const res = await fetch("https://dailyneedbackend.onrender.com/api/v1/user/getUser", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });
        const data = await res.json();
        // console.log(data.user.role);
        if (data?.user?.role == "User") {
          setUser(true);
          // localStorage.setItem("user", JSON.stringify(data.user))
          // navigate("/")
        } else {
          toast.warning("please continue to login");
        }
        // console.log(data)
      };
      fetchcurrentuser();
  
      //fetch shopkeeper
      // const fetchcurrentShopkeeper = async () => {
      //   const res = await fetch(
      //     "https://dailyneedbackend.onrender.com/api/v1/user/getShopkeeper",
      //     {
      //       method: "GET",
      //       headers: { "Content-Type": "application/json" },
      //       credentials: "include",
      //     }
      //   );
      //   const data = await res.json();
      //   console.log(data.user.role);
      //   if (data?.user?.role == "Shopkeeper") {
      //     setShopkeeper(true);
      //     // localStorage.setItem("shopkeeper", JSON.stringify(data.user))
  
      //     // navigate("/")
      //   } else {
      //     toast.warning("please continue to login");
      //   }
      //   // console.log(data)
      // };
      // fetchcurrentShopkeeper();
      // Promise.all([fetchcurrentuser(),fetchcurrentShopkeeper()])
    }, []);
  

 

  return (
    <>
      <RouterProvider router={roytera} />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default App;
