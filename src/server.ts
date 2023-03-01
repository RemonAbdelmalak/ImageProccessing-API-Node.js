import express from 'express';
import routes from './routes/index';
import imgprocmodel from './models/imgproc.models';

const imgprocModel = new imgprocmodel()

const app = express();
const port = 3000;

app.use(routes);

app.listen(port, async () => {
  await imgprocModel.thumbFolder();
  console.log(`The server is open on http://localhost:${port}`);
});

export default app;
