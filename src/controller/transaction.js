const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createTransaction = async (req, res) => {
  try {
    const result = await prisma.transaction.create({
        
    })
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
