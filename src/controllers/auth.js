const bcrypt = require("bcryptjs");
const Registration = require("../models/registrer");
const jwt = require("../utils/jwt");

function validateEmail(email) {
  const emaildomain= /@(gmail|outlook)\.com$/;
  return emaildomain.test(email);
}

const register = async (req, res) => {
  const { firstname, lastname, password,email } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).send({ msg: "El correo electrónico no es válido" });
  }
  if (!password) {
    return res.status(400).send({ msg: "La contraseñas es requerida" });}

  const salt = bcrypt.genSaltSync(10);
  const hashPassword = bcrypt.hashSync(password, salt);

  const register = new Registration({
      firstname,
      lastname,
      password: hashPassword,
      email: email.toLowerCase(),
  });
  try {
      const registrationSchema = await register.save();
      res.status(201).send(registrationSchema);
  } catch (error) {
      res.status(400).send({ msg: "Error al crear el usuario", error });
  }
}
const login = async (req, res) => {
const { email, password } = req.body;

try {
  if (!email || !password) {
    throw new Error("El email y la contraseña son obligatorias");
  }
  const emailLowerCase = email.toLowerCase();
  const registrationSchema = await Registration.findOne({ email: emailLowerCase }).exec();
  if (!registrationSchema) {
    throw new Error("El usuario no existe");
  }
  const check = await bcrypt.compare(password, registrationSchema.password);
  if (!check) {
    throw new Error("Contraseña incorrecta");
  }
  res.status(200).send({
    access: jwt.createAccessToken(registrationSchema),
    refresh: jwt.createRefreshToken(registrationSchema),
  });
} catch (error) {
  res.status(400).send({ msg: error.message });
}
};

const refreshAccessToken = (req, res) => {
const { token } = req.body;
if (!token) res.status(400).send({ msg: "Token requerido" });
const { user_id } = jwt.decoded(token);
Registration.findOne({ _id: user_id }, (error, userStorage) => {
  if (error) {
    res.status(500).send({ msg: "Error del servidor" });
  } else {
    res.status(200).send({
      accessToken: jwt.createAccessToken(userStorage),
    });
  }
});
};

module.exports = {
register,
login,
refreshAccessToken,
};