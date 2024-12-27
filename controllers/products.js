import Products from "../models/products.js";

export const AddProduct = async (req, res) => {
  try {
    const { name, description, price, stock, image } = req.body;
    const product = await Products.create({
      name,
      description,
      price,
      stock,
      image,
    });
    res.status(201).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const GetProductById = async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const UpdateProduct = async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.update(req.body);
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    await product.destroy();
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const SearchProducts = async (req, res) => {
  try {
    const { search } = req.query;
    const products = await Products.findAll({
      where: { name: { [Op.like]: `%${search}%` } },
    });
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
