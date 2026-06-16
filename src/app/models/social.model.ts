export type CreationType = 'personaje' | 'raza' | 'clase' | 'subclase';

export interface SocialPost {
  id: string;
  user_id: string;
  username: string;
  creation_type: CreationType;
  title: string;
  description: string;
  image_url?: string;
  data?: Record<string, unknown>;
  likes_count: number;
  comments_count: number;
  created_at: string;
  user_has_liked?: boolean;
}

export interface SocialComment {
  id: string;
  post_id: string;
  user_id: string;
  username: string;
  content: string;
  created_at: string;
}

export interface SocialLike {
  id: string;
  post_id: string;
  user_id: string;
  created_at: string;
}

export interface AppUser {
  id: string;
  email: string;
  username: string;
}
