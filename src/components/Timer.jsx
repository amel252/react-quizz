import { useEffect } from "react";

function Timer({ dispatch, secondsRemaining }) {
    //  ca nous donne les minutes
    const mins = Math.floor(secondsRemaining / 60);
    const seconds = secondsRemaining % 60;
    useEffect(
        function () {
            //  pur que le quizz s'arrete
            const id = setInterval(function () {
                dispatch({ type: "tick" });
            }, 1000);
            // on doir utiliser ca pour annuler le timer
            return () => clearInterval(id);
        },
        [dispatch],
    );

    return (
        <div className="timer">
            {/*  pour afficher le 0 avant les minutes et seconds aussi si moins de 10  */}
            {mins < 10 && "0"}
            {mins}:{seconds < 10 && "0"}
            {seconds}
        </div>
    );
}

export default Timer;
