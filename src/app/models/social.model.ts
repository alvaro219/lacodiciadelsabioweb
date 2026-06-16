export type CreationType = 'clase' | 'subclase' | 'raza' | 'subraza' | 'accesorio';

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
  downloads_count: number;
  rating: number;
  rating_count: number;
  tags?: string[];
  version?: string;
  is_premium_only?: boolean;
  reports_count?: number;
  user_has_reported?: boolean;
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

export interface SocialReport {
  id: string;
  post_id: string;
  user_id: string;
  reason: string;
  created_at: string;
}

export interface AppUser {
  id: string;
  email: string;
  username: string;
  display_name?: string;
}
