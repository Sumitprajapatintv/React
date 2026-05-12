function Options({ question, answer, dispatch }) {
  const hasAnswered = answer != null;
  return (
    <div className="options">
      {question.options.map((ans, index) => (
         <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={ans}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {ans}
        </button>
      ))}
    </div>
  );
}
export default Options;
