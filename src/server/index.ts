import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import expressStaticGzip from "express-static-gzip";

import app_router from "./routes/app";
import error_handler from "./middleware/error_handler";

import debug from "debug";
const debugLog = debug("app:server:debug");
const errorLog = debug("app:server:error");

const app = express();
debugLog("Starting the server");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../../", "public")));
app.use(
  "/files",
  expressStaticGzip(path.join(__dirname, "../../", "public"), {
    enableBrotli: true,
  })
);

app.use("/", app_router);
app.use(error_handler);

//Has to be exported like this to allow the bin/www to import app correctly
module.exports.app = app;
