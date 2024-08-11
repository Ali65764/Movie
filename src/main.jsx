import React from 'react';
import ReactDOM from 'react-dom/client'
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from "react-router-dom";
import { GlobalContextProvider } from "./contexts/GlobalContext.jsx";
import { HelmetProvider } from 'react-helmet-async';

const helmetContext = {};

ReactDOM.createRoot(document.getElementById('root')).render(

  <GlobalContextProvider>
    <BrowserRouter >
      <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>
  </BrowserRouter>
  </GlobalContextProvider >

)
