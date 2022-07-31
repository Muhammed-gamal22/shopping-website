import React from "react";
import styled from "styled-components";
import { IconButton, Badge } from "@material-ui/core";
import { ShoppingCart, LockOutlined } from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AuthActions } from "../store/auth-slice";
import { fetchCartData } from "../store/cart-slice";

const Container = styled.header`
  width: 100%;
  height: 70px;
  background-color: #fff;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  z-index: 2;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
`;
const Left = styled.div``;
const Logo = styled.h1`
  background: linear-gradient(to bottom right, #ad31ad, #b38cb3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  cursor: pointer;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Header = () => {
  const quantity = useSelector((state) => state.cart.totalQuantity);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const logoutHandler = () => {
    dispatch(AuthActions.logout());
    dispatch(fetchCartData(true));
    navigate("/");
  };
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo onClick={() => navigate("/")}>
            <span>Woo</span>Commerce
          </Logo>
        </Left>
        <Right>
          {token && (
            <IconButton aria-label="cart">
              <Badge color="secondary" badgeContent={quantity || 0}>
                <ShoppingCart onClick={() => navigate("/cart")} />
              </Badge>
            </IconButton>
          )}
          {token && (
            <IconButton>
              <LockOutlined onClick={logoutHandler} />
            </IconButton>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Header;
