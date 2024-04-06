const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dayjs = require("dayjs");

const createTransaction = async (req, res) => {
  const { student_id, endAt, book_id } = req.body;
  const endDate = dayjs(endAt, "DD-MM-YYYY HH:mm");
  const currentDate = dayjs();
  const duration = parseInt(endDate.diff(currentDate, "day"));

  try {
    const getStudentData = await prisma.student.findUnique({
      where: {
        id: student_id,
      },
    });
    const getBookData = await prisma.book.findUnique({
      where: {
        id: book_id,
      },
    });
    console.log(getStudentData.is_active);
    console.log(getBookData.quantity);
    const activeStudent = getStudentData.is_active;
    const bookQuantity = getBookData.quantity;
    if (activeStudent === false) {
      res
        .status(401)
        .json({ msg: "transaction failed, update your student card" });
    }
    if (bookQuantity === 0) {
      res.status(401).json({
        msg: "transaction failed, book stock is empty",
        data: bookQuantity,
      });
    }

    const response = await prisma.transaction.create({
      data: {
        student_id,
        book_id,
        endAt: endDate,
        duration,
      },
    });
    if (response) {
      await prisma.book.update({
        where: {
          id: book_id,
        },
        data: {
          quantity: bookQuantity - 1,
        },
      });
      res.status(200).json({ msg: "transaction success", data: response });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
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
