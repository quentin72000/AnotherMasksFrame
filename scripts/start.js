import 'dotenv/config'
import cli from "next/dist/cli/next-start.js"

cli.nextStart({port: process.env.PORT});