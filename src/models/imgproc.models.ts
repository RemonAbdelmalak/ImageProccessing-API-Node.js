import { promises as fs } from 'fs';
import path from 'path';
import image from './sharp.models';
import ImageQuery from '../types/imageQuery.types';

class imgprocmodel {
  async imagePath(iQ: ImageQuery): Promise<null | string> {
    const originalImages = path.resolve(__dirname, '../public/images/original');
    const thumbImages = path.resolve(__dirname, '../public/images/thumb');
    const imageUrl =
      iQ.width && iQ.height
        ? path.resolve(
            thumbImages,
            `${iQ.filename}_thumb=${iQ.width}${iQ.height}.jpg`
          )
        : path.resolve(originalImages, `${iQ.filename}.jpg`);

    fs.access(imageUrl);
    return imageUrl;
  }

  async availableThumb(iQ: ImageQuery): Promise<boolean> {
    const thumbImages = path.resolve(__dirname, '../public/images/thumb');
    const filePath = path.resolve(
      thumbImages,
      `${iQ.filename}_thumb=${iQ.width}${iQ.height}.jpg`
    );

    try {
      await fs.access(filePath);
      return true;
    } catch {
      return false;
    }
  }

  async resizeImg(iQ: ImageQuery): Promise<null | string> {
    if (!iQ.filename || !iQ.width || !iQ.height) {
      return null;
    }

    const originalImages = path.resolve(__dirname, '../public/images/original');
    const thumbImages = path.resolve(__dirname, '../public/images/thumb');
    const originalPath = path.resolve(originalImages, `${iQ.filename}.jpg`);
    const thumbPath: string = path.resolve(
      thumbImages,
      `${iQ.filename}_thumb=${iQ.width}${iQ.height}.jpg`
    );

    console.log(`${thumbPath} Created Successfully !`);

    return await image({
      originalimg: originalPath,
      finalimg: thumbPath,
      width: parseInt(iQ.width),
      height: parseInt(iQ.height),
    });
  }
}

export default imgprocmodel;
