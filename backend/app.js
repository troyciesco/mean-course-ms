const express = require("express")

const app = express()

// app.use((req, res, next) => {
//   console.log("First middleware")
//   next()
// })

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
  next()
})
app.use("/api/posts", (req, res, next) => {
  const posts = [
    { id: "1", title: "First Server Post", content: "This is from the server" },
    { id: "2", title: "Second Server Post", content: "This is second from the server" },
    { id: "3", title: "Third Server Post", content: "This is third from the server" }
  ]
  res.status(200).json({
    message: "Posts fetched.",
    posts: posts
  })
})

module.exports = app
