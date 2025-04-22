import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { IoStar } from "react-icons/io5";
import Carousel from "react-multi-carousel";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

function Details() {
  const { id } = useParams();
  const [pid, setPid] = useState(id);
  const [productdetails, setProductdetails] = useState({});
  const [releatedProducts, setReleatedProducts] = useState([]);

  const getproductsdetails = async () => {
    try {
      const res = await fetch(
        `https://dailyneedbackend.onrender.com/api/v1/products/getproduct/${pid}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();
      setProductdetails(data?.product);
    } catch (err) {
      toast.error(err.message || "Internal server error");
    }
  };

  const allproductdata = async () => {
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
      const releatd = data.products.filter(
        (item) =>
          item.Maincategory === productdetails.Maincategory &&
          item._id !== productdetails._id
      );
      setReleatedProducts(releatd);
    } catch (err) {
      toast.error(err.message || "Failed to load related products");
    }
  };

  useEffect(() => {
    getproductsdetails();
  }, [pid]);

  useEffect(() => {
    if (productdetails.Maincategory) {
      allproductdata();
    }
  }, [productdetails]);

  const handleaddtocart = async (productId) => {
    try {
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
      } else {
        toast.error(data?.message || "Failed to add to cart");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="pt-24 px-4 md:px-10 lg:px-20 bg-gray-50 min-h-screen">
      {/* Product Details Section */}
      <div className="grid lg:grid-cols-2 gap-10 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
        {/* Product Image */}
        <div className="flex items-center justify-center bg-white">
          <img
            src={productdetails?.image}
            alt={productdetails?.name}
            className="w-full h-auto max-w-md object-contain rounded-xl shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {productdetails?.name}
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Brand: <span className="font-medium">{productdetails?.brand}</span>
            </p>

            <div className="flex items-center mt-3">
              <IoStar className="text-yellow-400 mr-1" />
              <span className="text-sm font-medium">
                {productdetails?.reviews} / 5
              </span>
            </div>

            <p className="text-gray-700 mt-4 text-sm md:text-base">
              {productdetails?.description}
            </p>

            <div className="mt-5">
              <p className="text-2xl font-bold text-green-600">
                ₹{productdetails?.discountedPrice}
                <span className="ml-2 text-base text-gray-600">
                  /{productdetails?.unit?.split(" ")[0]}
                </span>
              </p>
              <div className="text-sm text-gray-500 mt-1 flex gap-2">
                <del>₹{productdetails?.price}</del>
                <span className="text-green-600">
                  ({productdetails?.discount}% off)
                </span>
              </div>
            </div>

            <div className="mt-6 text-sm space-y-1 text-gray-700">
              <p>
                <strong>In Stock:</strong> {productdetails?.instock ? "Yes" : "No"}
              </p>
              <p>
                <strong>Category:</strong> {productdetails?.Maincategory} /{" "}
                {productdetails?.subcategorey}
              </p>
              <p>
                <strong>Shelf Life:</strong> {productdetails?.lifespan}
              </p>
              <p>
                <strong>MFD:</strong>{" "}
                {new Date(productdetails?.manufactureDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Additional Info:</strong> {productdetails?.additionalInfo}
              </p>
            </div>

            {productdetails?.nutrients && (
              <div className="mt-4">
                <p className="font-medium text-sm text-gray-700 mb-1">
                  Nutritional Info:
                </p>
                <ul className="grid grid-cols-2 gap-x-4 list-disc list-inside text-sm text-gray-600">
                  {productdetails.nutrients.split(" ").map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {productdetails?.tags && (
              <div className="mt-3 flex flex-wrap gap-2">
                {productdetails.tags.split(" ").map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => handleaddtocart(productdetails._id)}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-transform duration-300 transform hover:-translate-y-1"
          >
            🛒 Add to Cart
          </button>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16 mb-10">
        <h2 className="text-3xl font-bold px-4 text-gray-800 mb-6 border-l-4 border-green-600 pl-3">
          Related Products
        </h2>
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          swipeable
          draggable
          removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
          className=""
        >
          {releatedProducts?.map((item, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col ml-4 mr-6"
            >
              <div className="h-72 bg-gray-50 flex items-center justify-center hover:bg-gray-100">
                <Link to={`/details/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-60 max-w-full object-contain p-4 transition-transform duration-300 ease-in-out hover:scale-105"
                    onClick={() => setPid(item._id)}
                  />
                </Link>
              </div>
              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">
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
                  <p className="text-lg font-semibold text-black">
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
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl text-center font-semibold transition duration-300 hover:-translate-y-0.5"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

export default Details;
