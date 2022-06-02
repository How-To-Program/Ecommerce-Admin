import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";
import { Link } from "react-router-dom";
import "./user.css";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateUsers } from "../../redux/apiCalls";

export default function User() {
  const location = useLocation()
  const dispatch = useDispatch();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state)=>
      state.user.users.find((user) => user._id === userId))
  const [input, setInput] = useState({...user})
  const [userorders, setUserOrders] = useState([])
  const handleChange = (e) => {
    setInput((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleUpdate = (e) => {
    const newuser = {...input};
    updateUsers(userId, newuser, dispatch)
  }
  useEffect(()=>{
    const getUserOrders = async() =>{
      try{
          const res = await userRequest.get("./orders/find/"+userId)
          setUserOrders(res.data)
          setUserOrders(prev => [...prev].sort((a,b) => b.time - a.time))
      } catch{}
    }
    getUserOrders()
  },[])
  console.log(userorders)
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="body" >
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
            <Link to="/newUser">
              <button className="userAddButton">Create</button>
            </Link>
          </div>
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <img
                  src={user.img || 
                    "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                  alt=""
                  className="userShowImg"
                />
                <div className="userShowTopTitle">
                  <span className="userShowUsername">{user._id}</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">Username: </span>
                  <span className="userShowInfoTitle" style={{margin: 'auto'}}>{user.username}</span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">ID: </span>
                  <span className="userShowInfoTitle"style={{margin: 'auto'}}>{user._id}</span>
                </div>
                <span className="userShowTitle">Authority</span>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">Is Admin: </span>
                  <span className="userShowInfoTitle" style={{margin: 'auto'}}>{user.isAdmin.toString()}</span>
                </div>
                <div className="authorityEdit">
                  <label className="userShowTitle">Authority Edit</label>
                  <select name="isAdmin" id="isAdmin" onChange={handleChange}>
                    <option defaultValue={user.isAdmin}>Choose</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </select>
                  <button className="userUpdateButton" onClick={handleUpdate}>Update</button>
                </div>
              </div>
            </div>
            <div className="userOrder">
              <span className="orderTitle">Past Orders</span>
              {userorders.map(order=>(
                <div className="orderCard">
                  <hr className="orderHr"/>
                  <div className="orderTop">
                    <div className="orderBasic">
                      <span className="orderId"><b>ID: </b>{order._id}</span>
                      <span className="orderCreatetime"><b>Creat Time: </b>{order.createdAt}</span>
                    </div>
                    <Button type={order.status} />
                  </div>
                  <div className="orderOtherInfo">
                    <span className="products">
                      {order.products?.map(product=>(
                        <img className="orderListImg" src={product.img} alt="" />
                      ))}
                    </span>
                    <span className="orderAmount">Amount: <b>{order.amount}</b></span>
                  </div>
                </div>
              ))}
              <hr className="orderHr"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
