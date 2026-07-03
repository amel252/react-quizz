function FinishScreen({ points, maxPossiblePoints, highscore }) {
    const percentage = (points / maxPossiblePoints) * 100;

    let emoji;
    if (percentage === 100) emoji = "🥇";
    if (percentage >= 80 && percentage < 100) emoji = "🎉";
    if (percentage >= 50 && percentage < 80) emoji = "🥳";
    if (percentage >= 0 && percentage < 50) emoji = "🤔";

    if (percentage === 0) emoji = "😞";

    return (
        <div>
            <p className="result">
                <span>{emoji}</span> You Scored <strong>{points}</strong> out of{" "}
                {maxPossiblePoints}({Math.ceil(percentage)}%)
            </p>
            <p className="highscore">(Highscore: {highscore} )</p>
        </div>
    );
}

export default FinishScreen;
