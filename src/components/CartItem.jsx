import React from "react";
import styled from "styled-components";
import { Add, Remove } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-bottom: 1px solid #ccc;
`;
const ImgContainer = styled.div`
  flex: 1;
`;
const Image = styled.img`
  width: 40%;
`;
const Info = styled.div`
  flex: 1;
`;
const Title = styled.h2`
  margin-bottom: 10px;
`;
const Quantity = styled.span``;
const Counter = styled.div`
  flex: 2;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: end;
`;
const Amount = styled.span`
  margin: 0px 10px;
`;
const CartItem = ({ cartItem }) => {
  const dispatch = useDispatch();
  const removeItemHandler = () => {
    if (cartItem.quantity > 0) {
      dispatch(cartActions.removeItem(cartItem.id));
    }
  };
  const addItemHandler = () => {
    dispatch(
      cartActions.addItem({
        id: cartItem.id,
        price: cartItem.price,
        quantity: 1,
      })
    );
  };
  return (
    <Container>
      <ImgContainer>
        <Image src={cartItem.img} />
      </ImgContainer>
      <Info>
        <Title>{cartItem.title}</Title>
        <Quantity>{cartItem.quantity} X </Quantity>
      </Info>
      <Counter>
        <Add
          style={{
            cursor: "pointer",
            padding: "5px",
            border: "1px solid purple",
            "border-radius": "8px",
          }}
          onClick={addItemHandler}
        />
        <Amount>{cartItem.quantity}</Amount>
        <Remove
          style={{
            cursor: "pointer",
            padding: "5px",
            border: "1px solid purple",
            "border-radius": "8px",
          }}
          onClick={removeItemHandler}
        />
      </Counter>
    </Container>
  );
};

export default CartItem;
