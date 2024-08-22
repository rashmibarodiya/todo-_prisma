


import express from "express";

const app = express();
const port: number = 3000;

import { router as authRoute, router } from "./auth";
import todoRoute from "./todo";

//import  cors from "cors";
//app.use(cors())
app.use(express.json());

app.use("/auth", router);
app.use("/todo", todoRoute);


app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
