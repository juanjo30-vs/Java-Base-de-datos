const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;

//middleware para analizar los datos JSON
app.use(express.json());

//Configuracion para la conexion MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "practica",
});

//Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error("Error al conectar a la base de datos", err);
  } else {
    console.log("Conectado con exito a la base de datos");
  }
});

//Crear una nueva materia
app.post("/materias", (rep, res) => {
  const materia = req.body;
  const sql = "INSERT INTO materias (NombreMateria, Descripcion, Nota) VALUES(?, ?, ?)";

  db.query(
    sql, [materia.NombreMateria, materia.descripcion, materia.Nota],
    (err, result) => {
      if (err) {
        console.error("Error al crear una nueva materia:", err)
        res.status(500).json({ error: "Error al crear una nueva materia"})
      } else {
        console.log("Materia creada con exito")
        res.status(201).json({ message: "Materia Creada", id: result.insertId })
      }
    }
  );
});

//Iniciar el servidor
app.listen(port, () => {
  console.log(`servidor corriente en httt://localhost:${port}`);
});
