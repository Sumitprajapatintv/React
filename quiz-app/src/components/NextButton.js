function NextButton({ answer, dispatch, numQuestion, index }) {
  if (answer == null) return null;

  if (index < numQuestion - 1) {
    return (
      <>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "nextQuestion" })}
        >
          Next Question
        </button>
      </>
    );
  }

  if (index === numQuestion - 1) {
    return (
      <>
        {" "}
        <button
        className="btn btn-ui"
          onClick={() => dispatch({ type: "finished" })}
        >
        Finish Quiz
        </button>
      </>
    );
  }
}
export default NextButton;
