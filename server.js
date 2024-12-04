const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

const authRoutes = require("./controllers/auth");
const expenseRoutes = require("./controllers/expenses");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/et/auth", authRoutes);
app.use("/et/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
