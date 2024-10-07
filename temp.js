const express = require("express")

const app = express()
const port = 3002

app.get("/", (req, res) => {
  console.trace(req.rawHeaders);
  res.send("Hello World")
})

app.listen(port, () => {
  console.trace("Listening to port", port)
})
