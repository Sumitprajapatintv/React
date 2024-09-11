import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [inputValue, setInputValue] = useState(1);
  const [changeto, setchangeto] = useState("EUR");
  const [changein, setchangein] = useState("USD");
  const [converted, setConverted] = useState("");
  // const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function convert() {
        console.log('inputValue', inputValue);
        console.log(changeto);
        console.log(changein);
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${inputValue}&from=${changeto}&to=${changein}`
        );
        const data = await res.json();
        console.log('data', data);
        setConverted(data.rates[changein]);
        setIsLoading(false);
      }

      if (changeto === changein) return setConverted(inputValue);
      convert();
    },
    [inputValue, changeto, changein]
  );
  return (
    <div>
      <input type="text" value={inputValue} onChange={(e) => setInputValue(Number(e.target.value))} disabled={isLoading} />
      <select value={changeto} onChange={(e) => setchangeto(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={changein} onChange={(e) => setchangein(e.target.value)} disabled={isLoading}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{converted} {changein}</p>
    </div>
  );
}

export default App;
