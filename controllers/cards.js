const Card = require("../models/card");

const ERROR_CODE_400 = 400;
const ERROR_CODE_404 = 404;
const ERROR_CODE_500 = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(() =>
      res
        .status(ERROR_CODE_500)
        .send({ message: "Ha ocurrido un error en el servidor" }),
    );
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODE_400)
          .send({ message: "Datos inválidos al crear la tarjeta" });
      }
      res
        .status(ERROR_CODE_500)
        .send({ message: "Ha ocurrido un error en el servidor" });
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = ERROR_CODE_404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_404) {
        return res.status(ERROR_CODE_404).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODE_400)
          .send({ message: "ID de tarjeta inválido" });
      }
      res
        .status(ERROR_CODE_500)
        .send({ message: "Ha ocurrido un error en el servidor" });
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = ERROR_CODE_404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_404)
        return res.status(ERROR_CODE_404).send({ message: err.message });
      if (err.name === "CastError")
        return res
          .status(ERROR_CODE_400)
          .send({ message: "ID de tarjeta inválido" });
      res
        .status(ERROR_CODE_500)
        .send({ message: "Ha ocurrido un error en el servidor" });
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
      const error = new Error("Tarjeta no encontrada");
      error.statusCode = ERROR_CODE_404;
      throw error;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_404)
        return res.status(ERROR_CODE_404).send({ message: err.message });
      if (err.name === "CastError")
        return res
          .status(ERROR_CODE_400)
          .send({ message: "ID de tarjeta inválido" });
      res
        .status(ERROR_CODE_500)
        .send({ message: "Ha ocurrido un error en el servidor" });
    });
};
