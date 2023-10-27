
const User = require("../models/user");

const bcrypt = require("bcrypt");

async function createUser(req, res) {
    try {
        const { password } = req.body;
        const user = new User({ ...req.body, active: false });
        const salt = bcrypt.genSaltSync(10);
        const hashpassword = bcrypt.hashSync(password, salt);
        user.password = hashpassword;
        if (req.avatar) {
            user.avatar = req.avatar;
        }
        const userStored = await user.save();
        res.status(201).send(userStored);
    } catch (error) {
        res.status(400).send({ msg: "Error al crear el usuario", error: error.message });
    }
}

async function getUsers(req, res) {
    const { active } = req.query;
    let response = null;

    if (active === undefined) {
        response = await User.find();
    } else {
        response = await User.find({ active });
    }
    res.status(200).send(response);
}

async function getMe(req, res) {
    const { user_id } = req.user;

    const response = await User.findById(user_id);

    if (!response) {
        res.status(400).send({ msg: "No se ha encontrado usuario" });
    } else {
        res.status(200).send(response);
    } 
}

async function updateUser(req, res) {
    try {
        const { document } = req.params; // Obtiene el ID de los parámetros de la solicitud
        const userDataEdit = req.body;
        console.log(document, userDataEdit);
        const response = await User.findByIdAndUpdate(document, userDataEdit);
        console.log(response);
        res.status(200).json({ message: "Actualización éxitosa" });
    } catch (err) {
    res.status(400).json({ message: err.message });
  }
}


async function deleteUser(req, res) {
    try {
        const { document } = req.params;
        await User.findByIdAndDelete(document);
        res.status(200).send({ msg: "Usuario eliminado" });
    } catch (error) {
        res.status(400).send({ msg: "Error al eliminar el usuario", error: error.message });
    }
}

module.exports = {
    getMe,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};