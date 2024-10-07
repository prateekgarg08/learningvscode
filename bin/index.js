#!/usr/bin/env node
const path = require("path")
const fs = require("fs/promises")
const { runFile } = require("./run")

const fileName = path.join(process.cwd(), process.argv[2]);

async function readFile(fileName) {
  try {
    const data = await fs.readFile(fileName)
    const textInFile = data.toString()
    const replacedText = textInFile.replaceAll("console.log", "console.trace")
    await fs.writeFile("./temp.js", replacedText)
    runFile("./temp.js")
  } catch (error) {

    console.log(error.message)
  }

}

readFile(fileName)