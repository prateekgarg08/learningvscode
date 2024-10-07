const express = require("express")

const app = express()
const port = 3002

app.get("/", (req, res) => {
  console.log(req.rawHeaders);
  res.send("Hello World")
})

app.listen(port, () => {
  console.log("Listening to port", port)
})
