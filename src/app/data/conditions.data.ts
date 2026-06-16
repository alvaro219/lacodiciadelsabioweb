import { ConditionGroup } from '../models/condition.model';

export const CONDITION_GROUPS: ConditionGroup[] = [
  {
    id: 'restriccion',
    name: 'Restricciones',
    description: 'Impiden realizar determinadas acciones o movimientos. Son las más limitantes del sistema.',
    icon: '🔒',
    color: '#f87171',
    categories: [
      {
        type: 'restriccion',
        typeLabel: 'Restricción',
        icon: '🔒',
        color: '#f87171',
        conditions: [
          {
            name: 'Derribado',
            description: 'Estás tirado en el suelo y los enemigos tienen ventaja para acertarte con habilidades y ataques.',
            duration: 'persistente',
            exitCondition: 'Gastar 🟢 para levantarte.'
          },
          {
            name: 'Inmóvil',
            description: 'No puedes desplazarte voluntariamente de ninguna manera.',
            duration: 'persistente',
            savingThrow: 'Fortaleza',
            exitCondition: 'Superar salvación de Fortaleza al inicio del turno.'
          },
          {
            name: 'Miedo',
            description: 'No se pueden realizar habilidades, hechizos y acciones que conlleven movimiento y te acerquen a quien te infligió el miedo.',
            duration: 'temporal',
            savingThrow: 'Voluntad'
          },
          {
            name: 'Incapacitar',
            description: 'No puede gastar ⚡ para realizar habilidades.',
            duration: 'temporal',
            savingThrow: 'Voluntad'
          },
          {
            name: 'Mudez',
            description: 'No puede gastar 💧 para lanzar hechizos.',
            duration: 'persistente',
            savingThrow: 'Fortaleza',
            exitCondition: 'Superar salvación de Fortaleza al inicio del turno.'
          },
          {
            name: 'Provocado',
            description: 'Solo se puede hacer objetivos a quien se designa como objetivo de la provocación.',
            duration: 'persistente',
            savingThrow: 'Voluntad',
            exitCondition: 'Superar salvación de Voluntad al inicio del turno.'
          },
          {
            name: 'Confusión',
            description: 'Antes de resolver cada acción, debes tirar 1d20, si sale 11 o más, eliges libremente el objetivo, si sale 10 o menos, se elige un aliado aleatorio como objetivo.',
            duration: 'temporal',
            savingThrow: 'Voluntad'
          }
        ]
      }
    ]
  },
  {
    id: 'debilitacion',
    name: 'Debilitaciones',
    description: 'No impiden actuar, pero empeoran el rendimiento del personaje en combate.',
    icon: '💔',
    color: '#fb923c',
    categories: [
      {
        type: 'debilitacion',
        typeLabel: 'Debilitación',
        icon: '💔',
        color: '#fb923c',
        conditions: [
          {
            name: 'Desprevenido',
            description: 'Tienes desventaja en las tiradas de salvación.',
            duration: 'temporal'
          },
          {
            name: 'Parálisis',
            description: 'Cuando intentes realizar cualquier acción debes superar una tirada de salvación (CD = 12 - 🟢 restantes). En caso de no superarla, la acción se cancela y los recursos usados se pierden.',
            duration: 'persistente',
            savingThrow: 'Fortaleza',
            exitCondition: 'Superar salvación de Fortaleza al inicio del turno.'
          },
          {
            name: 'Entumecido',
            description: 'El número de ⚡/💧 que cuestan los hechizos y habilidades aumenta en 1.',
            duration: 'temporal',
            savingThrow: 'Voluntad'
          },
          {
            name: 'Aturdido',
            description: 'Realizas todo con desventaja.',
            duration: 'temporal',
            exitCondition: 'Tener éxito realizando alguna acción.'
          },
          {
            name: 'Cegar',
            description: 'Las habilidades y hechizos realizados se ejecutan con desventaja.',
            duration: 'temporal'
          },
          {
            name: 'Frágil',
            description: 'El margen para infligir daños aumenta de 4 a 5.',
            duration: 'temporal'
          },
          {
            name: 'Ralentizado',
            description: 'El número de 🟢 disminuye de 3 por turno a 2.',
            duration: 'temporal'
          },
          {
            name: 'Debilidad',
            description: 'El margen para sufrir daños baja de 4 a 3.',
            duration: 'temporal'
          }
        ]
      }
    ]
  },
  {
    id: 'potenciacion',
    name: 'Potenciaciones',
    description: 'Mejoran las capacidades del personaje o lo protegen de daño.',
    icon: '✨',
    color: '#4ade80',
    categories: [
      {
        type: 'potenciacion',
        typeLabel: 'Potenciación',
        icon: '✨',
        color: '#4ade80',
        conditions: [
          {
            name: 'Montar',
            description: 'El daño se dirige primero a la montura y si esta es derrotada o se baja de la montura, entonces al/la jinete.',
            duration: 'persistente',
            exitCondition: 'Desmontar voluntariamente o ser derrotada la montura.'
          },
          {
            name: 'Invisibilidad',
            description: 'No puede ser objetivo de hechizos o habilidades, pero es afectado por las Áreas de Efecto.',
            duration: 'persistente',
            exitCondition: 'Realizar una acción ofensiva.'
          },
          {
            name: 'Impulso',
            description: 'Después de usar la siguiente habilidad, recuperas 🟢.',
            duration: 'persistente',
            exitCondition: 'Usar la siguiente habilidad.'
          },
          {
            name: 'Égida',
            description: 'El daño del siguiente golpe queda anulado.',
            duration: 'persistente',
            exitCondition: 'Absorber un golpe.'
          },
          {
            name: 'Invulnerable',
            description: 'Eres inmune al daño recibido.',
            duration: 'temporal'
          },
          {
            name: 'Vigorizado',
            description: 'El número de ⚡/💧 que cuestan hechizos y habilidades se reduce en 1 hasta un mínimo de 1.',
            duration: 'temporal'
          },
          {
            name: 'Acelerado',
            description: 'El número de 🟢 por turno aumenta de 3 a 4.',
            duration: 'temporal'
          },
          {
            name: 'Coraje',
            description: 'Es inmune a las condiciones restrictivas.',
            duration: 'temporal'
          },
          {
            name: 'Armonía',
            description: 'Cuando una criatura bajo "Armonía" inflige daño, el invocador recupera 1 ⚡/💧; cuando el invocador inflige daño, la criatura recupera 1 ❤.',
            duration: 'persistente',
            exitCondition: 'Terminar el combate.'
          },
          {
            name: 'Kiai',
            description: 'Al entrar en postura, si recibes un ataque, habilidad o hechizo y estás a rango de ataque, puedes devolver un golpe que inflige 1d4 de daño.',
            duration: 'persistente',
            exitCondition: 'Realizar un ataque reactivo gracias a esta condición.'
          },
          {
            name: 'Postura',
            description: 'Te encuentras preparado para el combate, potenciando algunas de tus habilidades de combate.',
            duration: 'temporal',
            exitCondition: 'Realizar una habilidad potenciada gracias a esta condición.'
          },
          {
            name: 'Volar',
            description: 'No eres afectado por efectos en el suelo, puedes moverte verticalmente de misma forma que horizontalmente y eres inmune a "Derribado".',
            duration: 'temporal'
          },
          {
            name: 'Regeneración',
            description: 'Al comienzo de tu turno, recibes 🛡️.',
            duration: 'temporal'
          }
        ]
      }
    ]
  },
  {
    id: 'danino',
    name: 'Dañinas',
    description: 'Causan daño de forma periódica al inicio o al final del turno.',
    icon: '🔥',
    color: '#ef4444',
    categories: [
      {
        type: 'danino',
        typeLabel: 'Dañina',
        icon: '🔥',
        color: '#ef4444',
        conditions: [
          {
            name: 'Envenenamiento',
            description: 'Sufre 1d4 de daño al comenzar su turno.',
            duration: 'persistente',
            savingThrow: 'Fortaleza',
            exitCondition: 'Superar salvación de Fortaleza al inicio del turno.'
          },
          {
            name: 'Quemadura',
            description: 'Sufre 1d6 de daño al terminar su turno.',
            duration: 'persistente',
            savingThrow: 'Agilidad',
            exitCondition: 'Superar salvación de Agilidad al inicio del turno.'
          },
          {
            name: 'Rabia',
            description: 'Pierdes 🛡️ al comienzo de tu turno y eres incapaz de comunicarte o escuchar.',
            duration: 'persistente',
            exitCondition: 'Derrotar a un enemigo.'
          }
        ]
      }
    ]
  }
];
