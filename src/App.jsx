// src/App.jsx
import React from 'react';
import { lazy, Suspense } from 'react';
import {  SignedIn, SignedOut} from '@clerk/clerk-react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const BackgroundRemoval = lazy(() => import('./components/BackgroundRemoval'));
const LandingPage = lazy(() => import('./components/LandingPage'));

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function App() {
  return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <Suspense fallback={
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
          }>
            <SignedIn>
              <BackgroundRemoval />
            </SignedIn>
            <SignedOut>
              <LandingPage />
            </SignedOut>
          </Suspense>
        </main>
        <Footer />
      </div>
  );
}



export default App;