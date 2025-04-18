'use client'
import React, { useContext } from 'react';
import Navbar from './Navbar';
import { ThemeContext } from "@/context/ThemeContext";
import Link from 'next/link';
import Footer from './Footer';

const Termsandconditions = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div>

    <div className={`${theme === 'dark' ? 'bg-[#F8F8F8] text-gray-900' : 'bg-black text-[#F8F8F8]'} w-screen min-h-screen flex flex-col items-center overflow-x-hidden`}>
      <Navbar />
      
      <div className="w-full flex justify-center pt-24">
        <div className="text-5xl font-myfont2 selection:text-green-500 text-center">
          Terms and Conditions
        </div>
      </div>
      
      <div className="selection:text-green-500  w-full max-w-4xl px-6 sm:px-12 lg:px-20 mt-10 text-lg overflow-hidden">
        <p><strong>Last Updated:</strong> 3 April 2025</p>

        <p>Welcome to Linkdude! By accessing or using our platform, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our services.</p>

        <h2 className="text-2xl font-semibold mt-6">Definitions</h2>
        <p><strong>"Linkdude"</strong> refers to our link management platform, including the website and related services.</p>
        <p><strong>"User"</strong> refers to any individual or entity that accesses or uses Linkdude.</p>
        <p><strong>"Content"</strong> refers to any links, text, images, or other materials uploaded or shared on Linkdude.</p>

        <h2 className="text-2xl font-semibold mt-6">Eligibility</h2>
        <p>You must be at least 13 years old to use Linkdude. If you are under 18, you must have permission from a parent or guardian.</p>

        <h2 className="text-2xl font-semibold mt-6">User Responsibilities</h2>
          <p>You are responsible for maintaining the security of your account.</p>
          <p>You agree not to submit any harmful, illegal, or inappropriate content.</p>
          <p>You may not use Linkdude for spam, phishing, or any malicious activities.</p>
          <p>You must comply with all applicable laws and regulations.</p>

        <h2 className="text-2xl font-semibold mt-6">Content Guidelines</h2>
          <p>Users must ensure that all submitted links are safe and do not lead to malicious or harmful sites.</p>
          <p>Any reported content that violates our policies may be removed without notice.</p>
          <p>Linkdude reserves the right to restrict, suspend, or terminate accounts that violate these guidelines.</p>

        <h2 className="text-2xl font-semibold mt-6">Intellectual Property</h2>
        <p>Linkdude retains all rights to its branding, trademarks, and services.</p>
        <p>Users retain ownership of their content but grant Linkdude a license to display and distribute it within the platform.</p>

        <h2 className="text-2xl font-semibold mt-6">Limitation of Liability</h2>
        <p>Linkdude is provided "as is" without any warranties. We are not liable for any direct, indirect, or consequential damages arising from your use of our platform.</p>

        <h2 className="text-2xl font-semibold mt-6">Termination</h2>
        <p>Linkdude reserves the right to terminate or suspend accounts at our discretion if users violate these terms.</p>

        <h2 className="text-2xl font-semibold mt-6">Changes to Terms</h2>
        <p>We may update these Terms and Conditions from time to time. Continued use of Linkdude after changes implies acceptance of the updated terms.</p>

        <h2 className="text-2xl font-semibold mt-6">    Contact Us</h2>
        <p>If you have any questions about these Terms and Conditions, please contact us at <Link href="/contactus" className='text-blue-400 underline'>Contact us</Link>.</p>
      </div>
    </div>
      <Footer/>
    </div>
  );
};

export default Termsandconditions;
