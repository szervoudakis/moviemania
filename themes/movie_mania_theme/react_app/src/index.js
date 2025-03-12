import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

console.log('React app is loading...');

window.onload = () => {
  const root = document.getElementById('react-root');
  if (root) {
    console.log('React root found! Rendering app...');
    ReactDOM.createRoot(root).render(<App />);
  } else {
    console.error('React root NOT found!');
  }
};