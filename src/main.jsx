import React from "react";
import ReactDOM from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App";
import "./index.css"
const clerkFrontendApi = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY; 
if(!clerkFrontendApi){
  throw new Error("key was not found");
}
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then((reg) => console.log("Service Worker Registered:", reg))
      .catch((err) => console.error("Service Worker Registration Failed:", err));
  });
}


ReactDOM.createRoot(document.getElementById("root")).render(
  <ClerkProvider publishableKey={clerkFrontendApi}>
    <App />
  </ClerkProvider>
);
