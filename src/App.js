import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import NewUser from "./pages/newUser/NewUser";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import OrderList from "./pages/orderList/OrderList";
import Order from "./pages/order/Order";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";

function App() {

  const admin = useSelector(state => state.user.currentUser ? state.user.currentUser.isAdmin : state.user.currentUser)
  
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path="/login" 
          element={admin ? <Navigate to="/"/> : <Login />}
        />
        <Route 
          path="/" 
          element={admin ? <Home /> : <Navigate to="/login"/>}
        />
        <Route 
          path="/users" 
          element={admin ? <UserList /> : <Navigate to="/login"/>}
        />
        <Route 
          path="/user/:userId" 
          element={admin ? <User /> : <Navigate to="/login"/>}
        />
        <Route 
          path="/newUser" 
          element={admin ? <NewUser /> : <Navigate to="/login"/>}
        />
        <Route 
          path="/products" 
          element={admin ? <ProductList /> : <Navigate to="/login"/>}
        />
        <Route 
          path="/product/:productId" 
          element={admin ? <Product /> : <Navigate to="/login"/>}
        />
        <Route 
          path="/newproduct" 
          element={admin ? <NewProduct /> : <Navigate to="/login"/>}
        />
        <Route 
          path="/orders" 
          element={admin ? <OrderList /> : <Navigate to="/login"/>}
        />
        <Route 
          path="/orders/:orderId" 
          element={admin ? <Order /> : <Navigate to="/login"/>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
