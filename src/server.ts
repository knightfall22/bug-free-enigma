// import prisma from "../prisma/connector";
import app from "./app";
import http from "http";
import mongoose, { mongo } from "mongoose";
import config from "config";

const server = http.createServer(app);
const port = process.env.PORT || 4090;
const mongoDB = config.get<string>("mongoDB");

server.listen(port, async () => {
  mongoose.connect(mongoDB).then(() => console.log("Database connected"));

  console.log(`Server running on port ${port}`);
});

//Process management
process.on("SIGINT", function onSigint() {
  console.info(
    "Got SIGINT (aka ctrl-c in docker). Graceful shutdown ",
    new Date().toISOString()
  );
  gracefulShutdown();
});

// quit properly on docker stop
process.on("SIGTERM", function onSigterm() {
  console.info(
    "Got SIGTERM (docker container stop). Graceful shutdown ",
    new Date().toISOString()
  );
  gracefulShutdown();
});

function gracefulShutdown() {
  server.close((err) => {
    if (err) {
      process.exit(1);
    }
    console.log("Process closed");
  });
}
