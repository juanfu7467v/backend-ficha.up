const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.get('/ficha', async (req, res) => {
  const { dni } = req.query;

  if (!dni) {
    return res.status(400).json({
      message: '❌ DNI requerido',
      url: null
    });
  }

  try {
    const response = await axios.get(`https://generar-imagen-c4-production.up.railway.app/generar-ficha?dni=${dni}`);

    if (response.data && response.data.url) {
      return res.json({
        message: "Ficha generada",
        url: response.data.url
      });
    } else {
      return res.status(500).json({
        message: "❌ No se pudo generar la ficha",
        url: null
      });
    }
  } catch (error) {
    console.error('❌ Error en la consulta externa:', error.message);
    return res.status(500).json({
      message: "❌ Error al consultar la ficha. Inténtalo nuevamente.",
      url: null
    });
  }
});

// Nueva ruta para forzar descarga
app.get('/descargar-ficha', async (req, res) => {
  const { dni } = req.query;

  if (!dni) {
    return res.status(400).send('DNI requerido');
  }

  try {
    const response = await axios.get(`https://generar-imagen-c4-production.up.railway.app/generar-ficha?dni=${dni}`);

    if (response.data && response.data.url) {
      const imageUrl = response.data.url;

      const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });

      res.set({
        'Content-Type': 'image/jpeg',
        'Content-Disposition': `attachment; filename="ficha_${dni}.jpg"`,
      });

      return res.send(imageResponse.data);
    } else {
      return res.status(500).send("❌ No se pudo generar la ficha");
    }
  } catch (error) {
    console.error("❌ Error al descargar la ficha:", error.message);
    return res.status(500).send("❌ Error interno");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
