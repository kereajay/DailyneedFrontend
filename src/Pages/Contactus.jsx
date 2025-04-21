import React from "react";

const ContactUs = () => {
  const handlesubmit = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const message = e.target.message.value;

    const mailtoLink = `mailto:supportDailyneed@gmail.com.com?subject=Message from ${name}&body=Email: ${email}%0D%0A%0D%0AMessage:%0D%0A${message}`;

    window.location.href = mailtoLink;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-md mt-16">
      <div className="flex items-center justify-center">
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6">
          Contact Us
        </h2>
        <img
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMnV6OHA2MzZwdDF0Zjc2bGpvbHFhcmdmdHBldWRxOTdycGUzOTR4ZSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Ts1EubRTwz1U5p5o7R/giphy.gif"
          alt=""
          className="w-20"
        />
      </div>
      <div>
        <img
          src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExY3RpMTI4dWltenZ2ZDk5NGdycWJxd3VtMW1jcTg2cDFndDM4OHA3cyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/rWUrg5Fd6earug44YX/giphy.gif"
          alt=""
          className="m-auto"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-gray-700 mb-4">
            Get in Touch
          </h3>
          <p className="text-gray-600 mb-4">
            We'd love to hear from you! Whether you have a question about our
            products, delivery, or anything else — our team is ready to answer
            all your questions.
          </p>

          <div className="space-y-3 text-gray-600">
            <p>
              <strong>📍 Address:</strong> 123 DailyNeed Street, City Center,
              India
            </p>
            <p>
              <strong>📞 Phone:</strong> +91 98765 43210
            </p>
            <p>
              <strong>✉️ Email:</strong> support@dailyneed.com
            </p>
            <p>
              <strong>🕒 Working Hours:</strong> Mon - Sat: 8 AM to 8 PM
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4" onSubmit={handlesubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows="4"
              name="message"
              placeholder="Your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
