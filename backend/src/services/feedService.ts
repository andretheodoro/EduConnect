import pool from '../config/database'; 

export interface FeedPost {
    id: number;
    user_id: number;
    text: string;
    image_url: string | null;
    created_at: string;
    liked_by: number[];
    author?: string;
  }

export const getAllPosts = async (): Promise<FeedPost[]> => {
  const result = await pool.query(`
    SELECT fp.*, u.nome AS author 
    FROM feed_posts fp 
    JOIN usuarios u ON u.id = fp.user_id 
    ORDER BY created_at DESC
  `);
  return result.rows;
};

export const createNewPost = async (userId: number, text: string, imageUrl: string | null): Promise<FeedPost> => {
  const result = await pool.query(
    `INSERT INTO feed_posts (user_id, text, image_url) VALUES ($1, $2, $3) RETURNING *`,
    [userId, text, imageUrl]
  );
  return result.rows[0];
};

export const togglePostLike = async (postId: number, userId: number): Promise<number[]> => {
  const result = await pool.query(`SELECT liked_by FROM feed_posts WHERE id = $1`, [postId]);
  const likedBy: number[] = result.rows[0]?.liked_by || [];

  const updatedLikes = likedBy.includes(userId)
    ? likedBy.filter(id => id !== userId)
    : [...likedBy, userId];

  await pool.query(`UPDATE feed_posts SET liked_by = $1 WHERE id = $2`, [updatedLikes, postId]);

  return updatedLikes;
};
