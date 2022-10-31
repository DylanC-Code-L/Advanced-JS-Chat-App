import React from "react";
import { useNavigate } from "react-router-dom";
import FindUser from "../Features/Users/FindUser";

const Home = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  if (!token) navigate("/account/login");

  return (
    <main>
      <FindUser />
    </main>
  );
};

export default Home;
