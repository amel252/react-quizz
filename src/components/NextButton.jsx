function NextButton({ dispatch, answer, numQuestions, index }) {
    if (answer === null) return null;
    //  faire une condition si le nombre de question arrive à L'index 14
    if (index < numQuestions - 1)
        return (
            <div>
                <button
                    className="btn btn-ui"
                    onClick={() => dispatch({ type: "nextQuestion" })}
                >
                    Next
                </button>
            </div>
        );
    //  question avec index 14 on veux afficher un btn
    if (index === numQuestions - 1)
        return (
            <div>
                <button
                    className="btn btn-ui"
                    onClick={() => dispatch({ type: "finish" })}
                >
                    Finish
                </button>
            </div>
        );
}

export default NextButton;
