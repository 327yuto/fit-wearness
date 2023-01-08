import applyCaseMiddleware from "axios-case-converter"
import axios from "axios"


const options = {
  ignoreHeaders: true
}

const client = applyCaseMiddleware(axios.create({
  // baseURL: "https://api.fit-wearness.com/api/v1" || "http://localhost:3000/api/v1",
  baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
}), options)

export default client

