import { useState, useEffect } from "react";

function App() {
  const [ orders, setOrders ] = useState([]); 

  async function getOrders() {
    try {
      const rows: any = await window.orders.getOrders();
      const ordersArray: any = [];
      rows.forEach((row: any) => {
        ordersArray.push(row._doc);
      });
      setOrders(ordersArray);
      console.log(ordersArray);
    }
    catch (err) {
      throw err;
    }
  }

  useEffect(() => {
    return () => {
      const retrieve = async () => {
        try {
          await getOrders();
        }
        catch (err) {
          console.log(err);
        }
      }
      retrieve();
    } 
  }, []);

  return (
    <table>
        <thead>
          <tr>
            <th>Order Name</th>
            <th>Order Description</th>
          </tr>
        </thead>
        <tbody>
        {
            orders.map((order: Order) => {
                return <tr key={order._id}>
                    <td>{order.orderName}</td>
                    <td>{order.orderDesc}</td>
                </tr>
            })
        } 
        </tbody>
    </table>
  );
}

export default App;
