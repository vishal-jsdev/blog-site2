const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const port = process.env.PORT || 3000;
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const Blog = require('./routes/blog.route');
connectDB();
app.use(
  cors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define routes
app.use('/blog', Blog);

app.listen(port, (error) => {
  error ? console.log(error) : console.log(`server started on: ${port}`);
});