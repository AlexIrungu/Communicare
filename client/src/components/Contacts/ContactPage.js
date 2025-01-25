import React from "react";
import ContactForm from "./ContactForm";

function ContactPage() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Contact Us
        </h1>
        <ContactForm />
      </div>
    </div>
  );
}

export default ContactPage;