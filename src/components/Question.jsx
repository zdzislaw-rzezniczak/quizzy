import jsonQuestions from "../assets/questions.json";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Modal from "./Modal.jsx";

export default function Question(props) {
    const [questionsSet, setQuestionsSet] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [counter, setCounter] = useState(0);
    const [endGame, setEndGame] = useState(false);


    // eslint-disable-next-line react/prop-types
    const {seconds, setSeconds, showModal, setShowModal} = props;

    // Confirm the answer and proceed to the next question
    function confirmAnswer() {
        if (selectedAnswer === questionsSet[currentQuestion].answer) {
            setCounter(counter + 1);
        }
        if (currentQuestion < questionsSet.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer("");
        } else {
            setEndGame(true);
            setShowModal(true);
        }
    }

    // Reset the game and reshuffle questions
    function resetGame() {
        setQuestionsSet(shuffleQuestions(jsonQuestions));
        setCurrentQuestion(0);
        setEndGame(false);
        setCounter(0);
        setShowModal(false);
        setSeconds(60);
    }

    // Handle radio button changes
    function handleOptionChange(e) {
        setSelectedAnswer(e.target.value);
    }

    // Shuffle questions
    function shuffleQuestions(jsonFile) {
        const shuffled = [...jsonFile].sort(() => Math.random() - 0.5); // Shuffle array
        return shuffled.slice(0, 4); // Pick 4 questions
    }

    // Initial shuffle on component mount
    useEffect(() => {
        setQuestionsSet(shuffleQuestions(jsonQuestions));
    }, []);


    if (questionsSet.length === 0) return <p>Loading questions...</p>;

    return (
        <div className="question">
            <h1>Quiz Questions</h1>
            <div key={questionsSet[currentQuestion]?.index}>
                <h2>{questionsSet[currentQuestion]?.question}</h2>
                <fieldset className="question-fieldset">
                    {["A", "B", "C", "D"].map((option) => (
                        <div key={option}>
                            <input
                                className="answers-input"
                                type="radio"
                                id={option}
                                value={option}
                                name="quest"
                                checked={selectedAnswer === option}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor={option}>
                                {option}: {questionsSet[currentQuestion]?.[option]}
                            </label>
                        </div>
                    ))}
                </fieldset>

                <div className="question-button">
                    <button id="button-next" onClick={confirmAnswer}>Next</button>
                </div>

                </div>

            {endGame && showModal &&
                createPortal(
                    <Modal>
                        <h1>Quiz Completed!</h1>
                        <p>Your score: {counter}</p>
                        <div className="footer">
                            <button
                                onClick={() => {
                                    resetGame(); // Reset po kliknięciu w przycisk "Play Again"
                                }}
                            >
                                Play Again
                            </button>
                        </div>
                    </Modal>,
                document.body
                )}

            {seconds === 0 && createPortal(
                <Modal>

                    <h1>Quiz Completed!</h1>
                    <p>Time&apos;s Up</p>
                    <p>Your score: {counter}</p>
                    <div className="footer">
                        <button
                            onClick={() => {
                                resetGame(); // Reset po kliknięciu w przycisk "Play Again"
                            }}
                        >
                            Play Again
                        </button>
                    </div>
                </Modal>,
                document.body
            )}

        </div>
    );
}
