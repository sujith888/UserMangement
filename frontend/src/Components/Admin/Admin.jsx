import React, { Fragment, useEffect, useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../Admin/AdminHeader/AdminHeader";
import axios from "axios";
function AdminDashboard() {
  const [userData, setuserData] = useState([]);
 const [searchData, setsearchData] = useState('')
  const [adminName, setadminName] = useState('')
  const [adminAccessToken, setadminAccessToken] = useState("");
  const [adminRefreshToken, setadminRefreshToken] = useState("");
 const navigate=useNavigate();
  useEffect(() => {

  
      const cookies = document.cookie.split(";");
      let adminAccessToken = "";
      let adminRefreshToken = "";
  
      cookies.forEach((cookie) => {
        const cookieName = cookie?.split("=")[0]?.trim();
        const cookieValue = cookie?.split("=")[1]?.trim();
  
        if (cookieName === "adminAccessToken") {
          adminAccessToken = cookieValue;
        } else if (cookieName === "adminRefreshToken") {  
          adminRefreshToken = cookieValue;
        }
      })
      console.log(adminAccessToken);
      console.log(adminRefreshToken);
    axios.get("http://localhost:3000/admin",{
      headers: {
        Authorization: `Bearer  adminAccessToken:${adminAccessToken} adminRefreshToken:${adminRefreshToken}`,
      },
    }).then((response) => {
      console.log(response);
      setuserData(response.data.response);
       setadminName(response.data.adminName)
       if(response.data.status===false){
        navigate('/admin/login')
       }
    });
  },[]);


  const handleSearch=(event)=>{
   
    event.preventDefault();
      let value = event.target.value;
      value = value.toLowerCase();
     
      setsearchData(
       
         userData.filter((user)=>{
            if(user.name.toLowerCase().includes(value)){
           
             
                return [user]
            }
            return null
        })
      );
    };

    const handleDelete = (id) => {
      console.log(id);
      axios.delete(`http://localhost:3000/admin/${id}`, {
        headers: {
          Authorization: `Bearer adminAccessToken:${adminAccessToken} adminRefreshToken:${adminRefreshToken}`,
        }
      }).then((response) => {
        if(response.upadatestatus){
          navigate('/admin')
        }
        console.log(response);
      })
        .catch(error => {
          // handle the error
        });
    };
    console.log(searchData);
  return (
    <Fragment> 
           <AdminHeader adminName={adminName} />
      <div className="container">
        <input
          type="search"
          name=""
          placeholder="Search for user"
          id=""
          style={{ float: "right", width: 400, height: 40, margin: 20 }}
          onChange={handleSearch}
        />
        <h1>User details</h1>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
          </thead>
         
          {searchData.length > 0 ? (
  <tbody>
    {searchData.map((data) => (
      <tr key={data._id}>
        <td>{data._id}</td>
        <td>{data.name}</td>
        <td>{data.email}</td>
        <td>{data.phoneNumber}</td>
        <td>
        <button onClick={() => handleDelete(data._id)}>Delete</button>

        </td>
      </tr>
    ))}
  </tbody>
) : (
  <tbody>
    {userData.map((data) => (
      <tr key={data._id}>
        <td>{data._id}</td>
        <td>{data.name}</td>
        <td>{data.email}</td>
        <td>{data.phoneNumber}</td>
        <td>
          <button onClick={() => handleDelete(data._id)}>Delete</button>
         
        </td>
      </tr>
    ))}
  </tbody>
)}


  



        </table>
      </div>
    </Fragment>
  );
}

export default AdminDashboard;
