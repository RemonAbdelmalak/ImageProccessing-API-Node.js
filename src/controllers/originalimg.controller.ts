import { Response, Request } from 'express';
import originalimgmodel from '../models/originalImg.models';

const originalimgModel = new originalimgmodel();

export const originalImg = async (req: Request, res: Response) => {

    const validationmess: null | string = await originalimgModel.validation(req.query);
    if(validationmess){
      res.send(validationmess);
      return;
    }

    const path = await originalimgModel.imagePath(req.query);
  if (path) {
    res.sendFile(path);
  }
  };