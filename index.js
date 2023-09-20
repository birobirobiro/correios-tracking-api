const express = require('express');
const correios = require('correios-rastreamento');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get('/:trackingCode', async (req, res) => {
  const trackingCode = req.params.trackingCode;

  try {
    const trackingInfo = await correios.sroV2.rastrearObjeto(trackingCode);
    res.json(trackingInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch tracking data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
