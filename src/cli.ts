#!/usr/bin/env node

import * as pkg from '../package.json'
import { Logger, Arguments } from 'modern-cli'
import { resolve } from 'path'
import * as express from 'express'
import * as cors from 'cors'

// fetch package data
const { name, version } = (<any>pkg)

// enable logging
process.env.DEBUG = name

const log: Logger = new Logger(name)
const args: Arguments = new Arguments()
const file: string = args.get(0) || false
const port: number = args.get(1) || 9001

// log version
log(`v${version}`)

// check given url
if (!file) {
    log.red('Please enter a file to serve!')
    process.exit(1)
}

// create express server
const app = express()

app.use(cors())

app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(resolve(file))
})

app.listen(port, () => {
    log(`serving ${Logger.cyan(file)} at ${Logger.cyan(`http://localhost:${port}`)}`)
})
