import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root";
import RegisterForm from "./Features/Users/RegisterForm";
import LoginForm from "./Features/Users/LoginForm";
import "./Styles/index.css";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { path: "register", element: <RegisterForm /> },
      { path: "login", element: <LoginForm /> },
    ],
  },
]);

root.render(<RouterProvider router={router} />);
