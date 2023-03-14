import express from "express";
import cors from "cors";
import { PORT } from "./config/config";
const app = express();

import contactsRouter from "./routes/contacts";

app.use(express.json());
app.use(cors());

// app.use("/contacts", contactsRouter);
app.use("/contacts/", contactsRouter);

app.listen(PORT, () => {
  console.log(`Connected to ${PORT}! Listening..`);
});

module.exports = app;
