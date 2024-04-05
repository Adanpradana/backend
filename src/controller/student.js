const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createStudent = async (req, res) => {
  const { name, nim, email, is_active } = req.body;
  try {
    const result = await prisma.student.create({
      data: {
        name,
        nim,
        email,
        is_active,
      },
    });
    res.status(200).json({ message: "success create student", data: result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
const getStudent = async (req, res) => {
  try {
    const result = await prisma.student.findMany();
    res.status(200).json({
      message: "success get category list",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
const getStudentById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.student.findUnique({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "success get student by id",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, nim, email, is_active } = req.body;
  try {
    const result = await prisma.student.update({
      where: {
        id,
      },
      data: {
        name,
        nim,
        email,
        is_active,
      },
    });
    res.status(200).json({
      message: "success update student",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};
const removeStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await prisma.student.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: "success delete student list",
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  createStudent,
  getStudent,
  getStudentById,
  updateStudent,
  removeStudent,
};
