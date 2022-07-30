import React from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 222;
`;
const Wrapper = styled.div`
  min-width: 400px;
  min-height: 150px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
  border-radius: 7px;
  z-index: 333;
`;
const Top = styled.div`
  padding: 10px;
  background: linear-gradient(to bottom right, #ad31ad, #b38cb3);
  padding: 10px;
`;
const Title = styled.h2`
  color: #fff;
`;
const Middle = styled.div`
  padding: 10px;
`;
const Desc = styled.p``;
const Bottom = styled.div`
  text-align: right;
  padding: 10px;
`;
const Button = styled.button`
  padding: 10px;
  background: linear-gradient(to bottom right, #ad31ad, #b38cb3);
  border: none;
  width: 70px;
  border-radius: 8px;
  cursor: pointer;
  color: #fff;
`;
const Overlay = (props) => {
  return (
    <Wrapper>
      <Top>
        <Title>{props.title}</Title>
      </Top>
      <Middle>
        <Desc>{props.desc}</Desc>
      </Middle>
      <Bottom>
        <Button onClick={props.onConfirm}>{props.text}</Button>
      </Bottom>
    </Wrapper>
  );
};
const Backdrop = (props) => {
  return <Container onClick={props.onConfirm} />;
};
const Modal = (props) => {
  return (
    <div>
      {ReactDom.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop")
      )}
      {ReactDom.createPortal(
        <Overlay
          onConfirm={props.onConfirm}
          text={props.text}
          title={props.title}
          desc={props.desc}
        />,
        document.getElementById("overlay")
      )}
    </div>
  );
};

export default Modal;
