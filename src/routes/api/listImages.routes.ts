import express from 'express';
import { imglist } from '../../controllers/imglist.controller';

const route = express.Router();

route.get('/', imglist);

export default route;
