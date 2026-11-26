import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { runProductChecks } from './utils/debug';
import './styles/style.css';
import './styles/shop.css';
import './styles/animations.css';

runProductChecks();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);