import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import {
  cartActions,
  fetchCartData,
  resetCartData,
  sendCartData,
} from "../store/cart-slice";
import CartItem from "../components/CartItem";
import Modal from "../components/Modal";
const Container = styled.div`
  width: 98%;
  margin: 30px auto;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  @media screen and (max-width: 991px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
const Info = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  flex: 2;
`;

const Checkout = styled.div`
  flex: 1;
  text-align: center;
  padding: 10px;
  border: 1px solid purple;
  margin-left: 50px;

  @media screen and (max-width: 991px) {
    margin-left: 0px;
    margin-top: 10px;
  }
`;
const CheckoutTitle = styled.h3``;

const List = styled.ul`
  list-style: none;
  padding-left: 0;
  margin: 20px 0;
`;
const ListItem = styled.li`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;
const ListTitle = styled.h3`
  flex: 2;
  text-align: left;
`;
const ListData = styled.span`
  flex: 1;
  text-align: right;
`;
const TotalAmount = styled.h2`
  text-align: left;
`;
const Button = styled.button`
  width: 100%;
  border: none;
  padding: 10px;
  background-color: purple;
  color: #fff;
  border-radius: 8px;
  margin-top: 10px;
  cursor: pointer;
`;
const Notification = styled.p`
  text-align: center;
`;
let isInitial = true;

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [isDone, setIsDone] = useState(false);

  const confirmHandler = () => {
    setIsDone(false);
  };
  const addOrderHandler = async () => {
    const response = await fetch(
      "https://products-app-64dbc-default-rtdb.firebaseio.com/orders.json",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart.items, AllPrice: cart.AllPrice }),
      }
    );
    if (response.ok) {
      setIsDone(true);
      dispatch(fetchCartData(true));
    }
  };
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
    <>
      {isDone && (
        <Modal
          onConfirm={confirmHandler}
          title="Done"
          desc="The Order Is Sent Successuflly"
          text="ok"
        />
      )}
      <Container>
        <Wrapper>
          <Info>
            {cart.items.length === 0 && (
              <Notification>No Items Added Yet </Notification>
            )}
            {cart.items.map((cartItem) => (
              <CartItem cartItem={cartItem} />
            ))}
          </Info>
          <Checkout>
            <CheckoutTitle>Checkout</CheckoutTitle>
            <List>
              {cart.items.map((item) => (
                <ListItem>
                  <ListTitle>{item.title}</ListTitle>
                  <ListData>$ {item.totalPrice.toFixed(2)}</ListData>
                </ListItem>
              ))}
            </List>
            <TotalAmount>
              Total Amount : $ {cart.AllPrice.toFixed(2)}
            </TotalAmount>
            {cart.items.length > 0 && (
              <Button onClick={addOrderHandler}>Order Now</Button>
            )}
          </Checkout>
        </Wrapper>
      </Container>
    </>
  );
};

export default CartPage;
