import "./AdminHeader.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
function Header({adminName}) {
  const navigate=useNavigate()
  const [cookies, setCookie, removeCookie] = useCookies();
const adminLogout=()=>{
  for (const cookieName in cookies) {
    removeCookie(cookieName);
  }
  navigate('/admin/login')
}
  
  return (
    <div className="header">
      <h1>Admin Dashboard</h1>
      <div className="login-logout" onClick={adminLogout}>
        <button className="logout" >
          {adminName?  "Log Out":"Log In"}
         
        </button>
      </div>
    </div>
  );
}

export default Header;
