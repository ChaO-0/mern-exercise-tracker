import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ExercisesList,
  CreateExercise,
  EditExercise,
} from "./components/Exercises/";
import { CreateUser } from "./components/User";
import Nav from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Nav />
      <div className="container">
        <Switch>
          <Route path="/" exact component={ExercisesList} />
          <Route path="/edit/:id" component={EditExercise} />
          <Route path="/create" component={CreateExercise} />
          <Route path="/user" component={CreateUser} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
