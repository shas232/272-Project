import React from 'react';
import './Header.css';
import { auth, provider, signInWithPopup } from '../firebaseConfig';

const Header = () => {
  // Function to handle Google sign-in
  const handleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('User signed in:', user);
      alert(`Welcome, ${user.displayName}!`);
    } catch (error) {
      console.error('Error signing in with Google:', error);
      alert('Failed to sign in. Please try again.');
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <nav>
          <a href="/">Home</a>
          <span> / Preventing Expense Fraud with AI-Driven Risk Management</span>
        </nav>
        <button className="sign-up" onClick={handleSignUp}>Sign Up</button>
      </div>
    </header>
  );
};

export default Header;
