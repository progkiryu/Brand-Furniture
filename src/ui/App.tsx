import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  async function getOrders() {
    try {
      const orders: Order = await window.orders.getOrders();
      console.log(orders);
    }
    catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getOrders();
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
