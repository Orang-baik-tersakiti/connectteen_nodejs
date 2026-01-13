const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const SALT_ROUNDS = 10;

rl.question("Masukkan password: ", async (password) => {
  try {
    const hash = await bcrypt.hash(password, SALT_ROUNDS);
    console.log("\nPassword asli :", password);
    console.log("Password hash :", hash);
  } catch (err) {
    console.error("Error hashing password:", err);
  } finally {
    rl.close();
  }
});
