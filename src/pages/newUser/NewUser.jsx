import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./newUser.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUsers } from "../../redux/apiCalls";

export default function NewUser() {
  const [inputs, setInputs] = useState({})
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault()
    
    const user = {...inputs};
    addUsers(user, dispatch)
  }


  return (
    <div className="body" >
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newUser">
          <h1 className="newUserTitle">New User</h1>
          <form className="newUserForm">
            <div className="newUserItem">
              <label>Username</label>
              <input type="text" name="username" placeholder="john" onChange={handleChange}/>
            </div>
            <div className="newUserItem">
              <label>Email</label>
              <input type="email" name="email" placeholder="john@gmail.com" onChange={handleChange}/>
            </div>
            <div className="newUserItem">
              <label>Password</label>
              <input type="password" name="password" placeholder="password" onChange={handleChange}/>
            </div>
            <div className="newUserItem">
              <label>Is Admin?</label>
              <div className="newUserGender" onChange={handleChange}>
                <input type="radio" name="isAdmin" id="true" value="true" />
                <label for="true">Yes</label>
                <input type="radio" name="isAdmin" id="false" value="false" />
                <label for="false">No</label>
              </div>
            </div>
            <button className="newUserButton" onClick={handleClick}>Create</button>
          </form>
        </div>
      </div>
    </div>
  );
}
