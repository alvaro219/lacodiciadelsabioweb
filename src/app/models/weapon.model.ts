export interface WeaponAbility {
  name: string;
  description: string;
}

export interface Weapon {
  name: string;
  damage: string;
  modifier: string;
  hands: string;
  slot: string;
  abilities: string[];
}
