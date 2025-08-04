const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/descargar-ficha', async (req, res) => {
  const { dni } = req.query;

  if (!dni) return res.status(400).send('❌ DNI requerido');

  try {
    const { data } = await axios.get(`https://generar-imagen-c4-production.up.railway.app/generar-ficha?dni=${dni}`);

    if (!data || !data.url) {
      return res.status(500).send('❌ No se pudo obtener la imagen');
    }

    const imagen = await axios.get(data.url, { responseType: 'arraybuffer' });

    res.set({
      'Content-Disposition': `attachment; filename="ficha-${dni}.jpg"`,
      'Content-Type': 'image/jpeg',
      'Content-Length': imagen.data.length
    });

    return res.send(imagen.data);

  } catch (err) {
    return res.status(500).send('❌ Error al procesar la imagen');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
});
