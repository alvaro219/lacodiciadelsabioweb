export interface WeaponAbility {
  name: string;
  description: string;
}

export interface Weapon {
  name: string;
  /** Dado de daño: «1d8», «2d4». */
  damage: string;
  modifier: string;
  hands: string;
  slot: 'Principal' | 'Secundaria';
  /** Nombres de sus propiedades de arma. */
  abilities: string[];
  /** Subclases que la llevan. */
  usedBy: { classId: string; className: string; subclassId: string; subclassName: string }[];
  image: string | null;
}
