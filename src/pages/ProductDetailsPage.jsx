import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails";
import { useSelector, useDispatch } from "react-redux";
import { sendCartData, fetchCartData } from "../store/cart-slice";
import Spinner from "react-spinkit";
const Container = styled.div`
  width: 90%;
  margin: 30px auto;
`;
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 70px);
`;
let isInitial = true;
const ProductDetailsPage = () => {
  const params = useParams();
  const [item, setItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const fetchData = async () => {
    setIsLoading(true);
    const response = await fetch(
      `https://fakestoreapi.com/products/${params.productId}`
    );
    const data = await response.json();
    setItem(data);
    setIsLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart]);
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  return (
    <>
      {isLoading && (
        <Loading>
          <Spinner
            name="circle"
            color="purple"
            style={{ width: "40px", height: "40px" }}
          />
        </Loading>
      )}

      <Container>
        <ProductDetails item={item} />
      </Container>
    </>
  );
};

export default ProductDetailsPage;
