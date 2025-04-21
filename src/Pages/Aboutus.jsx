import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 mt-20">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          About DailyNeed
        </h2>
      {/* Header Image */}
      <img
        src="https://i.pinimg.com/originals/50/78/a0/5078a05eb1b6847d93383eaa4c0ed500.gif"
        alt="About DailyNeed"
        className="m-auto"
      />

      {/* About Us Info */}
      <div className="max-w-6xl mx-auto py-12 px-4">
      
        <p className="text-center text-lg text-gray-600 mb-12">
          Welcome to{" "}
          <span className="font-semibold text-green-700">DailyNeed</span> – your
          go-to destination for fresh groceries and everyday essentials. From
          dairy products and organic fruits to pantry staples and home supplies,
          we bring quality and convenience right to your doorstep. Our mission
          is to make healthy living easy, affordable, and accessible for
          everyone.
        </p>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Fresh & Quality Assured",
              desc: "We offer the freshest products sourced daily to ensure top-notch quality and taste.",
              icon: "M12 6v6l4 2",
            },
            {
              title: "Fast & Reliable Delivery",
              desc: "Get your groceries delivered on time with our efficient and punctual delivery system.",
              icon: "M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
            },
            {
              title: "Wide Product Range",
              desc: "From dairy and vegetables to snacks and beverages, we cover all your daily needs.",
              icon: "M3 10h18M3 14h18",
            },
            {
              title: "Customer-Centric Service",
              desc: "We prioritize customer satisfaction through seamless support and hassle-free service.",
              icon: "M12 6v6l4 2",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-5 bg-green-50 rounded-xl shadow-sm"
            >
              <div className="bg-green-100 text-green-600 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className=""
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={item.icon}
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-green-50 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-8">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-6 px-4">
            {[
              {
                name: "Meera J.",
                quote:
                  "DailyNeed has made my grocery shopping so convenient! Their fruits and dairy products are always fresh.",
              },
              {
                name: "Rohan S.",
                quote:
                  "The quick delivery and amazing range of products keep me coming back. Highly recommended!",
              },
              {
                name: "Ananya V.",
                quote:
                  "I love how easy it is to find everything I need in one place, and the quality is top-notch every time.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md text-left"
              >
                <p className="text-green-700 italic mb-4">
                  “{testimonial.quote}”
                </p>
                <div className="font-semibold text-gray-800">
                  - {testimonial.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
