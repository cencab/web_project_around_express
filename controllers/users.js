const User = require("../models/user");

const ERROR_CODE_400 = 400;
const ERROR_CODE_404 = 404;
const ERROR_CODE_500 = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) =>
      res
        .status(ERROR_CODE_500)
        .send({ message: "Ha ocurrido un error en el servidor" }),
    );
};

module.exports.getUserById = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = ERROR_CODE_404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_404) {
        return res.status(ERROR_CODE_404).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res
          .status(ERROR_CODE_400)
          .send({ message: "ID de usuario inválido" });
      }
      res
        .status(ERROR_CODE_500)
        .send({ message: "Ha ocurrido un error en el servidor" });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return res
          .status(ERROR_CODE_400)
          .send({ message: "Datos inválidos al crear el usuario" });
      }
      res
        .status(ERROR_CODE_500)
        .send({ message: "Ha ocurrido un error en el servidor" });
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = ERROR_CODE_404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_404)
        return res.status(ERROR_CODE_404).send({ message: err.message });
      if (err.name === "ValidationError")
        return res.status(ERROR_CODE_400).send({ message: "Datos inválidos" });
      res
        .status(ERROR_CODE_500)
        .send({ message: "Ha ocurrido un error en el servidor" });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(() => {
      const error = new Error("Usuario no encontrado");
      error.statusCode = ERROR_CODE_404;
      throw error;
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.statusCode === ERROR_CODE_404)
        return res.status(ERROR_CODE_404).send({ message: err.message });
      if (err.name === "ValidationError")
        return res
          .status(ERROR_CODE_400)
          .send({ message: "Enlace de avatar inválido" });
      res
        .status(ERROR_CODE_500)
        .send({ message: "Ha ocurrido un error en el servidor" });
    });
};
