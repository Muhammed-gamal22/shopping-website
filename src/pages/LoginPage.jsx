import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { AuthActions } from "../store/auth-slice";
import { useNavigate } from "react-router-dom";
import { cartActions, sendCartData } from "../store/cart-slice";
import useInput from "../hooks/use-input";
import Spinner from "react-spinkit";
import Modal from "../components/Modal";
import { useEffect } from "react";

const Container = styled.div`
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to bottom right, #ad31ad, #b38cb3);
`;

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  min-width: 40%;
  min-height: 50%;
  border-radius: 8px;
  color: #000;
`;
const Title = styled.h2`
  text-align: center;
  padding: 10px;
  background: linear-gradient(to bottom right, #ad31ad, #b38cb3);
  color: #fff;
  overflow: hidden;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 10%;
`;

const InputControl = styled.div`
  margin: 0 30px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 7px;
  background-color: transparent;
  outline: none;
  width: 100%;
  margin: 5px 0;
`;

const Button = styled.button`
  padding: 10px;
  border-radius: 7px;
  border: none;
  margin: 20px auto;
  width: 30%;
  cursor: pointer;
  outline: none;
  color: #fff;
  background: linear-gradient(to bottom right, #ad31ad, #b38cb3);
`;
const ErrorMessage = styled.p`
  color: red;
  margin: 5px;
`;
const Message = styled.p`
  text-align: center;
  padding: 10px;
`;

const MessageLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;
const LoginPage = () => {
  const {
    enteredValue: enteredEmail,
    hasError: emailError,
    inputBlurHandler: emailInputBlurHandler,
    inputChangeHandler: emailInputChangeHandler,
    resetInputHandler: resetEmailInputHandler,
    isValid: emailIsValid,
    setIsTouched: emailIsTouched,
  } = useInput((enteredValue) => enteredValue.includes("@"));
  const {
    enteredValue: enteredPassword,
    hasError: passwordError,
    inputBlurHandler: passwordInputBlurHandler,
    inputChangeHandler: passwordInputChangeHandler,
    resetInputHandler: resetPasswordInputHandler,
    isValid: passwordIsValid,
    setIsTouched: passwordIsTouched,
  } = useInput((enteredValue) => enteredValue.trim().length > 6);
  const [isLogging, setIsLogging] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const toggleInputHandler = () => {
    setIsLogging((prevState) => !prevState);
    resetEmailInputHandler();
    resetPasswordInputHandler();
  };

  let url;
  const submitHandler = async (e) => {
    e.preventDefault();

    // add validation
    if (!emailIsValid || !passwordIsValid) {
      emailIsTouched(true);
      passwordIsTouched(true);
      return;
    }

    if (isLogging) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAbPaIUAZ1RIb1PlDTKEQrGEWTHHqIG1r4";
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAbPaIUAZ1RIb1PlDTKEQrGEWTHHqIG1r4";
    }
    setIsLoading(true);
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      dispatch(AuthActions.login(responseData.idToken));
      navigate("/products");
    } else {
      const errorData = await response.json();
      setIsError(true);
      setErrorMessage(errorData.error.message);
      console.log(errorData);
    }
    setIsLoading(false);
    resetEmailInputHandler();
    resetPasswordInputHandler();
  };
  const removeErrorMessageHandler = () => {
    setIsError(false);
  };

  return (
    <>
      {isError && (
        <Modal
          title={errorMessage}
          desc="please,try again!!"
          text="ok"
          onConfirm={removeErrorMessageHandler}
        />
      )}
      <Container>
        <Wrapper>
          <Title>{isLogging ? "Login" : "Register"}</Title>
          <Form onSubmit={submitHandler}>
            <InputControl>
              <Input
                onChange={emailInputChangeHandler}
                placeholder="Email"
                value={enteredEmail}
                onBlur={emailInputBlurHandler}
              />
              {emailError && (
                <ErrorMessage>Email Must Be Contains @ Charachter</ErrorMessage>
              )}
            </InputControl>
            <InputControl>
              <Input
                onBlur={passwordInputBlurHandler}
                onChange={passwordInputChangeHandler}
                placeholder="Password"
                value={enteredPassword}
                type="password"
              />
              {passwordError && (
                <ErrorMessage>
                  Paswword Must Be At Least 6 charachters
                </ErrorMessage>
              )}
            </InputControl>
            <Button>
              {!isLoading && <span>{isLogging ? "Login" : "Register"}</span>}
              {isLoading && (
                <Spinner
                  name="circle"
                  color="white"
                  style={{ width: "20px", height: "20px", margin: "0px auto" }}
                />
              )}
            </Button>
          </Form>
          <Message>
            {isLogging
              ? "Don't you have an account ? "
              : "Do you have an account ? "}
            <MessageLink onClick={toggleInputHandler}>
              {isLogging ? "Signup Now" : "Login Now"}
            </MessageLink>
          </Message>
        </Wrapper>
      </Container>
    </>
  );
};

export default LoginPage;
