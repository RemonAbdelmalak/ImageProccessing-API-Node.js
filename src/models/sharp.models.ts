import sharp from 'sharp';
import sharpResizeParams from '../types/sharpResize.types';

const image = async (sr: sharpResizeParams): Promise<null | string> => {
  try {
    await sharp(sr.originalimg).resize(sr.width, sr.height).toFile(sr.finalimg);

    return null;
  } catch {
    return 'There was an error in processing the image';
  }
};

export default image;
