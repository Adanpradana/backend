const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createBook = async (req, res) => {
  const { title, author, year, quantity, category_id } = req.body;
  try {
    const result = await prisma.book.create({
      data: {
        title,
        author,
        year,
        quantity,
        category_id,
      },
    });
    res.status(200).json({ message: "success create book", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
const getBook = async (req, res) => {
  try {
    const result = await prisma.book.findMany({
      include: {
        category: true,
      },
    });
    res.status(200).json({
      message: "success get book lists",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
const getBookById = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await prisma.book.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "success get book list by id",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
const updateBook = async (req, res) => {
  const { id } = req.query;
  const { title, author, year, quantity, category_id } = req.body;

  try {
    const result = await prisma.book.update({
      where: {
        id,
      },
      data: { title, author, year, quantity, category_id },
    });
    res.status(200).json({
      message: "success update book list",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
const removeBook = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.book.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "success delete book list",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { createBook, getBook, getBookById, updateBook, removeBook };
