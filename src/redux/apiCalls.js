import { 
  loginStart, 
  loginSuccess, 
  loginFailure,
  logout,
  getUserStart, 
  getUserSuccess, 
  getUserFailure, 
  updateUserStart, 
  updateUserSuccess, 
  updateUserFailure,
  addUserStart, 
  addUserSuccess, 
  addUserFailure, 
} from "./userRedux";
import { publicRequest,userRequest } from "../requestMethods";
import { 
  productLogout,
  getProductStart, 
  getProductSuccess, 
  getProductFailure, 
  deleteProductStart, 
  deleteProductSuccess, 
  deleteProductFailure,
  updateProductStart, 
  updateProductSuccess, 
  updateProductFailure,
  addProductStart, 
  addProductSuccess, 
  addProductFailure,  
} from "./productRedux";
import { 
  orderLogout,
  getOrderStart, 
  getOrderSuccess, 
  getOrderFailure, 
  deleteOrderStart, 
  deleteOrderSuccess, 
  deleteOrderFailure,
  updateOrderStart, 
  updateOrderSuccess, 
  updateOrderFailure,
  addOrderStart, 
  addOrderSuccess, 
  addOrderFailure,  
} from "./orderRedux";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await userRequest.post("/auth/adlogin", user);
    const token = res.data.accessToken
    userRequest.interceptors.request.use(function (config) {
        config.headers.token = 'Bearer ' + token
      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const logOut = async (dispatch) => {
  dispatch(logout());
  dispatch(productLogout());
  dispatch(orderLogout());
};

export const getUsers = async (dispatch) => {
  dispatch(getUserStart());
  try {
    const res = await userRequest.get("/users/all");
    dispatch(getUserSuccess(res.data));
  } catch (err) {
    dispatch(getUserFailure());
  }
};

export const deleteUsers = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/users/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const addUsers = async (users, dispatch) => {
  dispatch(addUserStart());
  try {
    for(let user of users){
      const res = await userRequest.post(`/auth/register`, user);
      dispatch(addUserSuccess(res.data));
    }
  } catch (err) {
    dispatch(addUserFailure());
  }
};

export const getProducts = async (dispatch) => {
  dispatch(getProductStart());
  try {
    const res = await publicRequest.get("/products/all");
    dispatch(getProductSuccess(res.data));
  } catch (err) {
    dispatch(getProductFailure());
  }
};

export const deleteProducts = async (id, dispatch) => {
  dispatch(deleteProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    dispatch(deleteProductSuccess(id));
  } catch (err) {
    dispatch(deleteProductFailure());
  }
};

export const updateProducts = async (id, product, dispatch) => {
  dispatch(updateProductStart());
  try {
    // const res = await userRequest.delete(`/products/${id}`);
    const res = await userRequest.put(`/products/${id}`, { id, product });
    // const res = await userRequest.post(`/products`, product);
    dispatch(updateProductSuccess({ id, product }));
  } catch (err) {
    dispatch(updateProductFailure());
  }
};

export const addProducts = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await userRequest.post(`/products`, product);
    dispatch(addProductSuccess(res.data));
  } catch (err) {
    dispatch(addProductFailure());
  }
};

export const getOrders = async (dispatch) => {
  dispatch(getOrderStart());
  try {
    const res = await userRequest.get("/orders/all");
    dispatch(getOrderSuccess(res.data));
  } catch (err) {
    dispatch(getOrderFailure());
  }
};

export const updateOrders = async (id, order, dispatch) => {
  dispatch(updateOrderStart());
  try {
    const res = await userRequest.put(`/orders/${id}`, {order });
    dispatch(updateOrderSuccess({ id, order }));
  } catch (err) {
    dispatch(updateOrderFailure());
  }
};

export const deleteOrders = async (id, dispatch) => {
  dispatch(deleteOrderStart());
  try {
    const res = await userRequest.delete(`/orders/${id}`);
    dispatch(deleteOrderSuccess(id));
  } catch (err) {
    dispatch(deleteOrderFailure());
  }
};

export const updateUsers = async (id, user, dispatch) => {
  dispatch(updateUserStart());
  try {
    const res = await userRequest.put(`/users/${id}`, {user});
    dispatch(updateUserSuccess({id, user}));
  } catch (err) {
    dispatch(updateUserFailure());
  }
};