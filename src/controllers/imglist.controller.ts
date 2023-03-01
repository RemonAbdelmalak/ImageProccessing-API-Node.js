import { Response, Request } from 'express';
import fs from 'fs/promises';
import path from 'path';

export const imglist = async (_req: Request, res: Response) => {
  const pathFullImage = `${path.resolve(
    __dirname,
    '../public/images/original'
  )}`;
  const files = await fs.readdir(pathFullImage);

  if (!files) {
    return;
  }
  let htmlResponse = `
      <h1>Available images</h1>
      <p>Below you can find all images that are accessible via the route<code><a href="/api/images/">/api/images/</a></code> then you type the name of the image.</p>
      <ul>
      `;

  files.forEach((file: string): void => {
    htmlResponse = htmlResponse + `<li>${file}</li>`;
  });

  res.status(200).send(`${htmlResponse}</ul>`);
};
