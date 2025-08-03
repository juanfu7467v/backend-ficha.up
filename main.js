const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/ficha', async (req, res) => {
  const { dni } = req.query;

  if (!dni) return res.status(400).json({ error: 'DNI requerido' });

  try {
    const response = await axios.get(`https://generar-imagen-c4-production.up.railway.app/generar-ficha?dni=${dni}`);
    res.json(response.data);
  } catch (error) {
    console.error('Error en la consulta externa:', error.message);
    res.status(500).json({ error: '❌ Error al consultar la ficha. Inténtalo nuevamente.', detalles: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
