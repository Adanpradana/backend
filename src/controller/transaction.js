const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTransaction = async (req, res) => {
  const { student_id, endAt, book_id } = req.body;
  const durationDays = 14;
  try {
    const result = await prisma.transaction.create({
      student_id,
      book_id,
      endAt,
      duration,
    });
  } catch (error) {
    console.log(error);
  }
};
const getTransaction = async (req, res) => {};
const getTransactionById = async (req, res) => {};
const updateTransaction = async (req, res) => {};
const deleteTransaction = async (req, res) => {};

module.exports = {
  createTransaction,
  getTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
