

import Body from "../components/body";
import Button from "../components/button";
import Modal from "../components/modal";
import Title from "../components/title";
import useModal from "../hooks/useModal";
export default function Home() {

  const { isShowing, toggle, text, changeText, name, changeName } = useModal();

  return (
    <div>
      <Modal
        isShowing={isShowing}
        toggle={toggle}
        text={text}
        changeText={changeText}
        name={name}
        changeName={changeName}
      ></Modal>
      <div id="background">
        <div className="flex flex-col space-y-8">
          <Title>resketch.</Title>
          <Body>
            unleash your creativity. <br></br> sketch now.
          </Body>
          <div className="flex space-x-8">
            <Button>join a game</Button>
            <div onClick={toggle}>
              <Button dark={true}>enter a private room</Button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <style jsx>
        {`
          #background {
            height: 100vh;
            width: 100vw;
            padding: 160px;
            background: linear-gradient(
              248.94deg,
              #0e312b 0.98%,
              rgba(25, 74, 39, 0.7) 101.17%
            );
          }
        `}
      </style>
    </div>
  );
}
