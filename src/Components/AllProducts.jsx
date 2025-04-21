import React, { useEffect } from "react";
import { toast } from "react-toastify";

function AllProducts({ product, title }) {
  // useEffect(()=>{
  //     const productdata=async ()=>{
  //         const res = await fetch("http://localhost:3300/api/v1/products/getallproducts", {
  //             method: "POST",
  //             headers: { "Content-Type": "application/json" },

  //             credentials: "include",
  //           });
  //           const data=await res.json();
  //           console.log(data);
  //     }
  //     productdata()

  // },[])
  console.log(product);
  const handleaddtocart=async(productId)=>{
    console.log(productId)
  
        const res = await fetch("http://localhost:3300/api/v1/cart/addtocart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:JSON.stringify({productId,quantity:1}),
            credentials: "include",
          });
          const data=await res.json();
          console.log(data)
          if(data?.success==true){
               toast.success("Added to cart")
          }
     

  }
  return (
    <>
      <div className="mt-16 mb-6 px-10">
        <h1 className="text-3xl font-bold">Products</h1>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 py-4 lg:px-10 justify-center gap-10 ">
        {product?.map((item, index) => {
          return (
            <>
              <div className="border-2 rounded-lg">
                <div className="h-60 w-60 m-auto">
                  <img src={item.image} alt="" className="m-auto" />
                </div>
                <div className="px-4">
                  <h1 className="text-xl font-semibold">{item.name}</h1>

                  <p>
                    {" "}
                    <del className="text-red-500">
                      &#8377; {item.price}
                    </del>{" "}
                    <span>{item.discountedPrice}</span>/{item.unit}
                  </p>
                </div>
                <div>{item.reviews}</div>
                <div>
                    <button className="bg-green-400 text-xl font-semibold" onClick={()=>handleaddtocart(item._id)}>Addtocart </button>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default AllProducts;
