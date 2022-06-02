import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { useLocation } from "react-router-dom";
import "./order.css";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { publicRequest } from "../../requestMethods";
import { updateOrders } from "../../redux/apiCalls";

export default function Product() {
    const location = useLocation()
    const dispatch = useDispatch();
    const orderId = location.pathname.split("/")[2];
    // const [pStats, setPStats] = useState([])
    const order = useSelector((state)=>
        state.order.orders.find((order) => order._id === orderId))
    const [inputs, setInputs] = useState({...order})
    const [proinputs, setProinputs] = useState([...order.products])
    const [proid,setProid] = useState(order.products[0].productId)
    const [pro,setPro] = useState()
    const [proinfo,setProinfo] = useState({})

    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };

    const handleproductChange = (e) => {
      setProinputs((prev) => {
        prev[prev.findIndex(item => item.time === pro)] = 
        {...prev[prev.findIndex(item => item.time === pro)], [e.target.name]: e.target.value }
        return prev;
      });
    };

    useEffect(()=>{
      const getProduct = async() =>{
        try{
            const res = await publicRequest.get("./products/find/"+proid)
            setProinfo(res.data)
        } catch{}
      }
      getProduct()
    },[proid])
    const handleUpdate = (e) => {
      e.preventDefault()
      const neworder = {...inputs, products: [...proinputs]};
      updateOrders(order._id, neworder, dispatch)
    }

    const Button = ({ type }) => {
      return <button className={"widgetLgButton " + type}>{type}</button>;
    };

  return (
    <div className="body" >
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="order">
          <div className="orderTitleContainer">
            <h1 className="orderTitle">Order</h1>
          </div>
          <div className="orderTop">
              <div className="orderTopLeft">
                  <div className="orderInfoTop">
                      <span className="orderName"><h3>Order Detail</h3></span>
                      <Button type={order.status} />
                  </div>
                  <div className="orderInfoBottom">
                      <div className="orderInfoItem">
                          <span className="orderInfoKey"><b>Oreder ID:</b></span>
                          <span className="orderInfoValue">{order._id }</span>
                      </div>
                      <div className="orderInfoItem">
                          <span className="orderInfoKey"><b>User Name: </b></span>
                          <span className="orderInfoValue">{order.username}</span>
                      </div>
                      <div className="orderInfoItem">
                          <span className="orderInfoKey"><b>User ID:</b></span>
                          <span className="orderInfoValue">{order.userId}</span>
                      </div>
                      <div className="orderInfoItem">
                          <span className="orderInfoKey"><b>Created At:</b></span>
                          <span className="orderInfoValue">{order.createdAt}</span>
                      </div>
                      <div className="orderInfoItem">
                          <span className="orderInfoKey"><b>Shipping Address:</b></span>
                          <span className="orderInfoValue">{order.address}</span>
                      </div>
                      <div className="orderInfoItem">
                          <span className="orderInfoKey"><b>Amount:</b></span>
                          <span className="orderInfoValue">{order.amount}</span>
                      </div>
                  </div>
              </div>
              <div className="orderTopRight">
              <form className="orderForm">
                <div className="orderFormLeft">
                  <label>Shipping Address</label>
                  <input name="address" type="text" placeholder={order.address} onChange={handleChange}/>
                  <label>Status</label>
                  <select name="status" id="status" onChange={handleChange}>
                  <option value={order.status} selected="selected">Choose</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="declined">Declined</option>
                  </select>
                </div>
              </form>
              <button onClick={handleUpdate} className="orderProductButton">Update</button>
              </div>
          </div>
          {order.products?.map(product => 
            <div className="orderBottom">
              <div className="orderProductInfo">
                <div className="info">
                  <div className="orderProductInfoItem">
                    <span className="orderInfoKey"><b>Ttile: </b>{product.title}</span>
                  </div>
                  <div className="orderProductInfoItem">
                    <span className="orderInfoKey"><b>Product ID: </b>{product.productId}</span>
                  </div>
                </div>
                <div className="orderFormRight">
                  <button onClick={handleUpdate} className="orderProductButton">Update</button>
                </div>
              </div>
              <div className="orderProductDetail">
                <img src={product.img} alt="" className="orderProductInfoImg" />
                <div className="orderProductDetails">
                  <form className="orderProductForm" >
                    <div className="orderFormLeft" style={{width: '20%'}}>
                      <label>Size</label>
                      <select name="size" id="size" onClick={()=>{setProid(product.productId); setPro(product.time)}} onChange={handleproductChange}>
                        <option defaultValue={product.size}>Choose</option>
                        {proinfo.size?.map(size =>
                          <option value={size}>{size}</option>
                        )}
                      </select>
                    </div>
                    <div className="orderFormLeft" style={{width: '20%'}}>
                      <label>Color</label>
                      <select name="color" id="color" onClick={()=>{setProid(product.productId); setPro(product.time)}} onChange={handleproductChange}>
                        <option value={product.color} selected="selected">Choose</option>
                        {proinfo.color?.map(color =>
                          <option value={color}>{color}</option>
                        )}
                      </select>
                    </div>
                  </form>
                  <div className="orderProductAmount">
                    <div className="orderProductInfoItem">
                      <span className="orderInfoKey"><b>Size: </b> {product.size}</span>
                    </div>
                    <div className="orderProductInfoItem">
                      <span className="orderInfoKey"><b>Color: </b>{product.color}</span>
                    </div>
                    <div className="orderProductInfoItem" style={{fontSize: '18px'}}>
                      <span className="orderInfoKey" style={{fontSize:'18px'}}> $ {product.price}  <b>x  {product.quantity}</b></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}