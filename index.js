const express = require("express");
const app = express();
const PORT = 4000;
const userRoutes = require('./controller');
const postsRoutes = require('./controller/posts');
const cors = require('cors');
require("./db");



app.use(cors());
app.use(express.json()); // like middleware in pipeline
app.use('/api/posts',postsRoutes);
app.use('/api/users',userRoutes);


app.listen(PORT, function () {
    console.log(`server is running ${PORT}`);
});

