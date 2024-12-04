import "../Modal.css";
import jsonQuestions from "../assets/questions.json";

export default function Modal(props) {

    const {children} = props

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                    {children}
            </div>
        </div>
    );
}
