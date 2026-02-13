export interface GameEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'evento' | 'beta' | 'torneo' | 'sesion';
  icon: string;
  spots: number;
  spots_total: number;
  active: boolean;
  created_at?: string;
}

export interface EventSignup {
  id?: string;
  event_id: string;
  name: string;
  email: string;
  created_at?: string;
}
