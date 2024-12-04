import {useEffect} from "react";

export default function Timer (props){

    // eslint-disable-next-line react/prop-types
    const {seconds, setSeconds} = props;


    useEffect(() => {
        if (seconds > 0) {
            const timer = setInterval(() => setSeconds((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        }
    }, [seconds]);

    return (
        <div className="timer">
            <header className="timer-header">
                Time remaining: {seconds}
            </header>
        </div>
    );
};