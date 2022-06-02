import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import "./widgetLg.css";
import {format} from "timeago.js"
import { getOrders} from "../../redux/apiCalls";
import { useDispatch} from "react-redux"

export default function WidgetLg() {
  const [orders, setOrders] = useState([])

  useEffect(()=>{
    const getOrders = async ()=> {
      try{
        const res = await userRequest.get("orders/all")
        setOrders(res.data)
        setOrders(prev => [...prev].sort((a,b) => b.time - a.time))
      } catch {}
    }
    getOrders()
  },[])
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tbody>
          <tr className="widgetLgTr">
            <th className="widgetLgTh">Customer</th>
            <th className="widgetLgTh">Date</th>
            <th className="widgetLgTh">Amount</th>
            <th className="widgetLgTh">Status</th>
          </tr>
        </tbody>
        {orders.map(order => (
          <tbody key={order._id}>
            <tr className="widgetLgTr">
              <td className="widgetLgUser">
                <span className="widgetLgName">{order.username}</span>
              </td>
              <td className="widgetLgDate">{format(order.createdAt)}</td>
              <td className="widgetLgAmount">${order.amount}</td>
              <td className="widgetLgStatus">
                <Button type={order.status} />
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
}
