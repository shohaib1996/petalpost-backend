import { Router } from 'express';
import multer from 'multer';
import { uploadImage } from './uploadController';


const router = Router();

const upload = multer(); 

router.post('/upload', upload.single('image'), uploadImage);



export const uploadImageRouter = router;