import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useState } from "react";
import Product from "./Product";

const Container = styled.div``;
const Content = styled.div`
  width: 95%;
  margin: 10px auto;
`;
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-template-rows: repeat(auto-fit, 1fr);
  gap: 30px;
  width: 100%;
`;

const Title = styled.h1`
  margin: 20px 0;
`;
const Products = ({ item }) => {
  const [items, setItems] = useState([]);
  const fetchData = async (url) => {
    const response = await fetch(
      `https://fakestoreapi.com/products/category/${url}`
    );
    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    fetchData(item);
  }, [item]);

  return (
    <Container>
      <Content>
        {items.length > 0 && <Title>{item}</Title>}
        <Wrapper>
          {items.map((item) => (
            <Product key={item.id} item={item} />
          ))}
        </Wrapper>
      </Content>
    </Container>
  );
};

export default Products;
