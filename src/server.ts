import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import routes from "./api/routes";

export const app: express.Application = express();
const address = "localhost:3000";

app.use(bodyParser.json());

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

routes(app);

app.listen(3000, function () {
  console.log(`starting app on: ${address}`);
});
