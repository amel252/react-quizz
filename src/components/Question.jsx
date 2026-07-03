import Options from "./Options";
function Question({ question, dispatch, answer }) {
    console.log(question);

    return (
        <div>
            {/* affichage de la question  */}
            <h4>{question.question}</h4>
            <Options question={question} dispatch={dispatch} answer={answer} />
        </div>
    );
}

export default Question;
