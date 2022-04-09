import React from "react";
import styled from "styled-components";
//button template

const Container = styled.div`
  color: ${(props) => (props.dark ? "white" : "#245F3F")};
  background-color: ${(props) => (props.dark ? "#13362E" : "white")};
  padding: 14px 28px;
  border-radius: 16px;
  cursor: pointer;
  font-size: 24px;
  text-align: center;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  transition: 0.5s; 
  width: ${(props) =>
    props.width !== undefined ? `${props.width}px` : "auto"};
  &:hover { 
    box-shadow: 0 0.5em 0.5em -0.4em #121610;
    transform: translateY(-0.15em);
  }
`;

export default function Button({ children, dark, width }) {
  return (
    <Container dark={dark} width={width}>
      {children}
    </Container>
  );
}

//sample usage <Button dark={true}> hi! </Button>
