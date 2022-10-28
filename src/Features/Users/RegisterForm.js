import React from "react";
import { AiOutlineForm } from "react-icons/ai";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <section className="mx-6 p-6 bg-white rounded-lg">
      <div className="flex">
        <AiOutlineForm className="text-green-400 h-8 w-8 mr-4" />
        <h2 className="text-2xl font-semibold">Sign up</h2>
      </div>
      <p className="my-4">Become a member and text the world</p>
      <hr />

      <form className="mt-5">
        <fieldset className="flex flex-col mb-4">
          <label htmlFor="email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            className="border rounded-lg mt-1 p-2"
          />
        </fieldset>

        <fieldset className="flex flex-col mb-4">
          <label htmlFor="pseudo">
            Pseudo <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="pseudo"
            className="border rounded-lg mt-1 p-2"
          />
        </fieldset>

        <fieldset className="flex flex-col mb-4">
          <label htmlFor="password">
            Create a password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            className="border rounded-lg mt-1 p-2"
          />
        </fieldset>

        <fieldset className="flex flex-col mb-4">
          <label htmlFor="confirm">
            Confirm password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="confirm"
            className="border rounded-lg mt-1 p-2"
          />
        </fieldset>

        <button className="w-full bg-blue-500 text-white mt-2 p-3 rounded-lg text-xl">
          Sign up
        </button>
      </form>

      <hr className="mt-5 mb-6" />
      <Link to="/login" className="text-center block">
        Already have an account ?
        <span className="text-blue-500 font-bold"> Log in</span>
      </Link>
    </section>
  );
};

export default RegisterForm;
