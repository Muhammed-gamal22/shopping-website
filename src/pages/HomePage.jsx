import React, { Fragment } from "react";
import Header from "../components/Header";
import Products from "../components/Products";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Spinner from "react-spinkit";
import { fetchCartData, sendCartData } from "../store/cart-slice";
import { useSelector, useDispatch } from "react-redux";
const Loading = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 70px);
  justify-content: center;
  align-items: center;
`;
let isInitial = true;
const HomePage = () => {
  const cart = useSelector((state) => state.cart);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://fakestoreapi.com/products/categories"
      );

      if (!response.ok) {
        throw new Error("fetch data from server failed!");
      }
      const responseData = await response.json();
      setData(responseData);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);
  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);
  return (
    <Fragment>
      {isLoading && (
        <Loading>
          <Spinner
            name="circle"
            color="purple"
            style={{ width: "40px", height: "40px" }}
          />
        </Loading>
      )}
      {!isLoading && data.map((item) => <Products item={item} />)}
    </Fragment>
  );
};

export default HomePage;
