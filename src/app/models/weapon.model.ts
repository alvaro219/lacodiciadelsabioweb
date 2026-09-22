export interface WeaponAbility {
  name: string;
  description: string;
}

export interface WeaponUser {
  classId: string;
  className: string;
  subclassId: string;
  subclassName: string;
  modifier: string;
}

export interface Weapon {
  name: string;
  /** Dado de daño: «1d8», «2d4». */
  damage: string;
  /** Atributo que suma: «Fuerza», o «Constitución o Fuerza» si depende de la subclase. */
  modifier: string;
  hands: string;
  slot: 'Principal' | 'Secundaria';
  /** Nombres de sus propiedades de arma. */
  abilities: string[];
  /** Subclases que la llevan. */
  usedBy: WeaponUser[];
  /**
   * Las mismas subclases agrupadas por el atributo que suman. Tiene más de un
   * grupo cuando no todas suman el mismo: la web la enseña como una sola arma.
   */
  usersByModifier: { modifier: string; users: WeaponUser[] }[];
  image: string | null;
}
