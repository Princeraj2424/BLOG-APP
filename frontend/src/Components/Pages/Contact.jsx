import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const userInfo = {
      access_key: "59427706-366e-4b41-ac23-594653adceef",
      name: data.name,
      phone: data.phone,
      email: data.email,
      message: data.message,
    };

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      const result = await response.json();
      if (result.success) {
        toast.success("Message sent successfully!");
        reset();
      }
    } catch (error) {
      toast.error("Failed to send message!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sky-100 px-4 py-10">

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-10">

        {/* Left Info Panel */}
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-3xl p-10 shadow-2xl flex flex-col justify-center">
          <h2 className="text-4xl font-bold mb-6">Let’s Talk</h2>
          <p className="text-blue-100 mb-10">
            Have a project in mind or just want to say hello?  
            Feel free to reach out.
          </p>

          <div className="space-y-6 text-sm">
            <div className="flex items-center gap-4">
              <FaUser />
              <span>Prince Raj</span>
            </div>
            <div className="flex items-center gap-4">
              <FaPhone />
              <span>+91 6200311773</span>
            </div>
            <div className="flex items-center gap-4">
              <FaEnvelope />
              <span>nicksingh914@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt />
              <span>India</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">

          <h3 className="text-3xl font-bold text-sky-700 mb-8">
            Send a Message
          </h3>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Name Field */}
            <div className="relative">
              <input
                type="text"
                id="name"
                {...register("name", { required: "Full Name is required" })}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none transition"
                placeholder="Full Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Phone Field */}
            <div className="relative">
              <input
                type="tel"
                id="phone"
                {...register("phone", { required: "Phone Number is required" })}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition"
                placeholder="Phone Number"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email Address is required" })}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition"
                placeholder="Email Address"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                rows="5"
                id="message"
                {...register("message", { required: "Message is required" })}
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 bg-white text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 outline-none transition resize-none"
                placeholder="Your Message"
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold tracking-wide shadow-lg hover:scale-[1.02] transition-transform"
            >
              Send Message 
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;
