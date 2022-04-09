import React from 'react'
import styled from "styled-components"
import Title from "./title"
import SmallTitle from "./smallTitle"
import BodyText from "./body"
import Body from './body'
import Button from './button'
import LeaderboardEntry from './leaderboardentry'

const Background = styled.div`
    background: linear-gradient(
        248.94deg,
        #0e312b 0.98%,
        rgba(25, 74, 39, 0.7) 101.17%
    );
    height: 100vh; width: 100vw; 
`;

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column; 
    align-items: flex-start;
    justify-content: flex-start;
    gap: 2em; 
`;

export default function Leaderboard({position}) {
    const users = [
        {name: "user1", score: "2", total: "5"}, 
        {name: "user2", score: "3", total: "5"}, 
        {name: "user3", score: "4", total: "5"}, 
    ]
    let place = ""; 
    
    if(position == 1) { 
        place = "1st";
    } else if(position == 2) { 
        place = "2nd"; 
    } else if(position == 3) { 
        place = "3rd"; 
    } else place = position + "th";
     
    return <Background>
        <Container>
            <SmallTitle>
                You won {place}!
            </SmallTitle>
            {users.map((user, index) => {
                return <LeaderboardEntry key="index" name = {user.name} score = {user.score} total = {user.total} /> 
            })}
            <Button dark = {false} width = "300"> 
                <a href = "">back to main menu</a>
            </Button>
        </Container>
    </Background>;
  }
