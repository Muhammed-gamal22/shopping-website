import React from "react";
import styled from "styled-components";
import { ShoppingCartOutlined } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cart-slice";
const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  width: 100%;
  justify-items: center;
  align-items: center;
  justify-content: center;
  gap: 50px;
`;
const ImgContainer = styled.div``;
const Image = styled.img`
  width: 100%;
  height: 400px;
`;
const Info = styled.div``;
const Title = styled.h2``;
const Desc = styled.p`
  margin: 20px 0;
  color: #b6adad;
  line-height: 25px;
`;
const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
  align-items: center;
  margin-top: 30px;
  @media screen and (max-width: 500px) {
    flex-direction: column;
    width: 100%;
  }
`;
const Price = styled.h2``;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: purple;
  color: #fff;
  cursor: pointer;
  @media screen and (max-width: 500px) {
    width: 100%;
    margin-top: 10px;
  }
`;
const ProductDetails = ({ item }) => {
  const price = `$ ${item.price}`;
  const dispatch = useDispatch();
  const addCartHandler = () => {
    dispatch(
      cartActions.addItem({
        id: item.id,
        img: item.image,
        price: item.price,
        quantity: 1,
        title: item.title,
      })
    );
  };
  return (
    <Container>
      <ImgContainer>
        <Image src={item.image} />
      </ImgContainer>
      <Info>
        <Title>{item.title}</Title>
        <Desc>{item.description}</Desc>
        {item.title && (
          <PriceWrapper>
            <Price>{price}</Price>
            <Button onClick={addCartHandler}>
              <ShoppingCartOutlined />
              Add To Cart
            </Button>
          </PriceWrapper>
        )}
      </Info>
    </Container>
  );
};

export default ProductDetails;
