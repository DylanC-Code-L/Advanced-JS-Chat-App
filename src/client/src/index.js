import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Root";
import RegisterForm from "./Features/Users/RegisterForm";
import LoginForm from "./Features/Users/LoginForm";
import "./Styles/index.css";
import Home from "./Pages/Home";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "account",
        children: [
          { path: "register", element: <RegisterForm /> },
          { path: "login", element: <LoginForm /> },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen />
  </QueryClientProvider>
);
