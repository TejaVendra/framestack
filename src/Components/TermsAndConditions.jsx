import React from "react";
import { useNavigate } from "react-router";


const TermsAndConditions = () => {


    const nav = useNavigate();

  return (
    <div className="min-h-screen bg-black text-gray-300 px-6 py-16 md:px-20 animate-fadeIn">
      <div className="max-w-4xl mx-auto bg-gray-900/70 backdrop-blur-md p-10 rounded-2xl shadow-lg border border-gray-800">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">
          Terms & Conditions
        </h1>
        <p className="text-gray-400 mb-8 text-center">
          Last Updated: <span className="text-indigo-400">October 2025</span>
        </p>

        <div className="space-y-6 text-justify leading-relaxed overflow-y-auto max-h-[70vh] pr-2">
          <section>
            <h2 className="text-xl font-semibold text-indigo-400 mb-2">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using our platform, you agree to comply with and be bound
              by these Terms and Conditions. If you disagree with any part of these terms,
              you may not access our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-indigo-400 mb-2">
              2. Use of Services
            </h2>
            <p>
              You agree to use our services only for lawful purposes and in a manner that
              does not infringe the rights of, restrict, or inhibit anyone else's use and
              enjoyment of the platform. Misuse or unauthorized access is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-indigo-400 mb-2">
              3. Intellectual Property
            </h2>
            <p>
              All content, design elements, logos, and software on this website are the
              property of our company. You may not reproduce, distribute, or modify any
              materials without explicit written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-indigo-400 mb-2">
              4. User Accounts
            </h2>
            <p>
              When creating an account, you must provide accurate and complete information.
              You are responsible for maintaining the confidentiality of your login details
              and for all activities under your account.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-indigo-400 mb-2">
              5. Limitation of Liability
            </h2>
            <p>
              We are not liable for any direct, indirect, incidental, or consequential
              damages that may arise from your use of our services. Your sole remedy is to
              discontinue using the platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-indigo-400 mb-2">
              6. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms and Conditions at any time.
              Updated versions will be posted on this page with a new effective date.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-indigo-400 mb-2">
              7. Contact Us
            </h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us
              at <span className="text-indigo-400">framestack1@gmail.com</span>.
            </p>
          </section>
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => nav('/signup')}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-500 hover:to-purple-500 transition-all duration-300"
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
