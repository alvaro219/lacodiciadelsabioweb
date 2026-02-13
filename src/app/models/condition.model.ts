export interface Condition {
  name: string;
  description: string;
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
