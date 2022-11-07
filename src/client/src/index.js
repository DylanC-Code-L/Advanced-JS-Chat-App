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
import Conversation from "./Pages/Conversation";
import AllConversations from "./Pages/AllConversations";
import socket from "./Web/connection";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: () => socket,
    children: [
      { index: true, element: <Home /> },
      { path: "conversation/:uid2", element: <Conversation /> },
      {
        path: "conversations",
        element: <AllConversations />,
        loader: () => socket,
      },
    ],
  },
  {
    path: "/account",
    children: [
      { path: "register", element: <RegisterForm />, loader: () => socket },
      { path: "login", element: <LoginForm />, loader: () => socket },
    ],
  },
]);

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools />
  </QueryClientProvider>
);
