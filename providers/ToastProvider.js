"use client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ToastProvider({ children }) {
  return (
    <>
      {children}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          backgroundColor: "#fff",
          color: "white",
          fontFamily: "var(--font-poppins), sans-serif",
        }}
        progressStyle={{
          background: "white", 
        }}
      />
    </>
  );
}
