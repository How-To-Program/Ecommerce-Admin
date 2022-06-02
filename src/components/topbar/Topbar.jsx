import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { logOut } from '../../redux/apiCalls'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom";

export default function Topbar() {
  const dispatch = useDispatch();
  const handleClick = (e) =>{
    e.preventDefault()
    logOut(dispatch)
  }
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
        <Link to="/" className="link">
          <span className="logo">YT . Admin</span>
        </Link>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings />
          </div>
          <img src="https://images.pexels.com/photos/1526814/pexels-photo-1526814.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" className="topAvatar" />
          <div onClick={handleClick} className="logout" >LOGOUT</div>
        </div>
      </div>
    </div>
  );
}
