const jwt = require("jsonwebtoken");

module.exports = {
  authenticateToken: (req, res, next) => {
  console.log('hi');

    authHeader = req.headers["authorization"]
    
    accesstoken = authHeader.split(' ')[2].split(':')[1]
    refreshToken = authHeader.split(' ')[3].split(':')[1]
    console.log(accesstoken);
    console.log(refreshToken);

    if (!accesstoken) {
      console.log("Access token not found");
    }

    jwt.verify(accesstoken, "secrete", (err, decoded) => {
      console.log(decoded);
      if(decoded?.role==='User'){
      if (err) {
        if (err.name === "TokenExpiredError") {
          if (!refreshToken) {
            res.json({ status: false, message: "Refresh token not found" });
          }else{

          jwt.verify(refreshToken, "secrete", (err, decoded) => {
          
            if (err) {
              console.log('hei');
              ({ status: false, message: "Invalid refresh token" });
            }
            
            
        console.log('jii');
        console.log(decoded);
            id = decoded?.userId;
            username = decoded.username;
            newAccesstoken = jwt.sign(
              { userId: id, username: username },
              "secrete",
              { expiresIn: "5m" }
            );
            res.cookie("accessToken", newAccesstoken, { httpOnly: true });
            req.userId = id;
            req.username = decoded.username;
            next();
         
          });
        }
        } else {
          console.log("Invalid access token");
        }
      } else {
        console.log('ggg');
        req.userId = decoded.userId;
      
        req.username = decoded.username;
        next();
  
          } 
           }else{
            console.log("you are restricted for accessing this api")
            res.json({status:false ,message:"you are restricted for accessing this api"})
           }
    });
  
  },
};
