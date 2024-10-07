const { fork, exec } = require("child_process")
const fs = require("fs/promises")
const { watch } = require("fs")
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8080');


async function runFile(fileName) {
  let execComplete = false
  const watcher = watch("text.txt", {}, (event) => {
    fs.readFile("text.txt").then((data) => {

      const text = data.toString()
      const obj = sanitizeText(text)
      ws.send(JSON.stringify(obj))
      console.log(obj.data)
    })
    if (execComplete) {
      console.log("i ran")
      watcher.close()
    }
  })

  exec(`node ${fileName} &>> text.txt`, { shell: "/bin/zsh" }, (error, stdout, stderr) => {
    if (error) {
      console.log(error)
      console.error("Something went wrong")
    }
    execComplete = true
  })

}


function sanitizeText(text) {
  const traces = text.split("Trace:").filter(str => str.trim())
  const trace = traces[traces.length - 1]

  const match = trace.match(/temp\.js:(\d+):(\d+)/);
  simpleExtract = match ? { line: match[1], character: match[2] } : null;

  const traceLines = trace.split("\n");
  const traceMatchedAt = traceLines.findIndex((obj) => {
    return obj.match(/temp\.js:(\d+):(\d+)/) !== null;
  })

  if (traceMatchedAt > -1) {

    const data = traceLines.slice(0, traceMatchedAt).reduce((prev, curr) => {
      return prev + curr
    }, "")
    simpleExtract.data = data.trim()
  }

  return simpleExtract
}

module.exports = {
  runFile
}