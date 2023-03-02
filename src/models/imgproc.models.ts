import { promises as fs } from 'fs';
import path from 'path';
import image from './sharp.models';
import ImageQuery from '../types/imageQuery.types';

class imgprocmodel {

  async imagePath(iQ: ImageQuery): Promise<null | string> {
    const originalImages = path.resolve(__dirname, '../../src/public/images/original');
    const thumbImages = path.resolve(__dirname, '../../src/public/images/thumb');
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
  
  async thumbFolder(): Promise<void> {
    const thumbImages = path.resolve(__dirname, '../../src/public/images/thumb');

    try {
      await fs.access(thumbImages);
    } catch {
      fs.mkdir(thumbImages)
    }
  }

  async imgNameCheck(filename = ''): Promise<boolean>{
    if (!filename) {
      return false;
    }
    return (await this.cutExtImg()).includes(filename);
  }


  async cutExtImg(): Promise<string[]> {
    
    try {

      const originalImages = path.resolve(__dirname, '../../src/public/images/original');
      const files = await (await (fs.readdir(originalImages)))
      .map((filename) => filename.split('.')[0]);

      return (files)

    } catch {

      return [];
    }
  }

  async validation(iQ: ImageQuery): Promise<null | string> {
    
    if(!(await this.imgNameCheck(iQ.filename))){
      return 'Please enter the name of the image.'
    }

    const width = parseInt(iQ.width||'');
    if(Number.isNaN(width) || 1 > width){
      return 'the number of width or height is either below 1 or not a number so please check and try again'
    }

    const height = parseInt(iQ.height||'');
    if(Number.isNaN(height) || 1 > height){
      return 'the number of width or height is either below 1 or not a number so please check and try again'
    }
    return null;
  }


  async availableThumb(iQ: ImageQuery): Promise<boolean> {
    const thumbImages = path.resolve(__dirname, '../../src/public/images/thumb');
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

    const originalImages = path.resolve(__dirname, '../../src/public/images/original');
    const thumbImages = path.resolve(__dirname, '../../src/public/images/thumb');
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