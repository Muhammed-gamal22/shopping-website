import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import Header from "./components/Header";
import styled from "styled-components";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import LoginPage from "./pages/LoginPage";

import { useSelector } from "react-redux";
const Container = styled.div`
  background-color: #fefefe;
  padding-top: 70px;

  width: 100%;
`;

const App = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <>
      <Header />
      <Container>
        <Routes>
          {token && <Route path="/" element={<Navigate to="/products" />} />}
          {!token && <Route path="/" element={<LoginPage />} />}

          {token && <Route path="/products" element={<HomePage />} />}
          {token && <Route path="/cart" element={<CartPage />} />}
          {token && (
            <Route
              path="/products/:productId"
              element={<ProductDetailsPage />}
            />
          )}
          {!token && <Route path="*" element={<Navigate to="/" />} />}
          {token && <Route path="*" element={<Navigate to="/products" />} />}
        </Routes>
      </Container>
    </>
  );
};

export default App;
