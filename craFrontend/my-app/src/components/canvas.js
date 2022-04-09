import { useEffect, useRef, useState } from "react";
import Button from "./button.js";

export default function Canvas() {
    const canvasRef = useRef(null);
    const ctxRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [lineWidth, setLineWidth] = useState(5);
    const [lineColor, setLineColor] = useState("black");
    const [lineOpacity, setLineOpacity] = useState(1);

    const [usingPencil, setUsingPencil] = useState(false);
    const [usingEraser, setUsingEraser] = useState(false);
    
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
        setLineWidth(50);
        setLineColor("white");
        setUsingPencil(false);
        setUsingEraser(true);
    }

    const changeToPencil = () => {
        setLineColor("black");
        setLineWidth(5);
        setUsingEraser(false);
        setUsingPencil(true);
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
        return <></>
    });

    const selectPencilDiv = (
        <div 
            className="h-1/2 flex bg-[#0E312B] justify-center items-center px-4 hover:cursor-pointer rounded-t-3xl select-none">
            <img src="../assets/Ellipse_inverted.svg" alt="Select Pencil" draggable="false"/>
        </div>
    );

    const defaultPencilDiv = (
        <div onClick={() => changeToPencil()} 
            className="h-1/2 flex border-b-2 border-b-black justify-center items-center px-4 hover:cursor-pointer select-none">
            <img src="../assets/Ellipse.svg" alt="Default Pencil" draggable="false"/>
        </div>
    );

    const selectEraserDiv = (
        <div
            className="h-1/2 flex bg-[#0E312B] justify-center items-center px-4 hover:cursor-pointer rounded-b-3xl select-none">
            <img src="../assets/Eraser_inverted.png" alt="Select Eraser" draggable="false"/>
        </div>
    );

    const defaultEraserDiv = (
        <div onClick={() => changeToEraser()}
            className="h-1/2 flex border-t-2 border-t-black justify-center items-center px-4 hover:cursor-pointer select-none">
            <img src="../assets/Eraser.png" alt="Default Eraser" draggable="false"/>
        </div>
    );

    const getCanvasName = () => {
        if(usingPencil) {
            return "rounded-3xl cursor-crosshair";
        }
        if(usingEraser) {
            return "rounded-3xl cursor-eraser";
        }
        return "rounded-3xl";
    }

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
                                    className={getCanvasName()}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col border-2 bg-white rounded-3xl">
                            {usingPencil? selectPencilDiv : defaultPencilDiv}
                            {usingEraser? selectEraserDiv : defaultEraserDiv}
                        </div>
                    </div>
                    <div className="flex w-full space-x-32 font-[Inter] font-bold">
                        <div className="flex w-full space-x-8">
                            {roundList}
                        </div>
                        <button onClick={() => {}}>
                            <Button children="Submit Drawing" width="320"/>
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