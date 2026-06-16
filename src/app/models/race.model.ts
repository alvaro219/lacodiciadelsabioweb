export interface RaceTrait {
  attribute: string;
  modifier: number;
}

export interface Subrace {
  name: string;
  description: string;
  passive: string;
  traits: RaceTrait[];
  speed?: number;
  size?: string;
}

export interface Race {
  id: string;
  name: string;
  size: string;
  speed: number;
  traits: RaceTrait[];
  passive: string;
  passiveName: string;
  description: string;
  lore: string;
  icon: string;
  color: string;
  subraces?: Subrace[];
}
