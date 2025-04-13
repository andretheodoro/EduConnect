import { Request, Response } from 'express';
import * as feedService from '../services/feedService';

export const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await feedService.getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts.' });
  }
};

export const createPost = async (req: Request, res: Response) => {
  try {
    const { text, user_id } = req.body;
    const file = req.file as Express.Multer.File;
    const imageUrl = file ? `/uploads/feed/${file.filename}` : null;

    const newPost = await feedService.createNewPost(user_id, text, imageUrl);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post.' });
  }
};

export const toggleLike = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.id);
  const userId = parseInt(req.body.user_id);

  try {
    const updatedLikes = await feedService.togglePostLike(postId, userId);
    res.json({ success: true, liked_by: updatedLikes });
  } catch (error) {
    res.status(500).json({ error: 'Error updating like.' });
  }
};
