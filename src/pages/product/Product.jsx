import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import {productData} from "../../dummyData"
import { Publish } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProducts } from "../../redux/apiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase.js"

export default function Product() {
    const location = useLocation()
    const dispatch = useDispatch();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([])
    const product = useSelector((state)=>
        state.product.products.find((product) => product._id === productId))
    const [inputs, setInputs] = useState({...product})
    const [file, setFile] = useState(`${product.img}`)

    const handleChange = (e) => {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    };

    const MONTHS = useMemo(
        () => 
            [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Agu",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],[]);
    
    useEffect(() => {
        const getStats = async () => {
            try {
                    const res = await userRequest.get("./orders/income/" + productId);
                    const list = res.data.sort((a,b)=>{
                        return a._id - b._id
                    })
                    list.map((item) =>
                      setPStats((prev) => [
                        ...prev,
                        { name: MONTHS[item._id - 1], Sales: item.total },
                      ])
                    );
            } catch (err) {
                    console.log(err);
            };
        }
        getStats();
    }, [productId, MONTHS]);

    const handleClick = (e) => {
      e.preventDefault()
      const newproduct = {...inputs};
      updateProducts(product._id, newproduct, dispatch)
    }


  return (
    <div className="body" >
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
            <Link to="/newproduct">
              <button className="productAddButton">Create</button>
            </Link>
          </div>
          <div className="productTop">
              <div className="productTopLeft">
                  <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
              </div>
              <div className="productTopRight">
                  <div className="productInfoTop">
                      <img src={product.img} alt="" className="productInfoImg" />
                      <span className="productName">{product.title}</span>
                  </div>
                  <div className="productInfoBottom">
                      <div className="productInfoItem">
                          <span className="productInfoKey">id:</span>
                          <span className="productInfoValue">{product._id }</span>
                      </div>
                      <div className="productInfoItem">
                          <span className="productInfoKey">sales:</span>
                          <span className="productInfoValue">Dummy data</span>
                      </div>
                      <div className="productInfoItem">
                          <span className="productInfoKey">in stock:</span>
                          <span className="productInfoValue">{product.inStock ? "Yes" : "No"}</span>
                      </div>
                  </div>
              </div>
          </div>
          <div className="productBottom">
            <span className="productBottomTitle"><b>Edit</b></span>
            <form className="productForm">
              <div className="productFormLeft">
                <label>Product Name</label>
                <input name="title" type="text" placeholder={product.title} onChange={handleChange}/>
                <label>Product Description</label>
                <input name="desc" type="text" placeholder={product.desc} onChange={handleChange}/>
                <label>Price</label>
                <input name="price" type="text" placeholder={product.price} onChange={handleChange}/>
                <label>In Stock</label>
                <select name="inStock" id="idStock" onChange={handleChange}>
                  <option value={product.inStock} selected="selected">Choose</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
                  <div className="productFormRight">
                      <div className="productUpload">
                          <img src={product.img} alt="" className="productUploadImg" />
                          <label form="file">
                              <Publish/>
                          </label>
                          <input type="file" id="file" style={{display:"none"}} onChange={e=>setFile(e.target.files[0])}/>
                      </div>
                      <button onClick={handleClick} className="productButton">Update</button>
                  </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}
