import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { CreateExerciseForm } from "../Forms";

const CreateExercise = () => {
  const [Ref, setRef] = useState(false);
  return Ref ? <Redirect to="/" /> : <CreateExerciseForm setRef={setRef} />;
};

export { CreateExercise };
