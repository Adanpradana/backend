const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const dayjs = require("dayjs");

const createTransaction = async (req, res) => {
  const { student_id, date, book_id } = req.body;
  const date1 = dayjs();
  const date2 = dayjs(date, "DD-MM-YYYY HH:mm");

  console.log(date1.format("DD-MM-YYYY HH:mm"));
  console.log(date2.format("DD-MM-YYYY HH:mm"));
  const duration = date2.diff(date1, "day");

  try {
    if (duration > 14) {
      res
        .status(401)
        .json({ msg: "transaction failed, maximum rental is 14 day" });
    }
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
        endAt: date2,
        duration,
      },
    });
    if (response) {
      await Promise.all(
        getBookData.map((book) =>
          prisma.book.update({
            where: { id: book.id },
            data: { quantity: book.quantity - 1 },
          })
        )
      );

      res.status(200).json({ msg: "transaction success", data: response });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
  ``;
};
const getTransaction = async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        student: true,
      },
    });
    const bookIds = transactions.flatMap((transaction) => transaction.book_id);

    const books = await prisma.book.findMany({
      where: {
        id: {
          in: bookIds,
        },
      },
    });

    const transactionsWithBooks = transactions.map((transaction) => ({
      ...transaction,
      books: books.filter((book) => transaction.book_id.includes(book.id)),
    }));

    res.status(200).json({ msg: "success", data: transactionsWithBooks });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
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
