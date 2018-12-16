#!/usr/bin/env node

import { resolve } from 'path'
import * as express from 'express'
import * as debug from 'debug'
import * as cors from 'cors'
import chalk from 'chalk'

// tslint:disable-next-line
const { name, version } = require('../package.json')

// enable logging
debug.enable(name)

const log = debug(name)
const file: string = process.argv[2] || ''
const port: number = parseInt(process.argv[3], 10) || 9001

// log version
log(`v${version}`)

// check given file path
if (file.length === 0) {
    log(chalk.red('Please enter a file to serve!'))
    process.exit(1)
}

// create express server
const app = express()
app.use(cors())
app.all('*', (req, res) => res.sendFile(resolve(file)))
app.listen(port, () => {
    log(`serving ${chalk.cyan(file)} at ${chalk.cyan(`http://localhost:${port}`)}`)
})
