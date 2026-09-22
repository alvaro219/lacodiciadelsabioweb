// Icono de cada clase y raza. Va aparte de class-extras.ts y race-extras.ts
// porque lo usan los menús de la web (cabecera y pie), que se cargan en todas
// las páginas, y así no arrastran los textos largos.

export const CLASS_ICONS: Record<string, string> = {
  escaramuzador: '🏹',
  luchador: '⚔️',
  protector: '🛡️',
  artillero: '🔧',
  controlador: '🔥',
  invocador: '🐉',
  velador: '💚',
  exaltador: '🎵',
  mistico: '🌑',
  apotecario: '⚗️',
};

export const RACE_ICONS: Record<string, string> = {
  humano: '⚔️',
  elfo: '🌿',
  enano: '⛏️',
  aasimar: '✨',
  orco: '💪',
  mediano: '🔮',
  lagarliz: '🦎',
  bestani: '🐾',
  omnimek: '⚙️',
  lazuri: '🌊',
  myridian: '🐜',
};

export const DEFAULT_CLASS_ICON = '⚔️';
export const DEFAULT_RACE_ICON = '🧬';
