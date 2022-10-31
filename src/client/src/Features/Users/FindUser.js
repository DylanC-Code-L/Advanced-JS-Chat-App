import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const FindUser = () => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => setSearch(e.target.value);

  const users = useQuery(["users"],);

  return (
    <form>
      <input type="text" onChange={handleChange} />
    </form>
  );
};

export default FindUser;
