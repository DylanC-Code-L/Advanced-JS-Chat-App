import React from "react";
import { useQuery } from "react-query";
import { getUsers } from "../Api/users";
import FindUsers from "../Features/Users/FindUsers";

const Home = () => {
  const uid = localStorage.getItem("uid");

  if (!uid) return;

  // Get users
  const {
    data: users,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useQuery(["users"], () => getUsers(uid), {
    refetchOnWindowFocus: false,
    refetchInterval: 60000,
  });

  return (
    <>
      {isLoading ? (
        <p>Is Loading ...</p>
      ) : isError ? (
        <ErrorMessage text={error} />
      ) : (
        isSuccess && <FindUsers users={users} />
      )}
    </>
  );
};

export default Home;
