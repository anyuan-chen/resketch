import { useEffect, useRef, useState } from "react";
import Button from "./button.js";

export default function Canvas() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("black");
    const [lineOpacity, setLineOpacity] = useState(1);
    
    // Initialization when the component
    // mounts for the first time
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        ctx.globalAlpha = lineOpacity;
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = lineWidth;
        ctxRef.current = ctx;
    }, [lineColor, lineOpacity, lineWidth]);

    const changeToEraser = () => {
        console.log("hi");
        setLineWidth(50);
        setLineColor("white");
    }

    const changeToPencil = () => {
        setLineColor("black");
        setLineWidth(5);
    }
    
    // Function for starting the drawing
    const startDrawing = (e) => {
        ctxRef.current.beginPath();
        ctxRef.current.moveTo(
        e.nativeEvent.offsetX, 
        e.nativeEvent.offsetY
        );
        setIsDrawing(true);
    };
    
    // Function for ending the drawing
    const endDrawing = () => {
        ctxRef.current.closePath();
        setIsDrawing(false);
    };
    
    const draw = (e) => {
        if (!isDrawing) {
        return;
        }
        ctxRef.current.lineTo(
        e.nativeEvent.offsetX, 
        e.nativeEvent.offsetY
        );
        
        ctxRef.current.stroke();
    };

    const roundData = [ // dummy data
        {
            roundNumber: 1,
            state: "correct",
        },
        {
            roundNumber: 2,
            state: "incorrect",
        },
        {
            roundNumber: 3,
            state: "not answered",
        },
    ];

    const roundList = roundData.map((item) => {
        if(item.state === "correct") {
            return <div className="flex justify-center items-center w-1/3 bg-[#0E312B] rounded-xl text-white py-3.5"> 
                {item.roundNumber}
            </div>
        }
        if(item.state === "incorrect") {
            return <div className="flex justify-center items-center w-1/3 bg-[#9D9D9D] rounded-xl text-white py-3.5">  
                {item.roundNumber}
            </div>
        }
        if(item.state === "not answered") {
            return <div className="flex justify-center items-center w-1/3 bg-white rounded-xl text-black py-3.5 box-border"> 
                {item.roundNumber}
            </div>
        }
    });

    return (
        <div>
            <div id="over-container">
                <div className="flex flex-col justify-center items-center w-2/3 space-y-8">
                    <div className="flex items-center w-full bg-[#E9E9E9] rounded-xl px-4 font-[Inter]">
                        <div className="w-1/3 py-4 text-lg text-gray-500">
                            Round 1 out of 3:
                        </div>
                        <div className="w-1/3 text-center text-3xl">
                            draw a car
                        </div>
                        <div className="w-1/3 py-4"/>
                    </div>
                    <div className="flex space-x-8 w-full h-full">
                        <div className="pr-4">
                            <div className="bg-white rounded-3xl">
                                {/*<Menu
                                setLineColor={setLineColor}
                                setLineWidth={setLineWidth}
                                setLineOpacity={setLineOpacity}
                                />*/}
                                <canvas
                                    onMouseDown={startDrawing}
                                    onMouseUp={endDrawing}
                                    onMouseMove={draw}
                                    ref={canvasRef}
                                    width={`860px`} 
                                    height={`480px`}
                                    className="rounded-3xl"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col bg-white rounded-3xl">
                            <div onClick={() => changeToPencil()} 
                                className="h-1/2 flex border-b-2 border-b-black justify-center items-center px-4 hover:cursor-pointer">
                                <img src="../assets/Ellipse.svg"/>
                            </div>
                            <div onClick={() => changeToEraser()} 
                                className="h-1/2 flex border-t-2 border-t-black justify-center items-center px-4 hover:cursor-pointer"> 
                                <img src="../assets/Eraser.png"/>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full space-x-32 font-[Inter] font-bold">
                        <div className="flex w-full space-x-8">
                            {roundList}
                        </div>
                        <button onClick={() => {}}>
                            <Button width="320">Submit Drawing</Button>
                        </button>
                    
                    </div>
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
                `}
            </style>
        </div>
    )
}
