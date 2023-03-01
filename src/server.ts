import express from 'express';
import routes from './routes/index';

const app = express();
const port = 3000;

app.use(routes);

app.listen(port, async () => {
  console.log(`The server is open on http://localhost:${port}`);
});

export default app;
