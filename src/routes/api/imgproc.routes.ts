import express from 'express';
import { imgproc } from '../../controllers/imgproc.controller';

const route = express.Router();

route.get('/', imgproc);

export default route;
