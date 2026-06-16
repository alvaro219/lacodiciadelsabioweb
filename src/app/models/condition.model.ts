export interface Condition {
  name: string;
  description: string;
  duration: 'persistente' | 'temporal' | 'momentanea';
  savingThrow?: 'Fortaleza' | 'Voluntad' | 'Agilidad';
  exitCondition?: string;
}

export interface ConditionCategory {
  type: 'restriccion' | 'debilitacion' | 'potenciacion' | 'danino';
  typeLabel: string;
  icon: string;
  color: string;
  conditions: Condition[];
}

export interface ConditionGroup {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  categories: ConditionCategory[];
}
