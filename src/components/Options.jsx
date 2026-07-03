function Options({ question }) {
    return (
        <div className="options">
            {/*  affichage des options avec map  */}
            {question.options.map((option) => (
                <button className="btn btn-option" key={option}>
                    {option}
                </button>
            ))}
        </div>
    );
}

export default Options;
