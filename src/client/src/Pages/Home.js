import React from "react";
import { useQuery } from "react-query";
import { getUsers } from "../Api/users";
import FindUsers from "../Features/Users/FindUsers";

const Home = () => {
  const uid = localStorage.getItem("uid");

  if (!uid) return;

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
