import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";import "./orderList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";
import { getOrders, deleteOrders} from "../../redux/apiCalls";

export default function OrederList() {
  const dispatch = useDispatch();
  const order = [...useSelector((state)=>state.order.orders)].sort((a,b) => b.time - a.time)
  const [disorder, setDisorder] = useState([])

  const handleDelete = (id) => {
    deleteOrders(id,dispatch)
  };
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
  
  useEffect(()=>{
    getOrders(dispatch)
  },[dispatch])
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  const columns = [
    { field: "_id", headerName: "OrderId", width: 220 },
    { field: "username", headerName: "Username", width: 150 },
    {
      field: "product",
      headerName: "Preview",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="orderListItem">
            {params.row.products.map(product=>
              <img className="orderListImg" src={product.img} alt="" />)}
          </div>
        );
      },
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 160,
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
      renderCell: (params) => {
        return (
          <Button type={params.row.status} />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/orders/" + params.row._id}>
              <button className="orderListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="orderListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="body" >
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="orderList">
          <DataGrid
            rows={order || orders}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row)=>row._id}
            pageSize={11}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
