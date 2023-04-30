const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const block = require("./block");

app.use(cors());
app.use(express.json());

const balances = {
  "0xfecb117ab82c022dcdd48403da330fbcd202b883": 100,
  "0x71642b74e9f77f515b6c7b42cafb3bcc7a25f272": 50,
  "0x820858ca4633963047facfe2234de745c59000e3": 75,
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { msg, signature } = req.body;
  const { amount, recipient, sender } = msg;

  const publicKey = block.sigToPubKey(msg, signature);
  const payer = "0x" + block.pubToAdd(publicKey);

  if (
    sender.toLowerCase() == payer.toLowerCase() &&
    sender.toLowerCase() != recipient.toLowerCase()
  ) {
    setInitialBalance(sender);

    setInitialBalance(recipient);

    if (balances[sender] < amount) {
      res.status(400).send({ message: "Not enough funds!" });
    } else if (amount < 0) {
      res.status(400).send({ message: "HeHe Try Again Scammoooorrr!" });
    } else {
      balances[sender] -= amount;
      balances[recipient] += amount;
      res.send({ balance: balances[sender] });
    }
  } else {
    res.status(400).send({ message: "Scammorrrr!" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
