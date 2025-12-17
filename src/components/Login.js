import React from "react";
import { useNavigate } from "react-router";
import { signInWithGoogle } from "../utils/auth";

export const Login = () => {
  const navigate = useNavigate();
  async function handleGoogle() {
    try {
      await signInWithGoogle();
      navigate("/");
    } catch (e) {
      console.error(e);
      alert("Login Failed!!!");
    }
  }
  return (
    <div className="max-w-md mx-auto mt-20">
      <div className="bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Sign in</h2>
        <button onClick={handleGoogle} className="w-full py-2 border-rounded">
          Sign in with Google
        </button>
      </div>
    </div>
  );
};
