import Cart from "./cart.js";
import OrderItem from "./orderItem.js";
import Orders from "./orders.js";
import Products from "./products.js";
import Users from "./users.js";

const setupAssociations = () => {
  Orders.belongsTo(Users, { foreignKey: "userId" });
  Users.hasMany(Orders, { foreignKey: "userId" });

  Orders.hasMany(OrderItem, { foreignKey: "orderId" });
  OrderItem.belongsTo(Orders, { foreignKey: "orderId" });

  OrderItem.belongsTo(Products, { foreignKey: "productId" });
  Products.hasMany(OrderItem, { foreignKey: "productId" });

  Cart.belongsTo(Users, { foreignKey: "userId" });
  Cart.belongsTo(Products, { foreignKey: "productId" });
};

export default setupAssociations;
