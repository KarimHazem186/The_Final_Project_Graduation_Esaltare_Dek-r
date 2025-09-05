const bodyParser = require("body-parser")
const express = require('express')
const dbConnect = require("./config/dbConnect")
const {notFound,errorHandler} = require("./middlewares/errorHandler")
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT || 4000
const authRouter = require("./routes/authRoute")
const brandRouter = require("./routes/brandRoute")
const categoryRouter = require("./routes/categoryRoute")
const subcategoryRouter = require("./routes/subcategoryRoute")
const postRouter = require("./routes/postRoute")
const productRouter = require("./routes/productRoute")
const announcementRouter = require("./routes/announcementRoute")
const couponRouter = require("./routes/couponRoute")
const path = require("path")
const cookieParser = require("cookie-parser")
const morgan = require("morgan")
const cors = require("cors")

dbConnect();


// CORS Configuration
const corsOptions = {
    origin: 'http://localhost:3000', // Allow requests from React frontend
    credentials: true, // Allow credentials (cookies, headers, etc.)
  };
  
  app.use(cors(corsOptions)); // Use CORS with specific options
  

// app.use(cors())
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'))
app.use(cookieParser());


// app.use('/',(req,res)=>{
//     res.send("Hello From Server Side")
// })

app.use('/api/user',authRouter)
app.use('/api/brand',brandRouter)
app.use('/api/category',categoryRouter)
app.use('/api/subcategory',subcategoryRouter)
app.use('/api/post',postRouter)
app.use('/api/product',productRouter)
app.use('/api/announcement',announcementRouter)
app.use('/api/coupon',couponRouter)



app.use(notFound);
app.use(errorHandler)


app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`)
})