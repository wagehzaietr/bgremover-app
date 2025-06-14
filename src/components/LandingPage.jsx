// src/components/LandingPage.jsx
import React from 'react';
import { SignInButton } from '@clerk/clerk-react';

const LandingPage = () => {
  return (
    <div className="flex flex-col items-center py-16">
      <div className="max-w-3xl text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6">
          Remove Image Backgrounds in Seconds
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Experience the power of AI with our background removal tool. 
          Get professional results instantly - no design skills required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {[
          {
            icon: '🚀',
            title: 'Lightning Fast',
            description: 'Remove backgrounds in seconds with our powerful AI technology'
          },
          {
            icon: '🎨',
            title: 'Professional Quality',
            description: 'Get clean, precise cuts every time with no manual effort'
          },
          {
            icon: '🔒',
            title: 'Secure & Private',
            description: 'Your images are never stored or shared with third parties'
          }
        ].map((feature, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md border border-gray-100 transition-transform hover:scale-105">
            <div className="text-5xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 text-white max-w-3xl w-full mb-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="flex-1 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-3">Premium Features</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Unlimited background removals
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                High-resolution downloads
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Priority processing
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <SignInButton mode="modal">
              <button className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg flex items-center">
                Get Started
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </button>
            </SignInButton>
            <p className="mt-3 text-indigo-200 text-sm">Sign up in seconds</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-md p-8 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Sign In",
              description: "Create an account to access the tool"
            },
            {
              step: "2",
              title: "Upload Image",
              description: "Drag & drop or select an image"
            },
            {
              step: "3",
              title: "Download Result",
              description: "Get your transparent background image"
            }
          ].map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl mb-4">
                {step.step}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;