const express = require("express");
const app = express();
const authRoutes = require('./controller/auth');
const userRoutes = require('./controller/user');
const postsRoutes = require('./controller/posts');
const cors = require('cors');
require("./db");
require("dotenv").config();



app.use(cors());
app.use(express.json()); // like middleware in pipeline
app.use('/api/auth',authRoutes);
app.use('/api/posts',postsRoutes);
app.use('/api/users',userRoutes);


app.listen(process.env.PORT, function () {
    console.log(`server is running`);
});

