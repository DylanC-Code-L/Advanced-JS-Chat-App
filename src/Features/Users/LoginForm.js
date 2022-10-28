import React from "react";
import { MdOutlineVpnKey } from "react-icons/md";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <section className="mx-6 p-6 bg-white rounded-lg">
      <div className="flex">
        <MdOutlineVpnKey className="text-green-400 h-8 w-8 mr-4" />
        <h2 className="text-2xl font-semibold">Sign in</h2>
      </div>
      <p className="my-4">Become a member and text the world</p>
      <hr />

      <form className="mt-5">
        <fieldset className="flex flex-col mb-4">
          <label htmlFor="name">
            Email / Pseudo <span className="text-red-500">*</span>
          </label>
          <input type="text" id="name" className="border rounded-lg mt-1 p-2" />
        </fieldset>

        <fieldset className="flex flex-col mb-4">
          <label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            id="password"
            className="border rounded-lg mt-1 p-2"
            placeholder="Enter your password"
          />
        </fieldset>

        <fieldset className="mt-2 mb-4 flex justify-between">
          <div>
            <input type="checkbox" id="remember" className="mr-2" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <Link className="text-slate-400">Forgot your password ?</Link>
        </fieldset>

        <button className="w-full bg-blue-500 text-white mt-2 p-3 rounded-lg text-xl">
          Log in
        </button>
      </form>

      <hr className="mt-5 mb-6" />
      <Link to="/register" className="text-center block">
        Don't have an account ?
        <span className="text-blue-500 font-bold"> Sign up</span>
      </Link>
    </section>
  );
};

export default LoginForm;
