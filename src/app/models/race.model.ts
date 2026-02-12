export interface RaceTrait {
  attribute: string;
  modifier: number;
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
}
