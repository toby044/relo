import React from "react";

export default function Signup() {
  const handleSignup = (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
  };
  return (
    <form onSubmit={handleSignup}>
      <label>Email:</label>
      <input required type="email" />
      <label>Password:</label>
      <input required type="password" />
      <button type="submit">Sign Up</button>
    </form>
  );
};

