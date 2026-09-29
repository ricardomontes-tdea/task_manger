require("dotenv").config();

const mongoose = require("mongoose");
const { dbConnection } = require("./config");
const Task = require("../models/Task");

const tasks = [
  { name: "Buy groceries", description: "Milk, eggs, bread and coffee", isDone: false },
  { name: "Clean the house", description: "Vacuum living room and kitchen", isDone: true },
  { name: "Write report", description: "Finish the Q3 sales report", isDone: false },
  { name: "Book flight tickets", description: "Flights for the December trip", isDone: true },
  { name: "Schedule dentist appointment", description: "Routine check-up", isDone: false },
  { name: "Pay electricity bill", description: "Due by the end of the month", isDone: true },
  { name: "Renew car insurance", description: "Policy expires next week", isDone: false },
  { name: "Update resume", description: "Add latest project experience", isDone: true },
  { name: "Plan team meeting", description: "Prepare agenda for Monday", isDone: false },
  { name: "Read a book", description: "Finish chapter 5 to 8", isDone: false },
  { name: "Water the plants", description: "Living room and balcony plants", isDone: true },
  { name: "Fix bug in login flow", description: "Investigate token expiration issue", isDone: false },
  { name: "Prepare presentation slides", description: "For Friday's client demo", isDone: true },
  { name: "Grocery list for party", description: "Snacks and drinks for Saturday", isDone: false },
  { name: "Backup database", description: "Weekly full backup", isDone: true },
  { name: "Review pull requests", description: "Check open PRs on the repo", isDone: false },
  { name: "Organize desk", description: "Clean up workspace and cables", isDone: true },
  { name: "Call the bank", description: "Ask about the account statement", isDone: false },
  { name: "Walk the dog", description: "Evening walk around the park", isDone: true },
  { name: "Learn Docker basics", description: "Go through official tutorial", isDone: false },
];

const seed = async () => {
  try {
    await dbConnection();

    await Task.deleteMany();
    console.log("[INFO] Existing tasks removed");

    await Task.insertMany(tasks);
    console.log(`[INFO] ${tasks.length} tasks seeded successfully`);
  } catch (error) {
    console.error("[ERROR] Could not seed tasks", error);
  } finally {
    await mongoose.disconnect();
  }
};

seed();
