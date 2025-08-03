const express = require('express');
const { createCanvas, loadImage } = require('canvas');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get('/ficha', async (req, res) => {
  const dni = req.query.dni;
  if (!dni || dni.length !== 8) {
    return res.json({ error: 'DNI inválido' });
  }

  const canvas = createCanvas(800, 500);
  const ctx = canvas.getContext('2d');

  // Fondo moderno
  ctx.fillStyle = '#f5f5f5';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Encabezado
  ctx.fillStyle = '#075e54';
  ctx.fillRect(0, 0, canvas.width, 70);
  ctx.fillStyle = '#fff';
  ctx.font = 'bold 32px Arial';
  ctx.fillText('Ficha de Identidad', 30, 45);

  // Estilo general de texto
  ctx.fillStyle = '#333';
  ctx.font = '20px Arial';

  // Datos de ejemplo (puedes reemplazar esto por una consulta real)
  const datos = {
    nombre: 'JEAN CARLOS OLANO VASQUEZ',
    dni: dni,
    nacimiento: '16/11/2003',
    sexo: 'MASCULINO',
    estado: 'SOLTERO',
    estatura: '1.73 m',
    instruccion: 'SECUNDARIA COMPLETA',
  };

  // Dibujar caja
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 1;
  ctx.fillRect(30, 90, 740, 370);
  ctx.strokeRect(30, 90, 740, 370);

  ctx.fillStyle = '#333';
  ctx.font = 'bold 22px Arial';
  ctx.fillText(`Nombre:`, 50, 140);
  ctx.font = '20px Arial';
  ctx.fillText(`${datos.nombre}`, 180, 140);

  ctx.font = 'bold 22px Arial';
  ctx.fillText(`DNI:`, 50, 180);
  ctx.font = '20px Arial';
  ctx.fillText(`${datos.dni}`, 180, 180);

  ctx.font = 'bold 22px Arial';
  ctx.fillText(`Nacimiento:`, 50, 220);
  ctx.font = '20px Arial';
  ctx.fillText(`${datos.nacimiento}`, 180, 220);

  ctx.font = 'bold 22px Arial';
  ctx.fillText(`Sexo:`, 50, 260);
  ctx.font = '20px Arial';
  ctx.fillText(`${datos.sexo}`, 180, 260);

  ctx.font = 'bold 22px Arial';
  ctx.fillText(`Estado Civil:`, 50, 300);
  ctx.font = '20px Arial';
  ctx.fillText(`${datos.estado}`, 180, 300);

  ctx.font = 'bold 22px Arial';
  ctx.fillText(`Estatura:`, 50, 340);
  ctx.font = '20px Arial';
  ctx.fillText(`${datos.estatura}`, 180, 340);

  ctx.font = 'bold 22px Arial';
  ctx.fillText(`Instrucción:`, 50, 380);
  ctx.font = '20px Arial';
  ctx.fillText(`${datos.instruccion}`, 180, 380);

  // Convertir a imagen PNG
  const buffer = canvas.toBuffer('image/png');
  const fileName = `ficha_${dni}.png`;

  res.set('Content-Type', 'image/png');
  res.set('Content-Disposition', `inline; filename="${fileName}"`);
  res.send(buffer);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
