import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    window.api.greeting();
  }, []);

  return (
    <>
      <h1>are we cooked?</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          hol up, let him cook
        </button>
        <h3> times cooked: {count} </h3>
      </div>
    </>
  );
}

export default App;
