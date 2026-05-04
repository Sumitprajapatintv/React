import './App.css';
import { useState, useEffect } from 'react'

function App() {
  const [inputValue, setInputValue] = useState(1);
  const [changeto, setchangeto] = useState("EUR");
  const [changein, setchangein] = useState("USD");
  const [converted, setConverted] = useState("");
  // const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
  async function convert() {
    try {
      setIsLoading(true);

      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${inputValue}&from=${changeto}&to=${changein}`
      );

      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      setConverted(data.rates[changein]);

    } catch (err) {
      console.error("Error:", err.message);
      setConverted("Error");
    } finally {
      setIsLoading(false);
    }
  }

  if (changeto === changein) {
    setConverted(inputValue);
    return;
  }

  convert();
}, [inputValue, changeto, changein]);
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
