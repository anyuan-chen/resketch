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
        <div className = "flex flex-row w-full">
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
          <img src = "https://i0.wp.com/thepostmansknock.com/wp-content/uploads/2014/12/laurel_leaves_tutorial-88-of-98.gif?resize=960%2C509&ssl=1" className = "w-96 h-96 rounded-3xl mt-8 ml-32"></img>
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
            background-size: 400% 400%;
            animation: gradient 100s ease infinite;
          }
          @keyframes gradient {
            0% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
            100% {
              background-position: 0% 50%;
            }
          }
        `}
      </style>
    </div>
  );
}
