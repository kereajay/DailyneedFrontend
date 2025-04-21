import React, { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import { toast } from "react-toastify";

function Cart() {
  const [productsdata, setProductsdata] = useState([]);
  const [grandtotal, setGrandtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const fetchcart = async () => {
    const res = await fetch("http://localhost:3300/api/v1/cart/getcart", {
      method: "GET",
      headers: { "Content-Type": "application/json" },

      credentials: "include",
    });
    const data = await res.json();
    // console.log(data.cartUser.products);

    setTotal(
      data?.cartUser?.products.reduce(
        (acc, item) => acc + item.quantity * item.productdetails.price,
        0
      )
    );
    setGrandtotal(
      data?.cartUser?.products.reduce(
        (acc, item) =>
          acc + item.quantity * item.productdetails.discountedPrice,
        0
      )
    );
    setProductsdata(data?.cartUser?.products);
  };

  useEffect(() => {
    fetchcart();
  }, []);

  //update quantity
  const increasequantity = async (productId) => {
    // console.log(productId);

    const res = await fetch("http://localhost:3300/api/v1/cart/addtocart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 1 }),
      credentials: "include",
    });
    const data = await res.json();
    // console.log(data);

    if (data?.success == true) {
      //   toast.success("Added to cart");
      fetchcart();
    }
  };
  const reducequantity = async (productId) => {
    // console.log(productId);

    const res = await fetch(
      "http://localhost:3300/api/v1/cart/reduce/quantity",
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: 1 }),
        credentials: "include",
      }
    );
    const data = await res.json();
    // console.log(data);

    if (data?.success == true) {
      // toast.success("reduce");
      fetchcart();
    }
  };
  const RemoveProduct = async (productId) => {
    const res = await fetch(
      "http://localhost:3300/api/v1/cart/product/remove",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
        credentials: "include",
      }
    );
    const data = await res.json();
    // console.log(data);
    if (data?.success == true) {
      fetchcart();
      toast("Product removed Successfully");
    }
  };

  const handlepayment = async () => {
    try {
      const res = await fetch("http://localhost:3300/api/v1/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grandtotal }),
        credentials: "include",
      });

      const data = await res.json();
      // console.log("order response:", data);

      if (!data?.data?.id) {
        toast.error("Failed to create order");
        return;
      }

      await handlePaymentVerify(data.data);
    } catch (err) {
      toast.error(err.message || "Unable to handle the payment");
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) return resolve(true); // already loaded
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePaymentVerify = async (data) => {
    const isLoaded = await loadRazorpayScript();

    if (!isLoaded) {
      toast.error("Razorpay SDK failed to load.");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID, // use VITE_ prefix
      amount: data.amount,
      currency: data.currency,
      name: "Ajay",
      description: "Test Mode",
      order_id: data.id,
      handler: async (response) => {
        // console.log("Razorpay Payment Response:", response);

        try {
          const res = await fetch(
            "http://localhost:3300/api/v1/payment/verify",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                amount: data.amount,
              }),
              credentials: "include",
            }
          );

          const verifyData = await res.json();
          // console.log(verifyData)

          if (verifyData.message) {
            toast.success(verifyData.message);
            fetchcart();
          } else {
            toast.error("Payment verification failed.");
          }
        } catch (error) {
          console.log(error.message);
          toast.error("Payment verification error.");
        }
      },
      theme: {
        color: "#5f63b8",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <>
      <div className="pt-24 px-4 sm:px-8 lg:px-16 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Your Cart
        </h1>

        <div className="space-y-6">
          {productsdata?.length > 0 ? (
            productsdata?.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                {/* Product Image */}
                <div className="w-full sm:w-32 flex-shrink-0">
                  <img
                    src={item.productdetails.image}
                    alt={item.productdetails.name}
                    className="w-full h-32 object-contain rounded"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <p className="text-xl font-semibold text-gray-800">
                    {item.productdetails.name}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="bg-green-200 text-sm font-semibold px-2 py-0.5 rounded flex items-center gap-1">
                      {item.productdetails.reviews}
                      <IoStar className="text-yellow-500" />
                    </span>
                  </div>
                  <p className="mt-2 text-lg font-bold text-gray-700">
                    ₹{item.productdetails.discountedPrice}
                    <span className="text-sm font-medium ml-1 text-gray-500">
                      /{item.productdetails.unit.split(" ")[0]}
                    </span>
                    <del className="text-red-400 ml-2 font-normal">
                      ₹{item.productdetails.price}
                    </del>
                    <span className="ml-1 text-green-600 text-sm font-medium">
                      ({item.productdetails.discount}% off)
                    </span>
                  </p>
                  <p className="text-sm mt-2 text-gray-600">
                    {item.productdetails.description}
                  </p>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => increasequantity(item.productId)}
                    className="text-xl bg-green-100 hover:bg-green-200 px-3 py-1 rounded"
                  >
                    ➕
                  </button>
                  <span className="text-xl font-semibold">{item.quantity}</span>
                  <button
                    onClick={() => reducequantity(item.productId)}
                    className="text-xl bg-green-100 hover:bg-green-200 px-3 py-1 rounded"
                  >
                    ➖
                  </button>
                </div>

                {/* Total Price */}
                <div className="text-xl font-bold text-gray-800">
                  ₹{item.quantity * item.productdetails.discountedPrice}
                </div>

                {/* Remove Button */}
                <div>
                  <button
                    onClick={() => RemoveProduct(item.productId)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="items-center m-auto text-center">
              <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-2xl text-center m-auto font-semibold">
                Your cart is Empty please add some products
              </h1>
              <br />
              <br />
              <img
                src="https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-1f149204cb5f/9uZcoEJaoF.gif"
                alt="cartemptyimage"
                className="m-auto"
              />
            </div>
          )}
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mt-8 w-full max-w-md mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Order Summary
        </h2>

        <div className="space-y-3 text-lg text-gray-700">
          <div className="flex justify-between">
            <p className="font-medium">Total MRP</p>
            <span>₹{total}</span>
          </div>

          <div className="flex justify-between text-green-600">
            <p className="font-medium">Your Savings</p>
            <span>- ₹{(total - grandtotal).toFixed(2)}</span>
          </div>

          <div className="border-t pt-3 flex justify-between text-xl font-semibold text-gray-900">
            <p>Total Amount</p>
            <span>₹{grandtotal}</span>
          </div>
        </div>

        <button
          className="w-full mt-6 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-lg font-semibold transition duration-300"
          onClick={handlepayment}
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  );
}

export default Cart;
