import React, { useState } from "react";
import { AiOutlineForm } from "react-icons/ai";
import { useQuery } from "react-query";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { addUser } from "../../Api/users";
import ErrorMessage from "../../Components/ErrorMessage";

const RegisterForm = () => {
  const [user, setUser] = useState({});
  const [confirm, setConfirm] = useState(null);
  const socket = useLoaderData();

  const navigate = useNavigate();

  const handleChange = (e) =>
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleConfirm = (e) => {
    if (e.target.value === user.password) return setConfirm(true);
    setConfirm(false);
  };

  const { data, refetch } = useQuery("uid", () => addUser(user), {
    enabled: false,
    refetchOnWindowFocus: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!confirm) return;

    refetch();

    if (!data) return;

    localStorage.setItem("uid", data);

    socket.auth = { uid: data };
    socket.connect();

    socket.on("Users", (users) =>
      sessionStorage.setItem("connected-users", JSON.stringify(users))
    );

    navigate("/");
  };

  return (
    <section className="mx-6 p-6 bg-white rounded-lg">
      <div className="flex">
        <AiOutlineForm className="text-green-400 h-8 w-8 mr-4" />
        <h2 className="text-2xl font-semibold">Sign up</h2>
      </div>
      <p className="my-4">Become a member and text the world</p>
      <hr />

      <form className="mt-5" onSubmit={handleSubmit}>
        <fieldset className="flex flex-col mb-4">
          <label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            className="border rounded-lg mt-1 p-2"
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="flex flex-col mb-4">
          <label htmlFor="pseudo">
            Pseudo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            required
            className="border rounded-lg mt-1 p-2"
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="flex flex-col mb-4">
          <label htmlFor="password">
            Create a password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            id="password"
            required
            className="border rounded-lg mt-1 p-2"
            onChange={handleChange}
          />
        </fieldset>

        <fieldset className="flex flex-col mb-4">
          <label htmlFor="confirm">
            Confirm password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirm"
            required
            className="border rounded-lg my-1 p-2"
            onChange={handleConfirm}
          />
          {confirm === false ? (
            <ErrorMessage text={"Password do not match !"} />
          ) : (
            ""
          )}
        </fieldset>

        <button className="w-full bg-blue-500 text-white mt-2 p-3 rounded-lg text-xl">
          Sign up
        </button>
      </form>

      <hr className="mt-5 mb-6" />
      <Link to="/account/login" className="text-center block">
        Already have an account ?
        <span className="text-blue-500 font-bold"> Log in</span>
      </Link>
    </section>
  );
};

export default RegisterForm;
