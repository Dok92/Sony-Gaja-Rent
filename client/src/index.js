import React from "react";
import * as ReactDOMClient from 'react-dom/client';
import { AppProvider } from './context/appContext';
import App from "./App.js";

ReactDOMClient.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>      
      <App />
    </AppProvider>
  </React.StrictMode>
)
