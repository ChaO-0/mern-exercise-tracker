import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { EditExerciseForm } from "../Forms";

const EditExercise = (props) => {
  const [Ref, setRef] = useState(false);
  return Ref ? (
    <Redirect to="/" />
  ) : (
    <EditExerciseForm {...props} setRef={setRef} />
  );
};

export { EditExercise };
