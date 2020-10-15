import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('hello');
});

const PORT = process.env.port || 3000;

app.listen(PORT, () => console.log(`server running on port ${PORT}`));
