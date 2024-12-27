import express from "express";
import { AddUser } from "../controllers/users.js";
import { AddProduct } from "../controllers/products.js";
import { login } from "../controllers/auth.js";
export const routes = express.Router();

routes.route("/users/add").post(AddUser);
routes.route("/products/add").post(AddProduct);
routes.route("/login").post(login);
