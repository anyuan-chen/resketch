import React from "react";
import styled from "styled-components";

const BodyText = styled.h1`
  font-family: "Inter";
  font-style: normal;
  font-weight: 500;
  font-size: 32px;
  color: #ffffff;
`;

export default function Body({ children }) {
  return <BodyText>{children}</BodyText>;
}
