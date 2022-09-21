import "dotenv/config";
import express from "express";
import type { Express } from "express";
import bodyParser from "body-parser";

import useRoutes from "./routes";

const app: Express = express();

app.use(bodyParser.json({ limit: "2mb" }));
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }));

const PORT = process.env.PORT || 8080;

useRoutes(app);

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
