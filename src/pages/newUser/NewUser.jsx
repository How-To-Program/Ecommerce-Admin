import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./newUser.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUsers } from "../../redux/apiCalls";
import {nanoid} from "nanoid";

export default function NewUser() {
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault()
    
    addUsers(inputs, dispatch)
  }



  const [inputs, setInputs] = useState([{uniid: nanoid(), isAdmin: false}])
  const [Id, setId] = useState(
      (inputs[0] && inputs[0].uniid) || ""
  )

  function createNew(e) {
    e.preventDefault()
    const newInputs = {
        username: '',
        email: '',
        password: '',
        isAdmin: false,
        uniid: nanoid()
    }
    setInputs(prevInputs => [newInputs, ...prevInputs])
    setId(newInputs.uniid)
  }

  const handleChange = (e) => {
    setInputs((prev) => prev.map(item => {
      return item.uniid === Id ? 
      { ...item, [e.target.name]: e.target.value } :
      item
    }));
  };

  function deleteUser(uniid) {
    setInputs(prev => prev.filter(item => item.uniid !== uniid))
  }


  console.log(inputs)
  return (
    <div className="body" >
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newUser">
          <div className="newUserWrapper">
            <h1 className="newUserTitle">New Users</h1>
            <button className="addNewuser" onClick={createNew}>+</button>
          </div>
          <div className="fromWrraper">
            {inputs?.map(item => 
            <div className="userCard" onClick={()=>setId(item.uniid)}>
              <form className="newUserForm">
                <div className="newUserItem">
                  <label>Username</label>
                  <input type="text" name="username" placeholder="john" value={item.username} onChange={handleChange}/>
                </div>
                <div className="newUserItem">
                  <label>Email</label>
                  <input type="email" name="email" placeholder="john@gmail.com" value={item.email} onChange={handleChange}/>
                </div>
                <div className="newUserItem">
                  <label>Password</label>
                  <input type="password" name="password" placeholder="password" value={item.password} onChange={handleChange}/>
                </div>
                <div className="newUserItem">
                  <label>Is Admin?</label>
                  <select name="isAdmin" id="isAdmin" value={item.isAdmin} onChange={handleChange}>
                  <option value="true" >True</option>
                  <option value="false">False</option>
                  </select>
                </div>
              </form>
              <button className="deleteNewuser" onClick={()=>{setId(item.uniid); deleteUser(item.uniid)}}>-</button>
              </div>
            )}
          </div>
          <button className="newUserButton" onClick={handleClick}>Create</button>
        </div>
      </div>
    </div>
  );
}
