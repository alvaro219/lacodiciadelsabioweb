// Forma de los datos que exporta la app (src/app/data/game/*.json).
// Se generan con `npm run sync-app`; no se editan a mano.

export interface AppArma {
  tipo: string;
  nombre: string;
  dado: number;
  ataques: number;
  modificador: string;
  dosManos: boolean;
  propiedades?: string[];
}

export interface AppSubclase {
  nombre: string;
  armas: { armaPrincipal: AppArma; armaSecundaria: AppArma | null; dosManos: boolean };
  usaDosManos: boolean;
  [key: string]: unknown;
}

export interface AppClase {
  nombre: string;
  rol: string;
  definicion: string;
  pv: number;
  escudo: number;
  ph: number;
  pasiva: string;
  hb1: string;
  hb2: string;
  hb1Nombre?: string;
  hb2Nombre?: string;
  esMagica: boolean;
  subclases: AppSubclase[];
  maestria: { nombre: string; descripcion: string };
  preparado: AppPreparado | null;
}

export interface AppPreparado {
  nombre: string;
  subclase: string;
  raza: string;
  subraza: string | null;
  descripcion: string;
  avatar: string;
  puntosFuertes: string[];
}

export interface AppSubraza {
  nombre: string;
  definicion: string;
  pasiva: string;
  rasgos: string[];
  velocidad?: number;
  tamano?: string;
}

export interface AppRaza {
  nombre: string;
  definicion: string;
  pasiva: string;
  velocidad: number;
  tamano: string;
  subrazas: AppSubraza[];
  avatares: string[];
}

export interface AppCondicion {
  nombre: string;
  descripcion: string;
  tipo: 'restriction' | 'debilitation' | 'potentiation' | 'harmful';
  duracion: 'momentary' | 'temporal' | 'persistent';
  salvacion: 'fortitude' | 'agility' | 'willpower' | null;
  salida: string | null;
}

export interface AppPropiedad {
  nombre: string;
  corto: string;
  descripcion: string;
  color: string;
  categoria?: string;
}

export interface AppPropiedades {
  habilidad: Record<string, AppPropiedad>;
  arma: Record<string, AppPropiedad>;
}

export interface AppAccesorio {
  nombre: string;
  descripcion: string;
  rareza: 'comun' | 'raro' | 'epico' | 'legendario';
  precio: number;
  imagen: string | null;
}

export interface AppEnemigo {
  nombre: string;
  tipo: string;
  tier: 'minion' | 'normal' | 'miniBoss' | 'boss';
  stats: Record<string, number>;
  habilidades: { nombre: string; descripcion: string; coste: string; tipo: string }[];
  pasivas: { nombre: string; descripcion: string }[];
  arma: { nombre: string; tipo: string; dado: number; ataques: number; modificador: string };
  pv: number;
  escudo: number;
  image?: string | null;
  facciones?: string[];
  soloPremium: boolean;
}

export interface AppCampana {
  id: string;
  nombre: string;
  resumen: string;
  descripcion: string;
  jugadores: number;
  sesiones: number;
  premium: boolean;
  temporada: string | null;
  temporadaNumero: number | null;
  estilos: string[];
  encuentros: number;
}

export interface AppRelato {
  id: string;
  titulo: string;
  subtitulo: string;
  contenido: string;
  tipo: string;
  lugar: string;
}

export interface AppPais {
  id: string;
  nombre: string;
  isla: string;
  color: string;
  etiqueta: [number, number];
  contornos: number[][];
  descripcion: string;
  lore: string[];
}

export interface AppMundo {
  ancho: number;
  alto: number;
  islas: { nombre: string; color: string }[];
  paises: AppPais[];
}

export interface AppStats {
  clases: number;
  subclases: number;
  razas: number;
  subrazas: number;
  condiciones: number;
  accesorios: number;
  enemigos: number;
  campanas: number;
  temporadas: number;
  paises: number;
  relatos: number;
  secretos: number;
  avatares: number;
  niveles: number;
}
