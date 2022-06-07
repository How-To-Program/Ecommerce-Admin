import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";import "./userList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { userRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUsers, deleteUsers } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux"
import { userRequest } from "../../requestMethods";
export default function UserList() {
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.user.users)

  const [users, setUsers] = useState([])

  useEffect(()=>{
    const getUsers = async ()=> {
      try{
        const res = await userRequest.get("users/all?new=true")
        setUsers(res.data)
      } catch {}
    }
    getUsers()
  },[])

  useEffect(()=>{
    getUsers(dispatch)
  },[dispatch])
  const handleDelete = (id) => {
    deleteUsers(id,dispatch)
  };

  
  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "user",
      headerName: "User",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img className="userListImg" src={params.row.img || 
                "https://i.ibb.co/GVWn5zF/OIP.webp"} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <span>Active</span>
        );
      },
    },
    {
      field: "isAdmin",
      headerName: "Is Admin",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row._id}>
              <button className="userListEdit">Details</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
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
        <div className="userList">
          <DataGrid
            rows={user || users}
            disableSelectionOnClick
            columns={columns}
            getRowId={(row)=>row._id}
            pageSize={10}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
