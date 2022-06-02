import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
// import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteProducts, getProducts } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../../requestMethods";

export default function ProductList() {
  // const [data, setData] = useState(productRows);
  const dispatch = useDispatch();
  const product = useSelector((state)=>state.product.products)

  const [products, setProducts] = useState([])

  useEffect(()=>{
    const getProducts = async ()=> {
      try{
        const res = await userRequest.get("products/all?new=true")
        setProducts(res.data)
      } catch {}
    }
    getProducts()
  },[])

  useEffect(()=>{
    getProducts(dispatch)
  },[dispatch])

  const handleDelete = (id) => {
    deleteProducts(id,dispatch)
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 220 },
    {
      field: "product",
      headerName: "Product",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "inStock", headerName: "Stock", width: 200 },
    {
      field: "price",
      headerName: "Price",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/product/" + params.row._id}>
              <button className="productListEdit">Details</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
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
        <div className="productList">
          <DataGrid
            rows={product || products}
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
