import React from "react";

const useModal = () => {
    const [isShowing, setIsShowing] = React.useState(false);
    const [text, setText] = React.useState("");
    function toggle() {
        setIsShowing(!isShowing);
    }
    function changeText(value) {
        setText(value);
    }
    return {
        isShowing,
        toggle,
        changeText,
        text
    }
}
export default useModal;