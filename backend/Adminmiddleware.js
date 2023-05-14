const jwt = require("jsonwebtoken");

module.exports = {
  authenticateToken: (req, res, next) => {
  console.log('hi');

    authHeader = req.headers["authorization"]

    adminAccessToken = authHeader.split(' ')[3].split(':')[1]
    adminRefreshToken = authHeader.split(' ')[2].split(':')[1]
    console.log(adminAccessToken);
    console.log(adminRefreshToken);

    if (!adminAccessToken) {
      console.log("Access token not found");
    }

    jwt.verify(adminAccessToken, "secrete", (err, decoded) => {
      console.log(decoded);
      if(decoded?.role==='Admin'){
      if (err) {
        if (err.name === "TokenExpiredError") {
          if (! adminRefreshToken) {
            res.json({ status: false, message: "Refresh token not found" });
          }else{

          jwt.verify( adminRefreshToken, "secrete", (err, decoded) => {
          
            if (err) {
              console.log('hei');
              ({ status: false, message: "Invalid refresh token" });
            }
            
            
        console.log('jii');
        console.log(decoded);
          
        adminName = decoded.adminName;
         email=decoded.email
            newadminAccessToken = jwt.sign(
              { email: email, adminName: adminName,role:'Admin' },
              "secrete",
              { expiresIn: "5m" }
            );
            res.cookie("AdminAccessToken", newadminAccessToken, { httpOnly: true });
            req.email = email;
            req.adminName = decoded.adminName;
            next();
         
          });
        }
        } else {
          console.log("Invalid access token");
        }
      } else {
        console.log('ggg');
        req.email = decoded.email;
        req.adminName = decoded.adminName;
        next();
  
          } 
           }else{
            console.log("you are restricted for accessing this api")
            res.json({status:false ,message:"you are restricted for accessing this api"})
           }
    });
  
  },
};
