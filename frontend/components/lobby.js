/* eslint-disable react/no-children-prop */
/* eslint-disable react/jsx-key */
import React, { useState } from 'react';
import SmallTitle from './smallTitle';
import Body from './body';
import Button from './button';

export default function Lobby({players}) {    
    const playerList = players.map((player) => 
        <Body>{player.name}</Body>
    );
    return (
        <div>
            <div id="over-container">
                <div className="flex flex-col justify-center w-2/3 space-y-10">
                    <div className="w-full text-white text-6xl font-bold font-[Inter]">
                        <SmallTitle children={"Lobby"}/>
                    </div>
                    <div className="bg-[#82A08A] w-full rounded-3xl h-[440px] px-14 py-8">
                        <div className="flex flex-wrap h-full w-full space-x-28">
                            {playerList}
                        </div>
                    </div>
                    <button onClick={() => {}}>
                        <Button children={"start the game!"} width="245"/>
                    </button>
                </div>
            </div>
            <style jsx>
                {`  
                    #over-container{
                        min-height: 100vh; 
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        background: linear-gradient(
                            248.94deg,
                            #0e312b 0.98%,
                            rgba(25, 74, 39, 0.7) 101.17%
                        );
                    }
                    .container {
                        width: 100%;
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-start;
                        align-items:center;
                    }
                `}
            </style>
        </div>
    )
}
