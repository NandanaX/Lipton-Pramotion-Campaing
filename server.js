const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

require("dotenv").config();

const app = express();

const dbconfig = require("./db");
const userRoute = require("./routes/userRoute");
const formRoute = require("./routes/formRoute");

app.use(helmet());
app.use(cors());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "cross-origin-opener-policy": [
        "same-origin",
        "allow-popups",
        "strict-origin",
      ],
      "cross-origin-embedder-policy": ["require-corp"],
    },
  })
);

app.use(express.json());

app.use("/api/users", userRoute);
app.use("/api/forms", formRoute);

const port = process.env.PORT;

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
}

app.listen(port, () => console.log("Node Server Started using Nodemon!"));
