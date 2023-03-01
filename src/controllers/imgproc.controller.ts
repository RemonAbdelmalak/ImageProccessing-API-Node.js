import { Response, Request } from 'express';
import imgprocmodel from '../models/imgproc.models';

const imgprocModel = new imgprocmodel();

export const imgproc = async (req: Request, res: Response) => {
  if (!(await imgprocModel.availableThumb(req.query))) {
    await imgprocModel.resizeImg(req.query);
  }
  const path = await imgprocModel.imagePath(req.query);
  if (path) {
    res.sendFile(path);
  }
};
