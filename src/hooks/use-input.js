import { useState } from "react";
const useInput = (ValidateValue) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const isValid = ValidateValue(enteredValue);
  const hasError = !isValid && isTouched;
  const inputChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };
  const inputBlurHandler = () => {
    setIsTouched(true);
  };
  const resetInputHandler = () => {
    setIsTouched(false);
    setEnteredValue("");
  };
  return {
    enteredValue,
    inputChangeHandler,
    inputBlurHandler,
    resetInputHandler,
    setIsTouched,
    isValid,
    hasError,
  };
};
export default useInput;
