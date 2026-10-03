const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const cardsFilePath = path.join(__dirname, "../data/cards.json");

router.get("/", (req, res) => {
  fs.readFile(cardsFilePath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ message: "Error del servidor al leer las tarjetas" });
      return;
    }
    res.send(JSON.parse(data));
  });
});

module.exports = router;
