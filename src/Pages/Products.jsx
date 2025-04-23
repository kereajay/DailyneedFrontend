import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { toast } from "react-toastify";
import { categoreyArray } from "../Components/Imagearray";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [categoreyProduct, setCategoreyProduct] = useState([]);

  useEffect(() => {
    const productdata = async () => {
      try {
        const res = await fetch(
          "https://dailyneedbackend.onrender.com/api/v1/products/getallproducts",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        setProducts(data?.products);
        setCategoreyProduct(data?.products);
      } catch (err) {
        console.log(err.message);
        toast(err.message);
      }
    };
    productdata();
  }, []);

  const handlefilter = (categoryname) => {
    if (categoryname === "All") {
      setCategoreyProduct(products);
    } else {
      const filtereditems = products.filter(
        (item) =>
          item.Maincategory === categoryname ||
          item.subcategorey === categoryname
      );
      setCategoreyProduct(filtereditems);
    }
  };

  const handleaddtocart = async (productId) => {
    const res = await fetch(
      "https://dailyneedbackend.onrender.com/api/v1/cart/addtocart",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
        credentials: "include",
      }
    );
    const data = await res.json();
    if (data?.success === true) {
      toast.success("Item Added to cart");
    }
  };

  return (
    <div className="pt-24 px-4 flex flex-col lg:flex-row gap-6">
      {/* Categories for small screen (horizontal scroll) */}
      <div className="lg:hidden w-full mb-4 overflow-x-auto scrollbar-thin">
        <div className="flex gap-6 w-max px-2">
          {categoreyArray.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handlefilter(item.name)}
            >
              <div className="h-20 w-20 border rounded-full flex items-center justify-center shadow-md">
                <img
                  src={item.imageurl}
                  alt={item.name}
                  className="h-14 w-14 object-contain"
                />
              </div>
              <p className="text-sm mt-1 text-center">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sidebar Categories for large screen */}
      <aside className="hidden lg:flex w-60 h-[calc(100vh-6rem)] overflow-y-auto sticky top-24 border-r-2 pr-4 flex-col">
        <h2 className="text-2xl font-bold mb-4 text-center">Categories</h2>
        {categoreyArray.map((item) => (
          <div
            key={item.name}
            className="mb-6 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            onClick={() => handlefilter(item.name)}
          >
            <div className="h-24 w-24 border rounded-full flex items-center justify-center shadow-md">
              <img
                src={item.imageurl}
                alt={item.name}
                className="h-16 w-16 object-contain"
              />
            </div>
            <p className="text-md font-medium mt-2 text-center">{item.name}</p>
          </div>
        ))}
      </aside>

      {/* Product Listing */}
      <section className="flex-1">
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {categoreyProduct?.map((item, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="h-64 bg-white flex items-center justify-center">
                <Link to={`/details/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-full max-w-full object-contain p-4 transition-transform duration-300 ease-in-out hover:scale-110"
                  />
                </Link>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-md font-semibold text-gray-800 truncate">
                      {item.name}
                    </h3>
                    <span className="flex items-center text-sm bg-green-200 px-2 py-0.5 rounded">
                      {item.reviews} <IoStar className="text-yellow-500 ml-1" />
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1 line-clamp-2 text-sm">
                    {item.description}
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-md font-semibold text-black">
                    ₹{item.discountedPrice}
                    <span className="text-sm font-medium text-gray-600 ml-1">
                      /{item.unit.split(" ")[0]}
                    </span>
                  </p>
                  <div className="flex gap-2 text-sm text-gray-500">
                    <del>₹{item.price}</del>
                    <span className="text-green-600">
                      ({item.discount}% off)
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleaddtocart(item._id)}
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-center font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Products;
