const router = require("express").Router();
const fs = require("fs");
const path = require("path");

const usersFilePath = path.join(__dirname, "../data/users.json");

router.get("/", (req, res) => {
  fs.readFile(usersFilePath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      res
        .status(500)
        .send({ message: "Error del servidor al leer los usuarios" });
      return;
    }
    res.send(JSON.parse(data));
  });
});

router.get("/:id", (req, res) => {
  fs.readFile(usersFilePath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      res.status(500).send({ message: "Error del servidor" });
      return;
    }

    const users = JSON.parse(data);
    const user = users.find((u) => u._id === req.params.id);

    if (!user) {
      res.status(404).send({ message: "ID de usuario no encontrado" });
      return;
    }

    res.send(user);
  });
});

module.exports = router;
