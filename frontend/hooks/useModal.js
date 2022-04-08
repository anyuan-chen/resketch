import React from "react";

const useModal = () => {
  const [isShowing, setIsShowing] = React.useState(false);
  const [text, setText] = React.useState("");
  const [name, setName] = React.useState("");
  function toggle() {
    setIsShowing(!isShowing);
  }
  function changeText(value) {
    setText(value);
  }
  function changeName(value) {
    setName(value);
  }
  return {
    isShowing,
    toggle,
    changeText,
    text,
    changeName,
    name,
  };
};
export default useModal;
