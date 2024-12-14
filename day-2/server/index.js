// const http = require('http');
// const fs = require('fs');
// const url = require('url');
// const express = require('express');

// const app = express();

// app.get('/' , (req, res) => {
//     res.send("Hello from Home Page - EXPRESS "+ `${req.query.name} ` + req.query.search)
// });

// app.get('/about', (req, res) => {
//     res.send("Hello  from About Page - EXPRESS");
// })
// // Without express
// // function MyHandler(req, res) {
// //     if(req.url === "/favicon.ico") return res.end();
// //     const log = `${Date.now()}: from ${req.url} New Req Recieved\n`;
// //     const MyURL = url.parse(req.url, true);
// //     console.log(MyURL);
// //     fs.appendFile('log.txt', log, (err, data) => {
// //         switch(MyURL.pathname){
// //             case "/": 
// //                 res.end("Home");
// //                 break;
// //             case "/about": 
// //                 const search = MyURL.query.search;
// //                 res.end("About page" + ` You searched for  - ${search}`);
// //                 break;
// //             default:
// //                 res.end("404 Not found");
// //         }
// //     })
// // }
 
// const myServer = http.createServer(app);

// myServer.listen(8000, () => {
//     console.log("Server Started");
// })



// Node With Express;
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("Hello form Home");
})

app.get('/about', (req, res) => {
    res.send("Hello from Abbout");
})


app.listen(5000, () => console.log("Server Started"));