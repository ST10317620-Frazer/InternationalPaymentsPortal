import React from 'react';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-lg text-gray-600 mb-4">
        Welcome to the OrbitalPay, your trusted platform for secure and efficient global transactions.
        We provide seamless payment solutions, ensuring your financial operations are safe, fast, and reliable.
      </p>
      <p className="text-lg text-gray-600 mb-4">
        Our mission is to simplify international payments with cutting-edge technology, robust security measures, and a user-friendly interface.
        Whether you're sending money across borders or managing business transactions, we're here to help.
      </p>
      <p className="text-lg text-gray-600">
        Contact us at <a href="mailto:support@ipp.com" className="text-blue-600 hover:underline">support@ipp.com</a> for assistance. For academic and legal purposes this is COMPLETELY FICTIONAL.
      </p>
    </div>
  );
};

export default AboutUs;
