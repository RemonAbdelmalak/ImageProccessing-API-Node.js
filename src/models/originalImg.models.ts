import { promises as fs } from 'fs';
import path from 'path';
import ImageQuery from '../types/imageQuery.types';


class originalimgmodel{

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
    return null;
    }
}

export default originalimgmodel;