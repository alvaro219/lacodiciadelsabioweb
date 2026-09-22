export interface AbilityVersion {
  /** Coste en recursos y acciones: «⚡⚡, 🟢🟢». */
  cost: string;
  /** Frecuencia, requisitos o disparador de una reacción. */
  notes: string;
  /** Efecto. */
  body: string;
}

export interface AbilityInfo extends AbilityVersion {
  key: string;
  /** «HAP1», «HAS2», «HAD»… */
  slot: string;
  /** «Habilidad principal», «Reacción», «Definitiva»… */
  kind: string;
  name: string;
  /** Versión al mejorarla subiendo de nivel. */
  improved: AbilityVersion | null;
  /** Claves de sus propiedades (ver game/properties.json). */
  properties: string[];
  improvedProperties: string[];
}

export interface WeaponInfo {
  name: string;
  type: string;
  die: number;
  attacks: number;
  modifier: string;
  twoHanded: boolean;
  slot: 'Principal' | 'Secundaria';
  /** Claves de sus propiedades de arma. */
  properties: string[];
}

export interface Subclass {
  id: string;
  name: string;
  /** Resumen de sus armas: «Daga + Ballesta de Mano (1 mano cada)». */
  weapons: string;
  weaponType: '1-mano' | '2-manos';
  weaponList: WeaponInfo[];
  description: string;
  abilities: AbilityInfo[];
  icon: string;
}

export interface ClassPreset {
  name: string;
  subclass: string;
  race: string;
  description: string;
  avatar: string;
  strengths: string[];
}

export interface GameClass {
  id: string;
  name: string;
  role: string;
  type: 'martial' | 'magic';
  resource: string;
  resourceIcon: string;
  pv: number;
  shieldBase: number;
  ph: number;
  passive: string;
  passiveName: string;
  masteryPassive: string;
  masteryPassiveName: string;
  hb1: string;
  hb1Name: string;
  hb2: string;
  hb2Name: string;
  subclasses: Subclass[];
  description: string;
  lore: string;
  icon: string;
  color: string;
  /** Personaje preparado de la clase, con su avatar. */
  preset: ClassPreset | null;
}
