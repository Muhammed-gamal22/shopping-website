import React from "react";
import styled from "styled-components";
import { AddShoppingCart, FavoriteBorderOutlined } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 7px;
  /* aspect-ratio: auto 1 / 1; */
  display: column;
`;
const ImgContainer = styled.div`
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 200px;
`;
const Title = styled.h2`
  font-size: 14px;
  margin: 10px 0;
`;
const Price = styled.span`
  font-size: 22px;
`;
const ProductBottom = styled.div`
  justify-self: end;
`;
const IconWrapper = styled.div`
  /* /margin-top: 10px; */
  text-align: right;
  cursor: pointer;
`;
const Product = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const price = `$ ${item.price.toFixed(2)}`;
  const addItemToCart = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        img: item.image,
        quantity: 1,
      })
    );
  };

  return (
    <Container>
      <ImgContainer onClick={() => navigate(`/products/${item.id}`)}>
        <Image src={item.image} />
      </ImgContainer>
      <Title>{item.title}</Title>
      <Price>{price}</Price>
      <ProductBottom>
        <IconWrapper>
          <IconButton>
            <AddShoppingCart onClick={addItemToCart} />
          </IconButton>
        </IconWrapper>
      </ProductBottom>
    </Container>
  );
};

export default Product;
