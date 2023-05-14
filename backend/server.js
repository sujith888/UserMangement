const express = require('express');
const bodyParser = require('body-parser');
const db =require('./connection')
const userRouter =require('./routes/user')
const adminRouter=require('./routes/admin')
const cors =require('cors')
const cookieParser = require('cookie-parser');


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(cookieParser());  
app.use(express.static('public'));
// Define a route for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});



app.use("/", userRouter);
app.use("/admin", adminRouter);


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}.`);
});
