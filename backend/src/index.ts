import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    status: 'ok',
    message: 'Iris backend is running',
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});