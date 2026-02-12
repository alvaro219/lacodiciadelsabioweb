export interface Subclass {
  id: string;
  name: string;
  weapons: string;
  weaponType: string;
  description: string;
  abilities: SubclassAbilities;
  icon: string;
}

export interface SubclassAbilities {
  [key: string]: string | undefined;
  hap1: string;
  hap2: string;
  hap3?: string;
  hap4?: string;
  has1?: string;
  has2?: string;
  had: string;
}

export interface GameClass {
  id: string;
  name: string;
  role: string;
  type: 'martial' | 'magic';
  resource: string;
  resourceIcon: string;
  shieldBase: number;
  passive: string;
  passiveName: string;
  masteryPassive: string;
  masteryPassiveName: string;
  hb1: string;
  hb2: string;
  subclasses: Subclass[];
  description: string;
  lore: string;
  icon: string;
  color: string;
}
