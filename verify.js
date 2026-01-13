const bcrypt = require("bcryptjs");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Masukkan password: ", (password) => {
  rl.question("Masukkan hash: ", async (hash) => {
    const isMatch = await bcrypt.compare(password, hash);
    console.log("\nPassword cocok?", isMatch);
    rl.close();
  });
});
