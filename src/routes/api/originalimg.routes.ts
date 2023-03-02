import express from 'express';
import { originalImg } from '../../controllers/originalimg.controller';

const route = express.Router();

route.get('/', originalImg);

export default route;
