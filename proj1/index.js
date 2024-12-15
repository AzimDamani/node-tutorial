const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require('fs');
const { error } = require("console");
const app = express();

const PORT = 8000;

app.use(express.urlencoded({ extended: false}))

// ROUTES
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const uId = Number(req.params.id);
    console.log(uId);
    const UData = users.find((u) => u.id === uId);
    console.log(UData);
    res.json(UData);
  })
  .patch((req, res) => {
    const body = req.body;
    const UID = Number(req.params.id);
    const UserIndex = users.findIndex((u) => u.id === UID);
    if(UserIndex === -1){
        return res.status(404).json({error: "User Not found"});
    }
    users[UserIndex] = {...users[UserIndex], ...body};
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data)=>{
        return res.json({ status: "Completed" });
    })
  })
  .delete((req, res) => {
    const UID = Number(req.params.id);
    const DeletedData = users.filter((u) => u.id !== UID);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(DeletedData), (err, data) => {
        return res.json({ status: "Completed", id: UID});
    })
  });

// app.get('/api/users/:id' , (req, res) => {
//     const uId = Number(req.params.id);
//     console.log(uId);
//     const UData = users.find((u) => u.id === uId);
//     console.log(UData);
//     res.json(UData)
// })

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users) , (err, data) => {
        return res.json({ status: "pending" , id: users.length});
    })
});

app.listen(PORT, () => {
  console.log("Server started at " + PORT);
});
