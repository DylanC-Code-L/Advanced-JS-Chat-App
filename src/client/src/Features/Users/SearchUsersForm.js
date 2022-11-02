import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchUsersForm = ({ users, setSearch }) => {
  // Set users search
  const handleChange = (e) => {
    const { value } = e.target;

    // Set search with an empty array if the value is empty
    if (value === "") return setSearch([]);

    // Filter users that contain the value
    const filteredUsers = users.filter((user) => {
      let pattern = "value";
      let replace = pattern.replace("value", value);

      let regex = new RegExp(replace, "i");

      if (regex.test(user.pseudo)) return user;
    });

    setSearch(filteredUsers);
  };

  return (
    <form className="flex items-center" onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        onChange={handleChange}
        className="w-full border rounded-md p-2"
      />
      <BsSearch className="h-6 w-6 mx-4" />
    </form>
  );
};

export default SearchUsersForm;
