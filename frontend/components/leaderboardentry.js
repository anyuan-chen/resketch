import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  background: #82A08A;
  border-radius: 16px;
  padding: 8px 32px;
`;
const Text = styled.h2`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 48px;
  display: flex;
  align-items: center;
  color: #ffffff;
`;
export default function LeaderboardEntry({ name, score, total }) {
  return (
    <Container>
      <Text>{name}</Text>
      <Text>{`${score} of ${total}`}</Text>
    </Container>
  );
}
