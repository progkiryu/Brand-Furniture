import "../styles/Global.css"

function TableRow(order: any) {
    const { id, orderName, orderDesc } = order;

    return (
        <tr>
            <td>{id}</td>
            <td>{orderName}</td>
            <td>{orderDesc}</td>
        </tr>
    )
}

export default TableRow;