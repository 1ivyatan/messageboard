import { useShallow } from "zustand/react/shallow";
import useErrorsStore from "../stores/errorsStore";
import { JSX, useEffect, useState } from "react";
import ErrorBox from "../components/ErrorBox";

export default function ErrorBoxesContainer() {
  const { errors, shiftError } = useErrorsStore(
    useShallow((state) => ({
      errors: state.errors,
      shiftError: state.shiftError,
    })),
  );

  return (
    <div>
      {errors.map((error, index) => {
        return (
          <ErrorBox text={`${error}`} key={`error_${Date.now().toString()}`} />
        );
      })}
    </div>
  );
}
