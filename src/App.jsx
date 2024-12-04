import Question from "./components/Question.jsx";
import Timer from "./components/Timer.jsx";
import {useState} from "react";


function App() {
    const [seconds, setSeconds] = useState(10);
    const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Question seconds={seconds} setSeconds={setSeconds} setShowModal={setShowModal} showModal={showModal}/>
        <Timer seconds={seconds} setSeconds={setSeconds} setShowModal={setShowModal} />
    </>
  )
}

export default App
