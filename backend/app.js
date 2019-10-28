const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const Post = require("./models/post")

const app = express()

// app.use((req, res, next) => {
//   console.log("First middleware")
//   next()
// })

// app.use(bodyParser.urlencoded({ extended: false}))
mongoose
  .connect(
    "mongodb+srv://tmciesco:Tolland2melky28@mean-course-ms-jl7d4.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database.")
  })
  .catch(() => {
    console.log("Connection failed.")
  })

app.use(bodyParser.json())

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
  next()
})

app.post("/api/posts", (req, res, next) => {
  const post = new Post({ title: req.body.title, content: req.body.content })
  post.save()
  res.status(201).json({
    message: "Post added successfully."
  })
})

app.use("/api/posts", (req, res, next) => {
  // Post.find((err, result) => {})
  Post.find().then(documents => {
    console.log(documents)
    res.status(200).json({
      message: "Posts fetched.",
      posts: documents
    })
  })
})

module.exports = app
