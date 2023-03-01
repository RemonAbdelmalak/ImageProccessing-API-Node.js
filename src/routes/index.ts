import express from 'express';
import listImages from './api/listImages.routes';
import procImages from './api/imgproc.routes';

const routes = express.Router();


routes.use('/api/listimages', listImages);
routes.use('/api/images', procImages);

routes.get('/', (_req: express.Request, res: express.Response) => {
  res.send(
    `<h1>Hello, You Made it !!</h1>
        <p>To View the images go to /api/images
        </code> and write the name of the photo. Optionally use both width and height to set the size...</p>
        <p> Note: the images name are: 1,2,3,4,5.jpg.</p>
        <p>Examples:<ul><li><a href="http://localhost:3000/api/images/?filename=1">http://localhost:3000/api/images/?filename=1</a></li><li><a href="http://localhost:3000/api/images?filename=1&width=100&height=100">http://localhost:3000/api/images?filename=1&width=100&height=100</a></li></ul></p>
        <p>You can see the list of image's names by going to <a href="/api/listimages">/api/listimages .</p>`
  );
});

export default routes;
