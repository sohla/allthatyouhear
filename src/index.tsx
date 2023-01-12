// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
// import { sendToVercelAnalytics } from './vitals';

// ReactDOM.render(
//   // <React.StrictMode>
//     <App />
//   // </React.StrictMode>,
//   document.getElementById('root')
// );

// reportWebVitals(sendToVercelAnalytics);


import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  
  // <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  // </React.StrictMode>
);

// reportWebVitals(console.log);