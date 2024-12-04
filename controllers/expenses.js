const express = require("express");
const Expense = require("../models/Expense");
const { checkToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", checkToken, async (req, res) => {
  const { category, amount } = req.body;
  try {
    const expense = new Expense({
      userId: req.user.userId,
      category,
      amount,
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something is wrong! Error, can't add", error });
  }
});

router.get("/", checkToken, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.userId }).sort({
      createdAt: -1,
    });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Not able to get expense! Error", error });
  }
});

router.put("/:id", checkToken, async (req, res) => {
  const { category, amount } = req.body;
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(
      req.params.id,
      { category, amount, updatedAt: Date.now() },
      { new: true }
    );
    res.status(200).json(updatedExpense);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something is wrong! Error, can't update", error });
  }
});

router.delete("/:id", checkToken, async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Expense deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something is wrong! Error, can't delete", error });
  }
});

module.exports = router;
