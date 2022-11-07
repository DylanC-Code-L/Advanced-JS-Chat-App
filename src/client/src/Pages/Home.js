import React, { useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "react-query";
import { getUsers } from "../Api/users";
import FindUsers from "../Features/Users/FindUsers";

const Home = () => {
  const socket = useLoaderData();
  const navigate = useNavigate();
  const uid = localStorage.getItem("uid");

  // Control is uid exist
  if (!uid) navigate("/account/login");

  useEffect(() => {
    socket.connect();
  }, []);

  // Get users
  const { data, isError, error, isLoading, refetch } = useQuery(
    ["users"],
    () => getUsers(uid),
    { refetchOnWindowFocus: false, refetchInterval: 60000 }
  );

  // Control status of the request and set content
  let content;

  if (isLoading) content = <p>Is Loading ...</p>;
  else if (isError) {
    content = <p className="text-red-500">{error}</p>;
    refetch();
  } else content = <FindUsers users={data?.data} />;

  return content;
};

export default Home;
