import React, { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [Username, setUsername] = useState("");

  const handleUsername = (e) => setUsername(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: Username,
    };
    console.log(user);
    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));
  };

  return (
    <>
      <h3>Create New User</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            required
            className="form-control"
            value={Username}
            onChange={handleUsername}
          />
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Create User
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateUser;
