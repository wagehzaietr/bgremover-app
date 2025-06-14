// src/components/UsageTracker.jsx
import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

const UsageTracker = ({ children }) => {
  const { user } = useUser();
  const [remainingUses, setRemainingUses] = useState(3);
  const [lastReset, setLastReset] = useState('');

  // In a real app, this would fetch from your backend API
  // For this demo, we'll simulate usage tracking with localStorage
  useEffect(() => {
    if (!user) return;
    
    // Get or initialize user usage data
    const userUsageKey = `user_usage_${user.id}`;
    const storedUsage = localStorage.getItem(userUsageKey);
    
    // Check if we need to reset the count for a new day
    const today = new Date().toDateString();
    
    if (storedUsage) {
      const usageData = JSON.parse(storedUsage);
      
      if (usageData.date !== today) {
        // New day - reset count
        const newUsage = { date: today, count: 0 };
        localStorage.setItem(userUsageKey, JSON.stringify(newUsage));
        setRemainingUses(3);
        setLastReset(today);
      } else {
        // Same day - show remaining uses
        setRemainingUses(3 - usageData.count);
        setLastReset(usageData.date);
      }
    } else {
      // First time user
      const newUsage = { date: today, count: 0 };
      localStorage.setItem(userUsageKey, JSON.stringify(newUsage));
      setRemainingUses(3);
      setLastReset(today);
    }
  }, [user]);

  // Function to increment usage (would be called from backend in real app)
  const incrementUsage = () => {
    if (!user) return;
    
    const userUsageKey = `user_usage_${user.id}`;
    const storedUsage = localStorage.getItem(userUsageKey);
    
    if (storedUsage) {
      const usageData = JSON.parse(storedUsage);
      const newCount = usageData.count + 1;
      
      if (newCount <= 3) {
        const updatedUsage = { ...usageData, count: newCount };
        localStorage.setItem(userUsageKey, JSON.stringify(updatedUsage));
        setRemainingUses(3 - newCount);
      }
    }
  };

  // Clone children and pass down remainingUses and incrementUsage function
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { 
        remainingUses,
        incrementUsage
      });
    }
    return child;
  });

  return (
    <div>
      <div className="max-w-5xl mx-auto mb-6">
        <div className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl p-4 flex items-center">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">Daily Usage</h3>
            <p className="text-sm opacity-90">
              {lastReset ? `Resets at midnight (${new Date(lastReset).toLocaleDateString()})` : 'Loading...'}
            </p>
          </div>
          <div className="bg-white bg-opacity-20 rounded-full px-4 py-2 flex items-center">
            <span className="text-2xl font-bold mr-2">{remainingUses}</span>
            <span className="text-sm">/ 3 left</span>
          </div>
        </div>
      </div>
      
      {childrenWithProps}
    </div>
  );
};

export default UsageTracker;