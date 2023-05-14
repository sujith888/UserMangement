import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const [sessionError, setsessionError] = useState("");
  const [userName, setuserName] = useState("");
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
   
    axios
      .get("http://localhost:3000/", {
        headers: {
          Authorization: `Bearer  accesstoken:${accessToken} refreshtoken:${refreshToken}`,
        },
      })
      .then((response) => {
        setuserName(response.data.userName);
        setsessionError(response.data.message);
    
     
        if (response.data.status === false) {
          navigate("/login", { sessionError });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

console.log();
 

  
  return (
    <div>
      <Header userName={userName} />
      Home
    </div>
  );
}
