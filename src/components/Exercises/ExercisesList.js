import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const List = ({ exercise, deleteExercise }) => {
  return (
    <tr>
      <td>{exercise.username}</td>
      <td>{exercise.description}</td>
      <td>{exercise.duration}</td>
      <td>{exercise.date.substring(0, 10)}</td>
      <td>
        <Link to={`/edit/${exercise._id}`}>Edit</Link> |
        <a href="/#" onClick={() => deleteExercise(exercise._id)}>
          Delete
        </a>
      </td>
    </tr>
  );
};

const ExercisesList = () => {
  const [Exercise, setExercise] = useState([]);

  useEffect(() => {
    setTimeout(() => {
      axios
        .get("http://localhost:5000/exercises")
        .then((res) => {
          setExercise(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }, 500);
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete(`http://localhost:5000/exercises/${id}`)
      .then((res) => console.log(res.data));

    setExercise(Exercise.filter((el) => el._id !== id));
  };

  const exerciseList = () =>
    Exercise.map((elm) => (
      <List exercise={elm} deleteExercise={deleteExercise} key={elm._id} />
    ));

  return (
    <>
      <h3>Logged Exercises</h3>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th>Username</th>
            <th>Description</th>
            <th>Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </>
  );
};

export { ExercisesList };
