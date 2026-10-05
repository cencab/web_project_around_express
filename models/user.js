const mongoose = require("mongoose");

const urlRegex =
  /^(https?:\/\/)(www\.)?[\w\.-]+\.[a-zA-Z]{2,}(\/[-\w.~:\/?%#\[\]@!$&'()*+,;=]*)*#?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return urlRegex.test(v);
      },
      message: "Debe ser una URL válida que comience con http:// o https://",
    },
  },
});

module.exports = mongoose.model("user", userSchema);
