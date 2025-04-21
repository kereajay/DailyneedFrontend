import React from "react";

const PaymentComponent = () => {
  const handlePayment = async () => {
    try {
        
      // 1. Call the backend to create an order based on the user's cart.
      const createOrderResponse = await fetch("http://localhost:3300/api/v1/orders/createorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Include authorization header if your API requires it:
          // "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        // If you need to send additional data, add it here.
        body: JSON.stringify({}),
      });

      const orderData = await createOrderResponse.json();

      if (!orderData || !orderData.razorpayOrder) {
        throw new Error("Unable to create order");
      }

      const { razorpayOrder } = orderData;

      // 2. Configure Razorpay options.
      const options = {
        key: "your_razorpay_key_id", // Replace with your Razorpay Key ID
        amount: razorpayOrder.amount, // Amount is in paisa (i.e., ₹1 = 100 paisa)
        currency: razorpayOrder.currency,
        name: "Your Company Name",
        description: "Test Transaction",
        order_id: razorpayOrder.id,
        handler: async (response) => {
          // 3. Once payment is completed, verify the payment on the backend.
          const verifyResponse = await fetch("http://localhost:3300/api/v1/orders/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await verifyResponse.json();
          if (verifyData.success) {
            alert("Payment successful and verified!");
          } else {
            alert("Payment failed or verification unsuccessful!");
          }
        },
        prefill: {
          name: "Test User",
          email: "test@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      // 4. Open Razorpay checkout.
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong with the payment process.");
    }
  };

  return (
    <div>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default PaymentComponent;
