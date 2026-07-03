function Options({ question, dispatch, answer }) {
    const hasAnswered = answer !== null;
    return (
        <div className="options">
            {/*  affichage des options avec map  */}
            {question.options.map((option, index) => (
                <button
                    // les coditions pour avoir la couleur
                    className={`btn btn-option ${index === answer ? "answer" : ""}
                    ${
                        hasAnswered
                            ? index === question.correctOption
                                ? "correct"
                                : "wrong"
                            : ""
                    }`}
                    key={option}
                    disabled={hasAnswered}
                    onClick={() =>
                        dispatch({ type: "newAnswer", payload: index })
                    }
                >
                    {option}
                </button>
            ))}
        </div>
    );
}

export default Options;
