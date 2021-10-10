const express = require("express");
const app = express();
const PORT = 3000;
const nameRoutes = require('./controller');



app.use(express.json()); // like middleware in pipeline
app.use('/api',nameRoutes);


app.listen(PORT, function () {
    console.log(`server is running ${PORT}`);
});

