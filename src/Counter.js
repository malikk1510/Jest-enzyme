import React from "react";

function App() {
  const [counterDisplay, setCounterDisplay] = React.useState(0);
  const [error, setError] = React.useState(false);

  const [data, setData] = React.useState("");

  const incrementCounter = () => {
    setError(false);
    setCounterDisplay(counterDisplay + 1);
  };

  const decrementCounter = () => {
    if (counterDisplay === 0) return setError(true);
    setCounterDisplay(counterDisplay - 1);
  };

  return (
    <div data-test="component-app">
      <h1 data-test="counter-display">
        Counter value is&nbsp;
        <span data-test="count">{counterDisplay}</span>
      </h1>
      <p data-test="error-message" className={`${error ? "" : "hidden"}`}>
        {" "}
        {error && "The counter cannot go below 0"}
      </p>
      <button data-test="increment-button" onClick={incrementCounter}>
        Increment
      </button>
      <button data-test="decrement-button" onClick={decrementCounter}>
        Deccrement
      </button>
      <div>
        {" "}
        <input
          data-test="input-box"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
          placeholder="Enter..."
        />
        <button
          onClick={(e) => {
            setData("");
          }}
          data-test="submit-button"
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default App;
