require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;
const newsRouter = require("./routes/news");
const userRouter = require("./routes/users");
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(newsRouter);


app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

mongoose.connect("mongodb+srv://test:test@newscluster0.4qii9.mongodb.net/?retryWrites=true&w=majority&appName=NewsCluster0").then(() => {
    console.log("Connected to MongoDB");
});


module.exports = app;