require("dotenv").config();

const mongoose = require("mongoose");
const { dbConnection } = require("./config");
const Task = require("../models/Task");

const tasks = [
  { name: "Buy groceries", description: "Milk, eggs, bread and coffee" },
  { name: "Clean the house", description: "Vacuum living room and kitchen" },
  { name: "Write report", description: "Finish the Q3 sales report" },
  { name: "Book flight tickets", description: "Flights for the December trip" },
  { name: "Schedule dentist appointment", description: "Routine check-up" },
  { name: "Pay electricity bill", description: "Due by the end of the month" },
  { name: "Renew car insurance", description: "Policy expires next week" },
  { name: "Update resume", description: "Add latest project experience" },
  { name: "Plan team meeting", description: "Prepare agenda for Monday" },
  { name: "Read a book", description: "Finish chapter 5 to 8" },
  { name: "Water the plants", description: "Living room and balcony plants" },
  { name: "Fix bug in login flow", description: "Investigate token expiration issue" },
  { name: "Prepare presentation slides", description: "For Friday's client demo" },
  { name: "Grocery list for party", description: "Snacks and drinks for Saturday" },
  { name: "Backup database", description: "Weekly full backup" },
  { name: "Review pull requests", description: "Check open PRs on the repo" },
  { name: "Organize desk", description: "Clean up workspace and cables" },
  { name: "Call the bank", description: "Ask about the account statement" },
  { name: "Walk the dog", description: "Evening walk around the park" },
  { name: "Learn Docker basics", description: "Go through official tutorial" },
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
