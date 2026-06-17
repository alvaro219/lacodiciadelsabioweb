export interface Novedad {
  id?: string;
  title: string;
  body: string;
  image_url?: string | null;
  tags?: string[];
  published_at?: string;
  created_at?: string;
  pinned?: boolean;
  synopsis?: string | null;
}

export interface NovComment {
  id?: string;
  novedad_id: string;
  user_id: string;
  username: string;
  body: string;
  created_at?: string;
  admin_reply?: string | null;
  admin_reply_at?: string | null;
}
