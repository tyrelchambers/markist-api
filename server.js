// setup express server listening on port 4000
require("dotenv").config();
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const port = 4000;
const cors = require("cors");
const upload = require("./utils/upload");

app.use(express.json());
app.use(cors());

const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  const title = req.body.title;
  const file = req.file;
  const { accesstoken } = req.headers;

  if (!accesstoken) {
    return res.status(401).json({
      error: "Access token is required",
    });
  }

  console.log(title);
  console.log(file);

  res.sendStatus(200);
});

app.use("/api", router);

server.listen(port, function () {
  console.log("Server listening at port %d", port);
});
