export interface Novedad {
  id?: string;
  title: string;
  body: string;
  image_url?: string | null;
  tags?: string[];
  published_at?: string;
  created_at?: string;
  pinned?: boolean;
}
