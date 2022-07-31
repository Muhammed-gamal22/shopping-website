import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import { useSelector } from "react-redux";
const HomePage = React.lazy(() => import("./pages/HomePage"));
const CartPage = React.lazy(() => import("./pages/CartPage"));
const Header = React.lazy(() => import("./components/Header"));
const ProductDetailsPage = React.lazy(() =>
  import("./pages/ProductDetailsPage")
);
const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const Container = styled.div`
  background-color: #fefefe;
  padding-top: 70px;
  width: 100%;
`;

const App = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    <Suspense fallback={""}>
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
    </Suspense>
  );
};

export default App;
