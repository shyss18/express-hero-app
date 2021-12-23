import * as express from "express";
import * as morgan from "morgan";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import heroRoutes from "./api/routes/hero-routes";
import villainRoutes from "./api/routes/villain-routes";

const app = express();

mongoose.connect(
  "mongodb+srv://admin:" +
    process.env.MONGO_ATLAS_PW +
    "@trainingcluster.e0nvm.mongodb.net/" +
    process.env.MONGO_DB_NAME +
    "?retryWrites=true&w=majority",
);

app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());

app.use((request: express.Request, response: express.Response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  );

  if (request.method == "OPTIONS") {
    response.header(
      "Access-Control-Allow-Methods",
      "POST, PUT, PATCH, GET, DELETE",
    );
    return response.status(200).json({});
  }
  next();
});

app.use("/api/heroes", heroRoutes);
app.use("/api/villains", villainRoutes);

export default app;
