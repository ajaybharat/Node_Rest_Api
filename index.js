const express = require("express");
const app = express();
const userRoutes = require('./controller');
const postsRoutes = require('./controller/posts');
const cors = require('cors');
require("./db");
require("dotenv").config();



app.use(cors());
app.use(express.json()); // like middleware in pipeline
app.use('/api/posts',postsRoutes);
app.use('/api/users',userRoutes);


app.listen(process.env.PORT, function () {
    console.log(`server is running`);
});

