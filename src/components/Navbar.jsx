import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SignInButton, SignOutButton, UserButton, useUser } from '@clerk/clerk-react';

function Navbar({ theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  
  // Close menu when window is resized above mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Navigation items
  const navItems = [
    { name: 'Home', href: '/', current: true },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-white/80 backdrop-blur-lg text-gray-900'
      } shadow-md transition-colors duration-300`}
    >
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* Logo/Title */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-2"
        >
          <img src="./coinbox.png" alt="Logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold">Background Remover</h1>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <motion.ul 
            className="flex space-x-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <a 
                  href={item.href}
                  className={`font-medium hover:text-indigo-500 transition-colors ${
                    item.current ? 'text-indigo-500' : ''
                  }`}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </motion.ul>
          
          <motion.div 
            className="flex items-center space-x-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            
            <div className="flex gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 rounded-lg items-center">
              {isSignedIn ? (
                <SignOutButton className="font-medium hover:opacity-90 transition-opacity" />
              ) : (
                <SignInButton className="font-medium hover:opacity-90 transition-opacity" />
              )}
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8"
                  }
                }} 
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <motion.div
          className="md:hidden flex items-center space-x-3"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <div className="w-6 h-6 relative">
                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform rotate-45"></span>
                <span className="absolute top-1/2 left-0 w-full h-0.5 bg-current transform -rotate-45"></span>
              </div>
            ) : (
              <div className="w-6 h-6 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-current"></span>
                <span className="w-full h-0.5 bg-current"></span>
                <span className="w-full h-0.5 bg-current"></span>
              </div>
            )}
          </button>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`md:hidden overflow-hidden ${
              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          >
            <ul className="flex flex-col py-4 px-4 space-y-3">
              {navItems.map((item) => (
                <li key={item.name}>
                  <a 
                    href={item.href}
                    className={`block py-2 px-4 rounded-lg hover:bg-indigo-500 hover:text-white transition-colors ${
                      item.current 
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-500 dark:text-indigo-300' 
                        : ''
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
              
              <li className="pt-2 border-t border-gray-300 dark:border-gray-700">
                <div className="flex justify-between items-center py-2 px-4">
                  {isSignedIn ? (
                    <SignOutButton className="font-medium text-indigo-600 dark:text-indigo-400 hover:opacity-80" />
                  ) : (
                    <SignInButton className="font-medium text-indigo-600 dark:text-indigo-400 hover:opacity-80" />
                  )}
                  <UserButton 
                   
                    appearance={{
                      elements: {
                        avatarBox: "w-10 h-10"
                      }
                    }} 
                  />
                </div>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;