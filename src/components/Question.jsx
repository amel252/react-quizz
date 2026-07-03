import Options from "./Options";
function Question({ question }) {
    console.log(question);

    return (
        <div>
            {/* affichage de la question  */}
            <h4>{question.question}</h4>
            <Options question={question} />
        </div>
    );
}

export default Question;
