const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const usersRoute=require("./routes/users")
const authRoute=require("./routes/auth")
const postRoute=require("./routes/posts")
const conversationRoute=require("./routes/conversations")
const messageRoute=require("./routes/messages")
const cors = require("cors");
const multer=require("multer")
const path=require("path")
const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1228986",
  key: "7aded96a34a4c0405962",
  secret: "7439e9c786fcd54732d3",
  cluster: "ap3",
  useTLS: true
});

app.use(cors());

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  {useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true,useFindAndModify: false},
  () => {
    console.log("Connected to MongoDB");
  }
);

//middleware
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, file, cb) => {
//     cb(null, req.body.name);
//   },
// });

// const upload = multer({ storage: storage });
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     return res.status(200).json("File uploded successfully");
//   } catch (error) {
//     console.error(error);
//   }
// });
app.use("/api/users",usersRoute)
app.use("/api/auth",authRoute)
app.use("/api/posts",postRoute)
app.use("/api/conversations",conversationRoute)
app.use("/api/messages",messageRoute)


const db=mongoose.connection
db.once('open',()=>{
    console.log('db connected')

    const msgCollection=db.collection('messages')
    const changeStream=msgCollection.watch()
    changeStream.on('change',(change)=>{
          console.log(change)
          if(change.operationType==="insert"){
              const messageDetails=change.fullDocument
              pusher.trigger("messages","inserted",
              {
                  id:messageDetails._id,
                  text:messageDetails.text,
                  createdAt:messageDetails.createdAt,
                  sender:messageDetails.sender,
                  conversationId:messageDetails.conversationId,
              }
              )
          }else{
              console.log('Error triggerring Pusher')
          }
    })
})



app.get("/", (req, res) => {
  res.send("homepage");
});

app.get("/users", (req, res) => {
    res.send("users");
  });

app.listen(process.env.PORT||8800, () => {
  console.log("server is running");
});
