// Condiciones de la web.
// Las condiciones vienen de la app en game/conditions.json (se actualiza con
// `npm run sync-app`). Aquí solo van los textos e iconos de cada grupo.

import appConditions from './game/conditions.json';
import { AppCondicion } from '../models/app-data.model';
import { Condition, ConditionGroup } from '../models/condition.model';

const GROUPS: (Omit<ConditionGroup, 'categories'> & { appType: AppCondicion['tipo']; typeLabel: string })[] = [
  {
    id: 'restriccion',
    appType: 'restriction',
    typeLabel: 'Restricción',
    name: 'Restricciones',
    description: 'Impiden realizar determinadas acciones o movimientos. Son las más limitantes del sistema.',
    icon: '🔒',
    color: '#f87171',
  },
  {
    id: 'debilitacion',
    appType: 'debilitation',
    typeLabel: 'Debilitación',
    name: 'Debilitaciones',
    description: 'No impiden actuar, pero empeoran el rendimiento del personaje en combate.',
    icon: '💔',
    color: '#fb923c',
  },
  {
    id: 'potenciacion',
    appType: 'potentiation',
    typeLabel: 'Potenciación',
    name: 'Potenciaciones',
    description: 'Mejoran las capacidades del personaje o lo protegen de daño.',
    icon: '✨',
    color: '#4ade80',
  },
  {
    id: 'danino',
    appType: 'harmful',
    typeLabel: 'Dañina',
    name: 'Dañinas',
    description: 'Causan daño o perjudican al personaje de forma continuada hasta que se libra de ellas.',
    icon: '🔥',
    color: '#ef4444',
  },
];

const DURATION: Record<AppCondicion['duracion'], Condition['duration']> = {
  momentary: 'momentanea',
  temporal: 'temporal',
  persistent: 'persistente',
};

const SAVE: Record<NonNullable<AppCondicion['salvacion']>, NonNullable<Condition['savingThrow']>> = {
  fortitude: 'Fortaleza',
  agility: 'Agilidad',
  willpower: 'Voluntad',
};

const conditions = appConditions as unknown as AppCondicion[];

export const CONDITION_GROUPS: ConditionGroup[] = GROUPS.map(({ appType, typeLabel, ...group }) => ({
  ...group,
  categories: [
    {
      type: group.id as ConditionGroup['categories'][number]['type'],
      typeLabel,
      icon: group.icon,
      color: group.color,
      conditions: conditions
        .filter((c) => c.tipo === appType)
        .map((c) => ({
          name: c.nombre,
          description: c.descripcion,
          duration: DURATION[c.duracion],
          savingThrow: c.salvacion ? SAVE[c.salvacion] : undefined,
          exitCondition: c.salida ?? undefined,
        })),
    },
  ],
}));

/** Número total de condiciones. */
export const CONDITION_COUNT = conditions.length;
