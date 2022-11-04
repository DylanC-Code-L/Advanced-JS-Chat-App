import React, { useState } from "react";
import UsersList from "./UsersList";
import SearchUsersForm from "./SearchUsersForm";

const FindUsers = ({ users }) => {
  const [search, setSearch] = useState([]);

  return (
    <section className="p-8">
      <SearchUsersForm setSearch={setSearch} search={search} users={users} />

      <UsersList users={search} />
    </section>
  );
};

export default FindUsers;
