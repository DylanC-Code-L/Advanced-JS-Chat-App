import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { getUsers } from "../Api/users";
import SearchUsersForm from "../Features/Users/SearchUsersForm";
import UsersList from "../Features/Users/UsersList";

const Home = () => {
  const [search, setSearch] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Control is token exist
  if (!token) navigate("/account/login");

  // Get users
  const { data, isError, error, isLoading, refetch } = useQuery(
    ["users"],
    getUsers
  );

  // Control status of the request and set content
  let content;

  if (isLoading) content = <p>Is Loading ...</p>;
  else if (isError) {
    content = <p className="text-red-500">{error}</p>;
    refetch();
  } else
    content = (
      <>
        <SearchUsersForm users={data?.data} setSearch={setSearch} />
        <UsersList users={search} />
      </>
    );

  return content;
};

export default Home;
