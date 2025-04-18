'use client'
import React, { useContext } from 'react';
import Navbar from './Navbar';
import { ThemeContext } from "@/context/ThemeContext";
import Link from 'next/link';
import Footer from './Footer';

const PrivacyPolicy = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <div className={`${theme === 'dark' ? 'bg-[#F8F8F8] text-gray-900' : 'bg-black text-[#F8F8F8]'} w-screen min-h-screen flex flex-col items-center overflow-x-hidden`}>
        <Navbar />

        <div className="w-full flex justify-center pt-24">
          <div className="text-5xl font-myfont2 selection:text-green-500 text-center">
            Privacy Policy
          </div>
        </div>

        <div className="selection:text-green-500 w-full max-w-4xl px-6 sm:px-12 lg:px-20 mt-10 text-lg overflow-hidden">
          <p><strong>Last Updated:</strong> 3 April 2025</p>

          <p>
            This Privacy Policy describes how Linkdude collects, uses, and protects your information when you use our platform. By accessing or using Linkdude, you consent to the practices outlined below.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Information We Collect</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li><strong>Account Information:</strong> Name, email address, and other details you provide during registration.</li>
            <li><strong>Usage Data:</strong> Analytics on how you interact with Linkdude to help us improve the experience.</li>
            <li><strong>Content:</strong> Links, titles, images, and any other data you upload or share through the platform.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">How We Use Your Information</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>To provide and personalize your experience on Linkdude.</li>
            <li>To improve our features and platform performance.</li>
            <li>To communicate updates, support, and important notices.</li>
            <li>To ensure safety and prevent fraudulent activities.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">Cookies and Tracking</h2>
          <p>
          Linkdude may use cookies and similar technologies to enhance user experience, analyze site usage, and deliver relevant content. You can manage cookie preferences in your browser settings.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Data Security</h2>
          <p>
            We implement reasonable security measures to protect your data. However, no system is completely secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Third-Party Services</h2>
          <p>
            We may use third-party services for analytics, hosting, or authentication. These services may collect information in accordance with their own privacy policies.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Your Rights</h2>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>You may request access to or deletion of your personal data.</li>
            <li>You can update your account details at any time.</li>
            <li>You may opt out of marketing communications.</li>
          </ul>

          <h2 className="text-2xl font-semibold mt-6">Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy as needed. Changes will be posted on this page, and continued use of Linkdude implies your acceptance of the updated policy.
          </p>

          <h2 className="text-2xl font-semibold mt-6">Contact Us</h2>
          <p>
            If you have any questions or concerns about this Privacy Policy, feel free to <Link href="/contactus" className="text-blue-400 underline">Contact us</Link>.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
