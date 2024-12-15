const express = require("express");
// const users = require("./MOCK_DATA.json");
const fs = require('fs');
const mongoose = require('mongoose');
const app = express();

const PORT = 8000;


// Connect

mongoose.connect('mongodb+srv://azimd:azimadamani.01@cluster0.dhq8c.mongodb.net/yt-node')
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("Error Occured ", err));




// Schems

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
  },
  email :{
    type: String,
    required: true,
    unique: true,
  },
  job_title: {
    type: String,
  }
},{
  timestamps: true
});

const User = mongoose.model('user', userSchema);





app.use(express.urlencoded({ extended: false}))


// middleware
app.use((req, res, next) => {
    console.log("Mid 1");
    fs.appendFile('log.txt', `${Date.now()}: ${req.method} - ${req.path}\n`, (err, data) => {
        next();
    })
})

app.use((req, res, next) => {
    console.log("Mid 2");
    next();
})
// ROUTES
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.send(allDbUsers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const userID = await User.findById(req.params.id);
    console.log(userID);
    res.json(userID);
  })
  .patch(async (req, res) => {
    const userID = await User.findByIdAndUpdate(req.params.id, {last_name: "changed"});
    return res.json({status: "success"});
    
  })
  .delete(async (req, res) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    return res.json({status: "success"});

  });

// app.get('/api/users/:id' , (req, res) => {
//     const uId = Number(req.params.id);
//     console.log(uId);
//     const UData = users.find((u) => u.id === uId);
//     console.log(UData);
//     res.json(UData)
// })

app.post("/api/users", async (req, res) => {
    const body = req.body;
    const result = await User.create({
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      job_title: body.job_title
    });
    console.log(result);
    return res.status(201).json({ msg : "success"});
});

app.listen(PORT, () => {
  console.log("Server started at " + PORT);
});
