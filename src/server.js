import express from "express"
import { json, urlencoded } from "body-parser"
import morgan from "morgan"
import config from "./config"
import cors from "cors"
import { connect } from "./utils/db"

// Routes
import itemRoutes from "./resources/item/item.router"
import userRoutes from "./resources/user/user.router"
import listRoutes from "./resources/list/list.router"

import { signin, signup, protect } from "./utils/auth"

export const app = express()

app.disable("x-powered-by")

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan("dev"))

app.use("api/signin", protect, signin)
app.use("api/signup", protect, signup)

app.use("api/item", protect, itemRoutes)
app.use("api/user", protect, userRoutes)
app.use("api/list", protect, listRoutes)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(`REST API on http://localhost:${config.port}/api`)
    })
  } catch (e) {
    console.error(e)
  }
}
