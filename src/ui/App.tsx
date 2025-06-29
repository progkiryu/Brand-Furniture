import { useState, useEffect } from "react";

function App() {
  const [ orders, setOrders ] = useState([]); 

  async function getOrders() {
    try {
      const result: any = await window.orders.getOrders();
      setOrders(result);
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
      <h1>welcome, bud!</h1>

      <table>
        <thead>
          <tr>
            <th>Order Name</th>
            <th>Order Description</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </>
  );
}

export default App;
