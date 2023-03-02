import { Response, Request } from 'express';
import imgprocmodel from '../models/imgproc.models';

const imgprocModel = new imgprocmodel();

export const imgproc = async (req: Request, res: Response) => {

  const validationmess: null | string = await imgprocModel.validation(req.query);
  if(validationmess){
    res.send(validationmess);
    return;
  }

  if (!(await imgprocModel.availableThumb(req.query))) {
    await imgprocModel.resizeImg(req.query);
  }
  const path = await imgprocModel.imagePath(req.query);
  if (path) {
    res.sendFile(path);
  }
};

