import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

import "./Profile.css";
import Header from "../Header/Header";

function Profile() {
  const navigate = useNavigate();

  const [access_token, setaccess_token] = useState("");
  const [refresh_token, setrefresh_token] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [profileData, setprofileData] = useState([]);
  const [userName, setuserName] = useState("");
  const [successmsg, setsuccessmsg] = useState("");
  useEffect(() => {
    const cookies = document.cookie.split(";");
    let accessToken = "";
    let refreshToken = "";

    cookies.forEach((cookie) => {
      const cookieName = cookie.split("=")[0]?.trim();
      const cookieValue = cookie.split("=")[1]?.trim();

      if (cookieName === "access_token") {
        accessToken = cookieValue;
      } else if (cookieName === "refresh_token") {
        refreshToken = cookieValue;
      }
    });
    setaccess_token(accessToken);
    setrefresh_token(refreshToken);

    axios
      .get("http://localhost:3000/profile", {
        headers: {
          Authorization: `Bearer  accesstoken:${accessToken} refreshtoken:${refreshToken}`,
        },
      })
      .then((response) => {
        if(response.data.status ===false){
          navigate('/login')
       
         }
        console.log(response.data);
        setprofileData([response.data]);
        setuserName(response.data?.name);
        setImageUrl(`http://localhost:3000/uploads/${response?.data.image}`);
       
        
      })
      .catch((error) => {
        console.log(error);
      });
  }, [imageUrl]);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const profileSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    formData.append("image", selectedFile); // add the selected file to the form data

    axios
      .post("http://localhost:3000/profile", formData, {
        headers: {
          Authorization: `Bearer  accesstoken:${access_token} refreshtoken:${refresh_token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setsuccessmsg(response.data);
        navigate("/profile");
        // handle the response from the server here
      })
      .catch((error) => {
        console.log(error);
        // handle any errors here
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      successmsg;
    }, 6000);

    return () => clearTimeout(timer);
  }, [successmsg]);

  console.log(userName);
  return (
    <>
      <Header userName={userName}/>

      <div>
        <script src="https://kit.fontawesome.com/b99e675b6e.js"></script>

        <div className="wrapper">
          <div className="left">
            <h4>ddf</h4>
            <input type="file" onChange={handleFileSelect} />
            <br />
            <h5 style={{ color: "green" }}>{successmsg && successmsg}</h5>
            <img
              src={selectedFile ? URL.createObjectURL(selectedFile) : imageUrl}
              alt="Selected file"
            />
          </div>
          <div className="right">
            {profileData &&
              profileData.map((data) => {
                return (
                  <div className="info" key={data._id}>
                    <h3>Information</h3>
                    <div className="info_data">
                      <div className="data">
                        <h4>User Name</h4>

                        <p>{data.name}</p>
                      </div>
                      <div className="data">
                        <h4>Email</h4>
                        <p>{data.email}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div className="info">
              <button className="uploadBtn" onClick={profileSubmit}>
                upload and Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
