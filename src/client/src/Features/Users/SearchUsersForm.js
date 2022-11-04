import React, { memo, useCallback, useEffect, useRef } from "react";
import { BsSearch } from "react-icons/bs";

const SearchUsersForm = ({ users, search, setSearch }) => {
  let ref = useRef(null);

  // Filter users that contain the value
  const filterUsers = useCallback(
    (value) =>
      users.filter((user) => {
        if (!value) return;

        let pattern = "value";
        let replace = pattern.replace("value", value);

        let regex = new RegExp(replace, "i");

        if (regex.test(user.pseudo)) return user;
      }),
    []
  );

  const handleChange = useCallback(
    (e) => {
      let filteredUsers = filterUsers(e.target.value);
      if (filteredUsers.at(-1) !== search.at(-1)) setSearch(filteredUsers);
    },
    [search]
  );

  useEffect(() => ref.current.focus(), []);

  return (
    <form
      className="flex items-center border rounded-md bg-white relative"
      onSubmit={(e) => e.preventDefault()}
    >
      <BsSearch className="h-6 w-6 mx-4 absolute" />
      <input
        ref={ref}
        type="text"
        onChange={handleChange}
        className="w-full p-4 pl-14 rounded-md"
      />
    </form>
  );
};

export default SearchUsersForm;
