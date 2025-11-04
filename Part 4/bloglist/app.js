const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/loggers");

const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");



const app = express();

logger.info("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info("connected to MongoDB"))
  .catch((err) => logger.error("error connection to MongoDB:", err.message));

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");
  next();
});

app.use("/api/blogs", blogRoutes);
app.use("/api/users", userRoutes);
app.use("/api/login", loginRoutes);


if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}


app.use((req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
});

app.use((err, req, res, next) => {
  logger.error(err.message);

  if (err.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  } else if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ error: "invalid token" });
  } else if (err.name === "TokenExpiredError") {
    return res.status(401).json({ error: "token expired" });
  }

  next(err);
});

module.exports = app;
