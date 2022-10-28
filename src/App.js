import React from "react";
import RegisterForm from "./Features/Users/RegisterForm";

const App = () => {
  return (
    <main className="bg-slate-300 h-[100vh]">
      <h1 className="text-white text-4xl text-center py-5">Chat-App</h1>
      <RegisterForm />
    </main>
  );
};

export default App;
