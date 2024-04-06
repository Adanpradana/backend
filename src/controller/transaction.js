const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dayjs = require("dayjs");

const createTransaction = async (req, res) => {
  const { student_id, endAt, book_id } = req.body;
  const endDate = dayjs(endAt, "DD-MM-YYYY HH:mm");
  const currentDate = dayjs();
  const duration = Math.floor(endDate.diff(currentDate, "hour") / 24);
  try {
    const getStudentData = await prisma.student.findUnique({
      where: {
        id: student_id,
      },
    });
    const activeStudent = getStudentData.is_active;
    if (!activeStudent) {
      res
        .status(401)
        .json({ msg: "transaction failed, update your student card" });
    }
    const getBookData = await prisma.book.findMany({
      where: {
        id: { in: book_id },
      },
    });
    const bookQuantity = getBookData.map((book) => book.quantity);
    if (bookQuantity.includes(0)) {
      return res.status(401).json({
        msg: "Transaction failed, one or more books are out of stock",
      });
    }
    const response = await prisma.transaction.create({
      data: {
        student_id,
        book_id,
        endAt: endDate,
        duration: 10,
      },
    });
    await Promise.all(
      getBookData.map((book) =>
        prisma.book.update({
          where: { id: book.id },
          data: { quantity: book.quantity - 1 },
        })
      )
    );
    // if (response) {
    //   await prisma.book.update({
    //     where: {
    //       id: book_id,
    //     },
    //     data: {
    //       quantity: bookQuantity - 1,
    //     },
    //   });
    //   console.log(duration, "DURATION");
    //   console.log(endDate, "DURATION");
    //   console.log(currentDate, "DURATION");
    // }
    res.status(200).json({ msg: "transaction success", data: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
const getTransaction = async (req, res) => {
  const result = await prisma.transaction.findMany();
  res.status(200).json({ msg: "succecss", data: result });
};
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
