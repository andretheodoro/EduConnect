import { Router } from 'express';
import { upload } from '../config/multer';
import { getPosts, createPost, toggleLike } from '../controllers/feedController';

const router = Router();

router.get('/', getPosts);
router.post('/', upload.single('image'), createPost);
router.put('/:id/like', toggleLike);

export default router;
