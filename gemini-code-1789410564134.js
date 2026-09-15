const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/clientes.json');

// Función auxiliar para leer el archivo JSON
function leerClientes() {
  if (!fs.existsSync(dataFilePath)) {
    return [];
  }
  const data = fs.readFileSync(dataFilePath, 'utf8');
  return data ? JSON.parse(data) : [];
}

// Función auxiliar para guardar en el archivo JSON
function guardarClientes(clientes) {
  fs.writeFileSync(dataFilePath, JSON.stringify(clientes, null, 2), 'utf8');
}

// GET /clientes: Devuelve todos los registros
router.get('/', (req, res) => {
  const clientes = leerClientes();
  res.json(clientes);
});

// POST /clientes: Registra un nuevo cliente interesado
router.post('/', (req, res) => {
  const { nombre, edad, ciudad } = req.body;

  // Validaciones del lado del servidor
  if (!nombre || !edad || !ciudad) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  const edadNum = Number(edad);
  if (isNaN(edadNum) || edadNum <= 0) {
    return res.status(400).json({ error: 'La edad debe ser un número positivo válido.' });
  }

  const nuevoCliente = { nombre, edad: edadNum, ciudad, fecha: new Date().toISOString() };
  const clientes = leerClientes();
  clientes.push(nuevoCliente);
  guardarClientes(clientes);

  // Respuesta personalizada según la edad
  let mensaje = '';
  if (edadNum >= 18) {
    mensaje = `¡Hola ${nombre} de ${ciudad}, tienes ${edadNum} años! Gracias por tu interés en nuestras máquinas de coser industriales y caseras. Un asesor te contactará pronto.`;
  } else {
    mensaje = `Hola ${nombre} de ${ciudad}, tienes ${edadNum} años. Este producto o su asesoría comercial directa requiere supervisión de mayores de edad.`;
  }

  res.status(201).json({ mensaje, cliente: nuevoCliente });
});

module.exports = router;