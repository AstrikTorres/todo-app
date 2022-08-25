import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import "./User.css";

function User({ username, logout, loading }) {
  return (
    <div className="user--container">
      <div className="user--avatar">
        <FaUserCircle className="user--icon"/>
        {
          (!loading) && 
          <p className="user--text">
            Hi, 
            <br/>
            <span className="user--username">
              {username}
            </span>
          </p>
        }
        {loading && 
          <span className="username--loading">
            Loading...
          </span>
        }
      </div>
      <div className="user--logout">
        <IoLogOutSharp 
          className="user--logout-icon" 
          onClick={logout} 
        />
        <span 
          className="user--logout-text" 
          onClick={logout}
        >
          Logout
        </span>
      </div>
    </div>
  );
}

export { User };
