const express = require("express");
const app = express();
const PORT = 3000;

const names = ['ajay', 'bharat', 'teja', 'satya', 'aditya'];

app.use(express.json()); // like middleware in pipeline



app.listen(PORT, function () {
    console.log(`server is running ${PORT}`);
});

app.get('/', function (req, res) {
    res.json({message: "Hey its a success"});
})

app.post('/name', function(req, res) {
    
})