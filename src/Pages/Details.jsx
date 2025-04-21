import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IoStar } from "react-icons/io5";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 3 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

function Details() {
  const { id } = useParams();
  const [pid,setPid]=useState(id)
  const [productdetails, setProductdetails] = useState({});
  const [releatedProducts, setReleatedProducts] = useState([]);
  //   const[productcategorey,setProductcategorey]=useState("")

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
      console.log(data.product.Maincategory);
      setProductdetails(data?.product);
      //   setProductcategorey(data.product.Maincategory)
      //   if(data.product.Maincategory){
      //     allproductdata();
      //   }
    } catch (err) {
      toast(err.message || "Internal server error");
      console.log(err.message || "Internal server error");
    }
  };

  //getting all product details to show releated products
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
      console.log(data.products);
      console.log(productdetails.Maincategory);
      const releatd = data.products.filter(
        (item, index) => item.Maincategory === productdetails.Maincategory && item._id!=productdetails._id
      );
      console.log(releatd);
      setReleatedProducts(releatd);
    } catch (err) {
      console.log(err.message);
      toast(err.message);
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
    const res = await fetch("https://dailyneedbackend.onrender.com/api/v1/cart/addtocart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 1 }),
      credentials: "include",
    });
    const data = await res.json();
    if (data?.success === true) {
      toast.success("Added to cart");
    }
  };
  //   console.log(productdetails.Maincategory);

  console.log(releatedProducts);

  return (
    <>
      <div className="pt-24 px-4 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-10 bg-white p-6 rounded-lg shadow-md">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <img
              src={productdetails?.image}
              alt={productdetails?.name}
              className="w-full h-auto max-w-md object-contain rounded-lg shadow"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-between">
            {/* Title & Brand */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {productdetails?.name}
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Brand:{" "}
                <span className="font-medium">{productdetails?.brand}</span>
              </p>

              {/* Rating */}
              <div className="flex items-center mt-3">
                <IoStar className="text-yellow-400 mr-1" />
                <span className="text-sm font-medium">
                  {productdetails?.reviews} / 5
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-700 mt-4">
                {productdetails?.description}
              </p>

              {/* Price */}
              <div className="mt-5">
                <p className="text-2xl font-semibold text-black">
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

              {/* Additional Info */}
              <div className="mt-6 text-sm space-y-1">
                <p>
                  <span className="font-medium">In Stock:</span>{" "}
                  {productdetails?.instock ? "Yes" : "No"}
                </p>
                <p>
                  <span className="font-medium">Category:</span>{" "}
                  {productdetails?.Maincategory} /{" "}
                  {productdetails?.subcategorey}
                </p>
                <p>
                  <span className="font-medium">Shelf Life:</span>{" "}
                  {productdetails?.lifespan}
                </p>
                <p>
                  <span className="font-medium">MFD:</span>{" "}
                  {new Date(
                    productdetails?.manufactureDate
                  ).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Additional Info:</span>{" "}
                  {productdetails?.additionalInfo}
                </p>
              </div>

              {/* Nutrients */}
              {productdetails?.nutrients && (
                <div className="mt-4">
                  <p className="font-medium text-sm text-gray-700 mb-1">
                    Nutritional Info:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {productdetails.nutrients.split(" ").map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Tags */}
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

            {/* Add to Cart Button */}
            <button
              onClick={() => handleaddtocart(productdetails._id)}
              className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-md font-semibold transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold px-4">|| Releated Products</h1>
        <br />
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
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-all duration-300 flex flex-col ml-4 mr-6"
            >
              <div className="h-72 bg-white flex items-center justify-center">
                <Link to={`/details/${item._id}`}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="max-h-96 max-w-96 object-contain p-4  transition-transform duration-300 ease-in-out hover:scale-110"
                    onClick={()=>setPid(item._id)}
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
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded-md text-center font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </>
  );
}

export default Details;
