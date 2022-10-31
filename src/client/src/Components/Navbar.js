import React, { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");

  const handleChange = (e) => setSearch(e.target.value);

  return (
    <nav>
      <input
        type="search"
        onChange={handleChange}
        className="border rounded-lg my-1 p-2"
      />
    </nav>
  );
};

export default Navbar;
