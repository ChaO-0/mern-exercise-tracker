import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const CreateExerciseForm = ({ setRef }) => {
  const [Exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    axios.get("http://localhost:5000/users/").then((res) => {
      res.data.length > 0
        ? setExercise((prevState) => ({
            ...prevState,
            users: res.data.map((user) => user.username),
            username: res.data[0].username,
          }))
        : console.log("no data");
    });
  }, []);

  const handleUsername = (e) =>
    setExercise({ ...Exercise, username: e.target.value });

  const handleDescription = (e) =>
    setExercise({ ...Exercise, description: e.target.value });

  const handleDuration = (e) =>
    setExercise({ ...Exercise, duration: e.target.value });

  const handleDate = (date) => setExercise({ ...Exercise, date });

  const handleSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: Exercise.username,
      description: Exercise.description,
      duration: Exercise.duration,
      date: Exercise.date,
    };
    console.log(exercise);
    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));
    setRef(true);
  };

  return (
    <>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <select
            required
            className="form-control"
            value={Exercise.username}
            onChange={handleUsername}
          >
            {Exercise.users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={Exercise.description}
            onChange={handleDescription}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Duration">Duration:</label>
          <input
            type="text"
            name="duration"
            className="form-control"
            value={Exercise.duration}
            onChange={handleDuration}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <div>
            <DatePicker selected={Exercise.date} onChange={handleDate} />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Create Exercise Log
          </button>
        </div>
      </form>
    </>
  );
};

const EditExerciseForm = (props) => {
  const { setRef } = props;
  const [Exercise, setExercise] = useState({
    username: "",
    description: "",
    duration: 0,
    date: new Date(),
    users: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/exercises/${props.match.params.id}`)
      .then((res) => {
        setExercise((prevState) => ({
          ...prevState,
          username: res.data.username,
          description: res.data.description,
          duration: res.data.duration,
          date: new Date(res.data.date),
        }));
      })
      .catch((err) => console.log(err));

    axios.get("http://localhost:5000/users").then((res) => {
      res.data.length > 0
        ? setExercise((prevState) => ({
            ...prevState,
            users: res.data.map((user) => user.username),
            username: res.data[0].username,
          }))
        : console.log("no data");
    });
  }, [props.match.params.id]);

  const handleUsername = (e) =>
    setExercise({ ...Exercise, username: e.target.value });

  const handleDescription = (e) =>
    setExercise({ ...Exercise, description: e.target.value });

  const handleDuration = (e) =>
    setExercise({ ...Exercise, duration: e.target.value });

  const handleDate = (date) => setExercise({ ...Exercise, date });

  const handleSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: Exercise.username,
      description: Exercise.description,
      duration: Exercise.duration,
      date: Exercise.date,
    };
    console.log(exercise);
    axios
      .post(
        `http://localhost:5000/exercises/update/${props.match.params.id}`,
        exercise
      )
      .then((res) => console.log(res.data));
    setRef(true);
  };

  return (
    <>
      <h3>Edit Exercise Log</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username: </label>
          <select
            required
            className="form-control"
            value={Exercise.username}
            onChange={handleUsername}
          >
            {Exercise.users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            className="form-control"
            value={Exercise.description}
            onChange={handleDescription}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Duration">Duration:</label>
          <input
            type="text"
            name="duration"
            className="form-control"
            value={Exercise.duration}
            onChange={handleDuration}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date: </label>
          <div>
            <DatePicker selected={Exercise.date} onChange={handleDate} />
          </div>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary">
            Edit Exercise Log
          </button>
        </div>
      </form>
    </>
  );
};

export { CreateExerciseForm, EditExerciseForm };
