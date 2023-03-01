import { Response, Request } from 'express';
import fs from 'fs/promises';
import path from 'path';

export const imglist = async (_req: Request, res: Response) => {
  const pathFullImage = `${path.resolve(
    __dirname,
    '../../src/public/images/original'
  )}`;
  const files = await fs.readdir(pathFullImage);

  if (!files) {
    return;
  }
  let htmlResponse = `
      <h1>Available images</h1>
      <ul>
      `;

  files.forEach((file: string): void => {
    htmlResponse = htmlResponse + `<li>${file}</li>`;
  });

  res.status(200).send(`${htmlResponse}</ul>`);
};
