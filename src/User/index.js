import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import "./User.css";

function User({ username, logout, loading, isLoged }) {
  return (
    <div className="user--container">
      <div className="user--avatar">
        <FaUserCircle className="user--icon"/>
        {
          !loading && (
            isLoged ? (
              <p className="user--text">
                Hi, 
                <br/>
                <span className="user--username">
                  {username}
                </span>
              </p>
            ) : (
              <span>
                login to save list
              </span>
            )
          )
        }
        {loading && 
          <span className="username--loading">
            Loading...
          </span>
        }
      </div>
      <div className="user--logout">
        {!loading && (
          <>
            <IoLogOutSharp 
              className="user--logout-icon" 
              onClick={logout} 
            />
            <span 
              className="user--logout-text" 
              onClick={logout}
            >
              { !isLoged ? "login" : "logout" }
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export { User };
