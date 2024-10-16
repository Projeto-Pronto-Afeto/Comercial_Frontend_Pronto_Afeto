import React from "react";

const Signup = () => {
  return (
    <div className="grid grid-cols-2">
      <div></div>

      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl font-bold">Sign Up</h1>
        <form className="flex flex-col">
          <input
            type="text"
            placeholder="Name"
            className="border border-gray-300 p-2 m-2"
          />
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 p-2 m-2"
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-2 m-2"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="border border-gray-300 p-2 m-2"
          />
          <button className="bg-blue-500 text-white p-2 m-2">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
