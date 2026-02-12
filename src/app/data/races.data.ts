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
    description: 'Versátiles y ambiciosos, los humanos son la raza más adaptable del mundo. Su determinación les permite superar cualquier obstáculo.',
    lore: 'Los humanos han construido imperios y los han visto caer, pero su espíritu indomable siempre les impulsa a levantarse. No poseen dones innatos como otras razas, pero su capacidad de adaptación y su voluntad férrea les convierten en adversarios temibles y aliados invaluables. Donde otros ven límites, los humanos ven oportunidades.',
    icon: '⚔️',
    color: '#e8a020'
  },
  {
    id: 'elfo',
    name: 'Elfo',
    size: 'Mediano',
    speed: 30,
    traits: [
      { attribute: 'PER', modifier: 1 },
      { attribute: 'FUE', modifier: -1 }
    ],
    passiveName: 'Visión en la Oscuridad',
    passive: 'Puede ver en la oscuridad total como si fuera luz tenue.',
    description: 'Seres etéreos de sentidos agudos y gracia natural. Su conexión con la naturaleza les otorga una percepción sobrenatural.',
    lore: 'Nacidos de los bosques ancestrales, los elfos llevan milenios observando el mundo con sus ojos penetrantes. Su longevidad les ha dado una perspectiva única sobre la vida, valorando la paciencia y la sabiduría por encima de la fuerza bruta. Sus sentidos afinados les permiten percibir lo que otros no pueden, convirtiendo la noche en su aliada.',
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
    description: 'Robustos y tenaces, los enanos son maestros artesanos cuya constitución les permite resistir lo que destruiría a otros.',
    lore: 'Forjados en las profundidades de las montañas, los enanos han desarrollado una resistencia sobrenatural al calor y al fuego. Sus cuerpos, compactos y densos como la roca que habitan, pueden procesar minerales como alimento. Cada enano lleva en su sangre el fuego de las forjas ancestrales, lo que les hace prácticamente inmunes a las llamas.',
    icon: '⛏️',
    color: '#fb923c'
  },
  {
    id: 'aasimar',
    name: 'Aasimar',
    size: 'Mediano',
    speed: 30,
    traits: [
      { attribute: 'CAR', modifier: 1 },
      { attribute: 'FUE', modifier: -1 }
    ],
    passiveName: 'Resplandor Celestial',
    passive: 'Emite luz en la oscuridad. Resistente al daño de Luz.',
    description: 'Descendientes de seres celestiales, los aasimar irradian una presencia carismática que inspira a quienes les rodean.',
    lore: 'Los aasimar son el legado viviente de una antigua alianza entre mortales y seres de luz pura. Su piel emite un tenue resplandor dorado que se intensifica en la oscuridad, como un faro de esperanza. Aunque su fuerza física no es su mayor virtud, su carisma sobrenatural puede mover montañas y cambiar el curso de batallas enteras.',
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
    lore: 'Los orcos son la encarnación de la supervivencia. Más grandes y fuertes que la mayoría de razas, han sido forjados por siglos de conflicto y adversidad. Su capacidad de resistir la muerte misma, levantándose cuando otros caerían, les ha ganado tanto respeto como temor. Lo que les falta en diplomacia, lo compensan con una lealtad inquebrantable hacia los suyos.',
    icon: '💪',
    color: '#4ade80'
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
    lore: 'Los medianos compensan su reducido tamaño con una mente prodigiosa. Su capacidad para percibir las convergencias mágicas — puntos donde las líneas de poder se cruzan — les convierte en invaluables exploradores y consejeros. Donde otros ven un campo vacío, un mediano puede ver ríos de energía arcana fluyendo bajo la superficie del mundo.',
    icon: '🔮',
    color: '#a78bfa'
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
    lore: 'Los lagarliz evolucionaron en los pantanos más hostiles del mundo, donde solo los más astutos sobreviven. Su piel escamosa puede cambiar de tonalidad para mimetizarse con cualquier entorno, y su metabolismo único neutraliza cualquier toxina que entre en su organismo. Son observadores pacientes que prefieren esperar el momento perfecto para actuar.',
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
    description: 'Humanoides bestiales guiados por instintos primarios. Su conexión con su lado animal les otorga sentidos y velocidad sobrehumanos.',
    lore: 'Los bestani caminan entre dos mundos: el civilizado y el salvaje. Su herencia animal les dota de sentidos extraordinarios — pueden oler la sangre a gran distancia y, cuando la situación lo requiere, caer a cuatro patas para alcanzar velocidades que ningún bípedo podría igualar. Confían más en sus instintos que en la lógica, y rara vez se equivocan.',
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
    description: 'Constructos vivientes que fusionan lo orgánico con lo mecánico. Su naturaleza híbrida les libera de las necesidades biológicas básicas.',
    lore: 'Los omnimek son el resultado de una antigua fusión entre magia y tecnología. Ni completamente vivos ni completamente máquinas, existen en un estado único que les libera de las cadenas de la biología. No necesitan alimento ni aire, lo que les permite explorar lugares donde ningún ser orgánico sobreviviría. Su naturaleza les hace difíciles de comprender para otras razas, pero su resistencia es innegable.',
    icon: '⚙️',
    color: '#94a3b8'
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
    description: 'Seres acuáticos de piel azulada que dominan las profundidades. Su afinidad con el agua les convierte en los señores indiscutibles del océano.',
    lore: 'Los lazuri nacieron de las mareas, y al mar siempre regresan. Su piel azulada oculta branquias que les permiten respirar tanto en tierra como bajo el agua, y sus cuerpos están perfectamente adaptados al combate acuático. Aunque su constitución es más frágil en tierra firme, en su elemento son prácticamente imbatibles. Las leyendas dicen que los lazuri pueden escuchar los susurros del océano.',
    icon: '🌊',
    color: '#60a5fa'
  }
];
