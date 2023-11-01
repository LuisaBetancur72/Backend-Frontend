const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { API_VERSION } = require("./constants");
const app = express();

/* Cargar rutas */
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/user");

/* Trabajar con la extensión client-rest */
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));

/* Evitar bloqueos en el navegador cuando estemos trabajando con
el backend y el front end a la vez */
app.use(cors());

app.use(`/api/${API_VERSION}/`, authRoutes);
app.use(`/api/${API_VERSION}/user`, userRoutes);

module.exports = app;