import { Race } from '../models/race.model';

export const RACES: Race[] = [
  {
    id: 'humano',
    name: 'Humano',
    size: 'Mediano',
    speed: 30,
    traits: [],
    passiveName: 'Determinación',
    passive: 'Los críticos (d20 natural 20) otorgan ventaja en la siguiente tirada de d20.',
    description: 'Versátiles y ambiciosos, los humanos son la raza más adaptable del mundo. Pese a que no porten ninguna ventaja física con respecto a otras razas, están más que dispuestos a realizar cualquier tipo de tareas. Por esto, saben que sus esfuerzos merecen reconocimiento pues habrán sido ellos solos y sin ayuda de nada los que completen sus objetivos.',
    lore: 'Los humanos son comúnmente conocidos por su perseverancia y tenacidad ante los peligros. Pese a que no porten ninguna ventaja física con respecto a otras razas, están más que dispuestos a realizar cualquier tipo de tareas. Por esto, saben que sus esfuerzos merecen reconocimiento pues habrán sido ellos solos y sin ayuda de nada los que completen sus objetivos.',
    icon: '⚔️',
    color: '#974400ff'
  },
  {
    id: 'elfo',
    name: 'Elfo',
    size: 'Mediano',
    speed: 30,
    traits: [
      { attribute: 'INT', modifier: 1 },
      { attribute: 'FUE', modifier: -1 }
    ],
    passiveName: 'Visión en la Oscuridad',
    passive: 'Puede ver en la oscuridad total como si fuera luz tenue.',
    description: 'Los elfos son artistas natos, conocidos por su pasión por todas las formas de arte y su profundo interés en la biología.',
    lore: 'Estos seres orgánicos presentan una fusión única con la naturaleza, con características como cabello hecho de ramas y hojas. Su conexión con la naturaleza se refleja en su creatividad y habilidad para transformar el entorno en expresiones artísticas vivas.',
    icon: '🌿',
    color: '#4ade80'
  },
  {
    id: 'enano',
    name: 'Enano',
    size: 'Mediano',
    speed: 25,
    traits: [
      { attribute: 'CON', modifier: 1 },
      { attribute: 'DES', modifier: -1 }
    ],
    passiveName: 'Forja Interior',
    passive: 'Puede digerir minerales para alimentarse. Resistente al daño de Fuego.',
    description: 'Los enanos son habitantes de las montañas, donde han creado una vasta red de túneles subterráneos que conectan sus reinos.',
    lore: 'Son estoicos y, aunque pueden parecer rudos al principio, poseen un gran corazón y una lealtad inquebrantable hacia sus amigos y familia. Su habilidad para trabajar con metales y piedra es legendaria, y son conocidos por su resistencia y determinación.',
    icon: '⛏️',
    color: '#b9b9b9ff'
  },
  {
    id: 'aasimar',
    name: 'Aasimar',
    size: 'Mediano',
    speed: 30,
    traits: [
      { attribute: 'CAR', modifier: 1 },
      { attribute: 'PER', modifier: -1 }
    ],
    passiveName: 'Resplandor Celestial',
    passive: 'Emite luz en la oscuridad. Resistente al daño de Luz.',
    description: 'Los Aasimar son seres celestiales, descendientes de ángeles o entidades divinas.',
    lore: 'Irradian una presencia majestuosa y poseen un fuerte sentido del deber y la justicia. A menudo son vistos como protectores y líderes naturales, utilizando sus habilidades para iluminar el camino en tiempos de oscuridad.',
    icon: '✨',
    color: '#ffe066'
  },
  {
    id: 'orco',
    name: 'Orco',
    size: 'Grande',
    speed: 35,
    traits: [
      { attribute: 'FUE', modifier: 1 },
      { attribute: 'CAR', modifier: -1 }
    ],
    passiveName: 'Resistencia Implacable',
    passive: 'Al llegar a 0 PV, recupera ❤️ una vez al día.',
    description: 'Imponentes y feroces, los orcos son guerreros natos cuya fuerza bruta es solo igualada por su voluntad de sobrevivir.',
    lore: 'Viven en clanes tribales y valoran el poder y el honor en combate. A pesar de su apariencia temible, los orcos poseen una cultura rica y compleja, centrada en la preservación de la cultura y el linaje así como la búsqueda espiritual.',
    icon: '💪',
    color: '#02a83fff'
  },
  {
    id: 'mediano',
    name: 'Mediano',
    size: 'Pequeño',
    speed: 25,
    traits: [
      { attribute: 'INT', modifier: 1 },
      { attribute: 'PER', modifier: -1 }
    ],
    passiveName: 'Visión Arcana',
    passive: 'Puede ver convergencias mágicas invisibles para otras razas.',
    description: 'Pequeños pero brillantes, los medianos poseen una inteligencia aguda y una conexión innata con las corrientes mágicas del mundo.',
    lore: 'Los medianos compensan su reducido tamaño con una mente prodigiosa. Viven en comunidades rurales y tienen una afinidad natural con la magia y los objetos mágicos. Su curiosidad insaciable y su espíritu aventurero los llevan a menudo a embarcarse en grandes viajes.',
    icon: '🔮',
    color: '#ffc558ff'
  },
  {
    id: 'lagarliz',
    name: 'Lagarliz',
    size: 'Mediano',
    speed: 30,
    traits: [
      { attribute: 'PER', modifier: 1 },
      { attribute: 'FUE', modifier: -1 }
    ],
    passiveName: 'Camuflaje Natural',
    passive: 'Puede camuflarse con el entorno. Inmune a Envenenamiento.',
    description: 'Reptilianos ágiles y sigilosos, los lagarliz son maestros del camuflaje cuya sangre fría les hace inmunes a los venenos.',
    lore: 'Los lagarliz son una raza reptiliana adaptada a una variedad de entornos, desde selvas densas hasta pantanos oscuros. Su piel escamosa y sus reflejos rápidos los convierten en cazadores eficientes y supervivientes natos. Son conocidos por su adaptabilidad y su capacidad para mezclarse con su entorno.',
    icon: '🦎',
    color: '#2dd4bf'
  },
  {
    id: 'bestani',
    name: 'Bestani',
    size: 'Mediano',
    speed: 30,
    traits: [
      { attribute: 'PER', modifier: 1 },
      { attribute: 'INT', modifier: -1 }
    ],
    passiveName: 'Instinto Salvaje',
    passive: 'Puede oler la sangre. Puede correr a cuatro patas (+20 pies de velocidad).',
    description: 'Los bestani son seres antropomorfos que viven de forma desestructurada y están repartidos por todo el mundo.',
    lore: 'En el pasado, tuvieron una cultura floreciente, pero ahora quedan pocos vestigios de esa civilización. Los bestani se dedican a todo tipo de oficios en diversos lugares, buscando labrarse un nuevo lugar en el mundo.',
    icon: '🐾',
    color: '#f87171'
  },
  {
    id: 'omnimek',
    name: 'Omnimek',
    size: 'Mediano',
    speed: 30,
    traits: [
      { attribute: 'CON', modifier: 1 },
      { attribute: 'CAR', modifier: -1 }
    ],
    passiveName: 'Cuerpo Mecánico',
    passive: 'No necesita comer ni respirar.',
    description: 'Los omnimek son robots casi en su totalidad, envueltos en un misticismo debido a su origen desconocido.',
    lore: 'Nadie sabe quién los creó, cómo, ni cuándo, ni con qué propósito. Estos seres curiosos vagan por el mundo en busca de algo que incluso muchos de ellos han olvidado con el tiempo. Su existencia es un enigma, y su búsqueda incansable los impulsa a explorar y descubrir.',
    icon: '⚙️',
    color: '#7a889bff'
  },
  {
    id: 'lazuri',
    name: 'Lazuri',
    size: 'Mediano',
    speed: 30,
    traits: [
      { attribute: 'PER', modifier: 1 },
      { attribute: 'CON', modifier: -1 }
    ],
    passiveName: 'Hijo del Mar',
    passive: 'Puede respirar bajo el agua. Sin penalización en combate acuático.',
    description: 'Los Lazuri son una raza anfibia de cuerpos esbeltos y ojos que brillan como la luna sobre el agua. Su afinidad con el agua les convierte en los señores indiscutibles del océano.',
    lore: 'Maestros de la percepción y la adaptación, habitan en ciudades semi-sumergidas de coral y piedra, guiados por un profundo vínculo espiritual con las corrientes oceánicas. Su agudeza para ver y escuchar más allá de lo evidente contrasta con su frágil constitución.',
    icon: '🌊',
    color: '#60a5fa'
  }
];
