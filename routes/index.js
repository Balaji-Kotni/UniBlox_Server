import express from "express";
import { AddUser } from "../controllers/users.js";
export const routes = express.Router();

routes.route("/users/add").post(AddUser);
