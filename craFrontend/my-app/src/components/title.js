import React from 'react'
import styled from "styled-components"

const TitleText = styled.h1`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 128px;   
    color: #FFFFFF;
    margin: 0 ;
`

export default function Title({children}) {
  return (
    <TitleText>{children}</TitleText>
  )
}
