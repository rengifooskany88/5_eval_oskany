const express = require('express');
const path = require('path');
const clientesRouter = require('./routes/clientes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON y servir archivos estáticos del frontend
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Rutas de la API
app.use('/clientes', clientesRouter);

app.listen(PORT, () => {
  console.log(`Servidor de Tecno Servicios Machine corriendo en http://localhost:${PORT}`);
});