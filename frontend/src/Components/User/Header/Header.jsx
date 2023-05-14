import React from "react";
import "./Header.css";
import { useNavigate,Link } from "react-router-dom";
import { useCookies } from "react-cookie";
function Header({userName}) {
  const [cookies, setCookie, removeCookie] = useCookies();
  
  const navigate = useNavigate();
 const userLogOut =()=>{
  for (const cookieName in cookies) {
    removeCookie(cookieName);
  }
  navigate('/login')

 }
  return (
   
    <header>
      <div className="logo">My Ecommerce Store</div>
      <div className="login-buttons">
        {userName &&
        <Link to={'/profile'}>
        <button className="login">{userName ? userName : "Login"}</button>
        </Link>}
        {userName && (
          <button className="logout" onClick={userLogOut} >
            Log Out
          </button>
        )}
      </div>
    </header>
    
  );
}

export default Header;
