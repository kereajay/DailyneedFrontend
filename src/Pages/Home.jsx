import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import image1 from "../assets/Scrollimages/image1.jpg";
import image2 from "../assets/Scrollimages/image2.jpg";
import image3 from "../assets/Scrollimages/image3.jpg";
import image4 from "../assets/Scrollimages/image4.jpg";
import image5 from "../assets/Scrollimages/image5.jpg";
import image6 from "../assets/Scrollimages/image6.jpg";
import image7 from "../assets/Scrollimages/image7.jpg";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { toast } from "react-toastify";
import { UScontext } from "../main";

const images = [image1, image2, image3, image4, image5, image6, image7];

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 1 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 1 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const Home = () => {
  const [products, setProducts] = useState([]);
  const { user, setUser } = useContext(UScontext);
  const navigate=useNavigate();


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
        setProducts(data?.products || []);
      } catch (err) {
        console.log(err.message);
        toast(err.message);
      }
    };
    productdata();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!user) {
      toast.warning("please login to add to cart");
    } else {
      try {
        const res = await fetch("https://dailyneedbackend.onrender.com/api/v1/cart/addtocart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ productId, quantity: 1 }),
        });

        const data = await res.json();
        if (data?.success) {
          toast.success("Item Added to cart");
        }
      } catch (err) {
        console.log(err.message);
        toast.message(err.message || "please login to continue");
      }
    }
  };
  const handledetailspage=(id)=>{
     if(!user){
      toast.warning("please login to continue")
     }
     else{
           navigate(`/details/${id}`)
     }
  }

  return (
    <>
      {/* Carousel Section */}
      <div className="w-full z-10 pt-16 ">
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={3000}
          swipeable
          draggable
          removeArrowOnDeviceType={["desktop", "tablet", "mobile"]}
        >
          {images.map((img, idx) => (
            <div
              key={idx}
              className="flex justify-center items-center w-[100%]"
            >
              <img
                src={img}
                alt={`Banner ${idx + 1}`}
                className="w-[100%] ] object-contain "
              />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Trending Section */}
      <div className="mt-14 px-5">
        <h2 className="text-3xl font-bold mb-6 text-green-700">
          🔥 Trending Products
        </h2>
        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {products
            ?.filter((item) => item.trending)
            .map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gray-200"
              >
                <div className="h-64 overflow-hidden flex items-center justify-center bg-gray-50 rounded-t-xl">
                  {/* <Link to={`/details/${item._id}`}> */}
                    <img
                    onClick={()=>handledetailspage(item._id)}
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-contain hover:scale-110 transition-transform duration-300"
                    />
                  {/* </Link> */}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  {/* Product Description */}
                  {item.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {item.description}
                    </p>
                  )}
                  <div className="flex items-center text-sm mt-1 text-yellow-500">
                    <IoStar />
                    <span className="ml-1 text-gray-700 font-medium">
                      {item.reviews}
                    </span>
                  </div>

                  {/* Offer Percentage & Discount */}
                  <div className="mt-2 flex items-center gap-2">
                    {item.discountedPrice && item.price && (
                      <>
                        <span className="text-xl font-bold text-green-700">
                          &#8377; {item.discountedPrice}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          &#8377; {item.price}
                        </span>
                        <span className="text-sm text-red-600 font-medium">
                          {item.discount}% OFF
                        </span>
                      </>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(item._id)}
                    className="mt-4 w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
