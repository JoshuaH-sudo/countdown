import express from "express";
const router = express.Router()

/* GET home page. */
// using the path '/*' to return the index.html page and the javascript code on any route so that client-side router can be called.
router.get("/*", (req, res, next) => {
  res.sendFile("index.html", { root: "public" })
})

export default router
