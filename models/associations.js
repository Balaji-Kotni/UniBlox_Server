import Cart from "./cart";
import OrderItem from "./orderItem";
import Orders from "./orders";
import Products from "./products";
import Users from "./users";

Orders.belongsTo(Users, { foreignKey: "userId" });
Users.hasMany(Orders, { foreignKey: "userId" });

Orders.hasMany(OrderItem, { foreignKey: "orderId" });
OrderItem.belongsTo(Orders, { foreignKey: "orderId" });

OrderItem.belongsTo(Products, { foreignKey: "productId" });
Products.hasMany(OrderItem, { foreignKey: "productId" });

Cart.belongsTo(Users, { foreignKey: "userId" });
Cart.belongsTo(Products, { foreignKey: "productId" });
