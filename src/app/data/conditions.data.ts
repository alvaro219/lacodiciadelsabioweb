import { ConditionGroup } from '../models/condition.model';

export const CONDITION_GROUPS: ConditionGroup[] = [
  {
    id: 'comunes',
    name: 'Condiciones Comunes',
    description: 'Condiciones básicas que se aplican con frecuencia en combate.',
    icon: '📋',
    color: '#60a5fa',
    categories: [
      {
        type: 'restriccion',
        typeLabel: 'Restricción',
        icon: '🔒',
        color: '#f87171',
        conditions: [
          { name: 'Derribado', description: 'Está tirado en el suelo, debe gastar 🟢 para levantarse.' },
          { name: 'Desplazado', description: 'Está sufriendo un desplazamiento involuntario.' },
          { name: 'Levantado', description: 'Está levantado en el aire.' }
        ]
      },
      {
        type: 'debilitacion',
        typeLabel: 'Debilitación',
        icon: '💔',
        color: '#fb923c',
        conditions: [
          { name: 'Desprevenido', description: 'Tienes desventaja en las tiradas de salvación.' }
        ]
      },
      {
        type: 'potenciacion',
        typeLabel: 'Potenciación',
        icon: '✨',
        color: '#4ade80',
        conditions: [
          { name: 'Montar', description: 'El daño se dirige primero a la montura y si esta es derrotada o se baja de la montura, entonces al/la jinete.' },
          { name: 'Invisibilidad', description: 'No puede ser objetivo de hechizos o habilidades, pero es afectado por las Áreas de Efecto.' }
        ]
      }
    ]
  },
  {
    id: 'especiales',
    name: 'Condiciones Especiales',
    description: 'Condiciones avanzadas con efectos más potentes y complejos.',
    icon: '⚡',
    color: '#a78bfa',
    categories: [
      {
        type: 'restriccion',
        typeLabel: 'Restricción',
        icon: '🔒',
        color: '#f87171',
        conditions: [
          { name: 'Inmóvil', description: 'No puedes desplazarte de ninguna manera.' },
          { name: 'Incapacitar', description: 'No puede gastar ⚡ para realizar habilidades.' },
          { name: 'Miedo', description: 'Solo se pueden realizar habilidades, hechizos y acciones que conlleven movimiento y en sentido contrario a los enemigos.' },
          { name: 'Mudez', description: 'No puede gastar 💧 para lanzar hechizos.' },
          { name: 'Confusión', description: 'Antes de resolver cada acción, debes tirar 1d20, si sale 10 o menos, eliges libremente el objetivo, si sale 11 o más, se elige un aliado aleatorio.' },
          { name: 'Provocar', description: 'Solo se puede hacer objetivos a quien se designa como objetivo de la provocación.' },
          { name: 'Estructura', description: 'Es incapaz de moverse y tiene "Coraje" permanentemente.' }
        ]
      },
      {
        type: 'debilitacion',
        typeLabel: 'Debilitación',
        icon: '💔',
        color: '#fb923c',
        conditions: [
          { name: 'Parálisis', description: 'Cada 🟢 debes gastarla en superar una tirada de salvación (CD = 12 - 🟢 restantes).' },
          { name: 'Entumecido', description: 'El número de PH que cuestan los hechizos y habilidades aumenta en 1.' },
          { name: 'Aturdido', description: 'Realizas todo con desventaja hasta que tengas éxito en algo.' },
          { name: 'Cegar', description: 'Las habilidades y hechizos realizados se ejecutan con desventaja.' },
          { name: 'Frágil', description: 'El margen para infligir daños aumenta de 4 a 5.' },
          { name: 'Ralentizado', description: 'El número de 🟢 disminuye de 3 por turno a 2.' },
          { name: 'Debilidad', description: 'El margen para sufrir daños baja de 4 a 3.' }
        ]
      },
      {
        type: 'potenciacion',
        typeLabel: 'Potenciación',
        icon: '✨',
        color: '#4ade80',
        conditions: [
          { name: 'Anular', description: 'Se disipa la condición que no sea potenciación objetivo.' },
          { name: 'Impulso', description: 'Después de usar la siguiente habilidad, recuperas 🟢 .' },
          { name: 'Égida', description: 'El daño del siguiente golpe queda anulado.' },
          { name: 'Invulnerable', description: 'Eres inmune al daño recibido.' },
          { name: 'Vigorizado', description: 'El número de PH que cuestan hechizos y habilidades se reduce en 1.' },
          { name: 'Acelerado', description: 'El número de 🟢 por turno aumenta de 3 a 4.' },
          { name: 'Coraje', description: 'Es inmune a las condiciones que no sean potenciaciones.' }
        ]
      },
      {
        type: 'danino',
        typeLabel: 'Dañino',
        icon: '🔥',
        color: '#ef4444',
        conditions: [
          { name: 'Envenenamiento', description: 'Sufre 1d4 de daño al comenzar su turno.' },
          { name: 'Quemadura', description: 'Sufre 1d6 de daño al terminar su turno.' },
          { name: 'Explosivo', description: 'Los efectos de la habilidad o hechizos se aplican por igual al Área de Efecto.' }
        ]
      }
    ]
  },
  {
    id: 'unicas',
    name: 'Condiciones Únicas',
    description: 'Condiciones exclusivas de ciertas clases o habilidades.',
    icon: '💎',
    color: '#f0c040',
    categories: [
      {
        type: 'potenciacion',
        typeLabel: 'Potenciación',
        icon: '✨',
        color: '#4ade80',
        conditions: [
          { name: 'Armonía', description: 'Cuando una criatura bajo "Armonía" inflige daño, el invocador recupera 1 ⚡/💧; cuando el invocador inflige daño, la criatura recupera 1 ❤.' },
          { name: 'Kiai', description: 'Al entrar en postura, si recibes un ataque, habilidad o hechizo y estás a rango de ataque, puedes devolver un golpe que inflige 1d4 de daño.' }
        ]
      }
    ]
  }
];
