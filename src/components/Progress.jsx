function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
    return (
        <header className="progress">
            <progress max={numQuestions} value={index} />
            <p>
                {/*  pour que le progress fonctionne  */}
                Question <strong>
                    {index + Number(answer !== null)}
                </strong> / {numQuestions}
            </p>
            <p>
                <strong>{points}</strong> / {maxPossiblePoints}
            </p>
        </header>
    );
}

export default Progress;
