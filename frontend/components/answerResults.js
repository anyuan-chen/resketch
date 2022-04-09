import React from 'react'
import styled from "styled-components"
import Title from "./title"
import SmallTitle from "./smallTitle"
import BodyText from "./body"
import Body from './body'
import Button from './button'

const ResponseContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; align-items: flex-start;
    min-height: 100vh;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
`;

const Background = styled.div`
    background: linear-gradient(
        248.94deg,
        #0e312b 0.98%,
        rgba(25, 74, 39, 0.7) 101.17%
    );
    height: 100vh; width: 100vw; 
`;

const ImageContainer = styled.div` 
    display: flex; 
    flex-direction: row; 
    align-items: left;
    justify-content: flex-start;
    margin-top: 2em; 
`;

const ImageHolder = styled.img`
    width: 436px; height: 389px;
    background: #FFFFFF;
    border-radius: 32px; margin-left: 150px; 
`;

const Description = styled.span`
    font-family: "Inter";
    font-style: normal;
    font-weight: 500;
    font-size: 32px;
    height: 400px; width: 436px; 
    color: #ffffff;
`;

const ButtonContainer = styled.div` 
    display: flex; 
    flex-direction: row; 
    margin-top: 2em; gap: 1em; 
    align-content: center;
`;

function ResponseType(props) {
    if(props.isCorrect) {
        return <SmallTitle children = "You got it right!"/>;
    }
    else return <SmallTitle children = "You got it wrong!"/>
}

export default function AnswerResults({correct, descriptionText}) {
    return <Background>
        <ResponseContainer>
            <ResponseType isCorrect = {correct}/> 
            <ImageContainer>
                <Description>{descriptionText}</Description>
                <ImageHolder></ImageHolder>
            </ImageContainer>
            <ButtonContainer>
                <Button children = "next question" dark = {false} width = "200"/>
                <Button children = "exit to score" dark = {true} width = "200"/>
            </ButtonContainer>
        </ResponseContainer>
    </Background>;
  }

