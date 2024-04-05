const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createCategory = async (req, res) => {
  const { category_name } = req.body;
  try {
    const createCategory = await prisma.category.create({
      data: {
        category_name,
      },
    });
    res
      .status(200)
      .json({ message: "success create category", data: createCategory });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
const getCategory = async (req, res) => {
  try {
    const createCategory = await prisma.category.findMany();
    res.status(200).json({
      message: "success get category list",
      data: createCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

const getRefCategory = async (req, res) => {
  try {
    const createCategory = await prisma.category.findMany({
      include: {
        books: true,
      },
    });
    res.status(200).json({
      message: "success get category list",
      data: createCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
module.exports = { createCategory, getCategory, getRefCategory };
