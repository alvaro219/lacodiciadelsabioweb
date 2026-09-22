// Lo propio de la web para cada raza: icono, color y textos de presentación.
// El resto de datos de la raza viene de la app (races.data.ts).

export interface RaceExtras {
  icon: string;
  color: string;
  passiveName: string;
  description: string;
  lore: string;
}

export const RACE_EXTRAS: Record<string, RaceExtras> = {
  humano: {
    icon: '⚔️',
    color: '#974400ff',
    passiveName: 'Determinación',
    description: 'Versátiles y ambiciosos, los humanos son la raza más adaptable del mundo. Pese a que no porten ninguna ventaja física con respecto a otras razas, están más que dispuestos a realizar cualquier tipo de tareas.',
    lore: 'Los humanos son comúnmente conocidos por su perseverancia y tenacidad ante los peligros. Pese a que no porten ninguna ventaja física con respecto a otras razas, están más que dispuestos a realizar cualquier tipo de tareas.',
  },
  elfo: {
    icon: '🌿',
    color: '#4ade80',
    passiveName: 'Visión en la Oscuridad',
    description: 'Los elfos son artistas natos, conocidos por su pasión por todas las formas de arte y su profundo interés en la biología.',
    lore: 'Estos seres orgánicos presentan una fusión única con la naturaleza. Su conexión con la naturaleza se refleja en su creatividad y habilidad para transformar el entorno en expresiones artísticas vivas.',
  },
  enano: {
    icon: '⛏️',
    color: '#b9b9b9ff',
    passiveName: 'Forja Interior',
    description: 'Los enanos son habitantes de las montañas, donde han creado una vasta red de túneles subterráneos que conectan sus reinos.',
    lore: 'Son estoícos y, aunque pueden parecer rudos al principio, poseen un gran corazón y una lealtad inquebrantable hacia sus amigos y familia. Su habilidad para trabajar con metales y piedra es legendaria.',
  },
  aasimar: {
    icon: '✨',
    color: '#ffe066',
    passiveName: 'Resplandor Celestial',
    description: 'Los Aasimar son seres celestiales, descendientes de ángeles o entidades divinas.',
    lore: 'Irradian una presencia majestuosa y poseen un fuerte sentido del deber y la justicia. A menudo son vistos como protectores y líderes naturales, utilizando sus habilidades para iluminar el camino en tiempos de oscuridad.',
  },
  orco: {
    icon: '💪',
    color: '#02a83fff',
    passiveName: 'Resistencia Implacable',
    description: 'Imponentes y feroces, los orcos son guerreros natos cuya fuerza bruta es solo igualada por su voluntad de sobrevivir.',
    lore: 'Viven en clanes tribales y valoran el poder y el honor en combate. A pesar de su apariencia temible, los orcos poseen una cultura rica y compleja, centrada en la preservación de la cultura y el linaje.',
  },
  mediano: {
    icon: '🔮',
    color: '#ffc558ff',
    passiveName: 'Visión Arcana',
    description: 'Pequeños pero brillantes, los medianos poseen una inteligencia aguda y una conexión innata con las corrientes mágicas del mundo.',
    lore: 'Los medianos compensan su reducido tamaño con una mente prodigiosa. Viven en comunidades rurales y tienen una afinidad natural con la magia y los objetos mágicos.',
  },
  lagarliz: {
    icon: '🦎',
    color: '#2dd4bf',
    passiveName: 'Camuflaje Natural',
    description: 'Reptilianos ágiles y sigilosos, los lagarliz son maestros del camuflaje cuya sangre fría les hace resistentes a los venenos.',
    lore: 'Los lagarliz son una raza reptiliana adaptada a una variedad de entornos, desde selvas densas hasta pantanos oscuros. Su piel escamosa y sus reflejos rápidos los convierten en cazadores eficientes y supervivientes natos.',
  },
  bestani: {
    icon: '🐾',
    color: '#f87171',
    passiveName: 'Instinto Salvaje',
    description: 'Los bestani son seres antropomorfos que viven de forma desestructurada y están repartidos por todo el mundo.',
    lore: 'En el pasado, tuvieron una cultura floreciente, pero ahora quedan pocos vestigios de esa civilización. Los bestani se dedican a todo tipo de oficios en diversos lugares, buscando labrarse un nuevo lugar en el mundo.',
  },
  omnimek: {
    icon: '⚙️',
    color: '#7a889bff',
    passiveName: 'Cuerpo Mecánico',
    description: 'Los omnimek son robots casi en su totalidad, envueltos en un misticismo debido a su origen desconocido.',
    lore: 'Nadie sabe quién los creó, cómo, ni cuándo, ni con qué propósito. Estos seres curiosos vagan por el mundo en busca de algo que incluso muchos de ellos han olvidado con el tiempo.',
  },
  lazuri: {
    icon: '🌊',
    color: '#60a5fa',
    passiveName: 'Hijo del Mar',
    description: 'Los Lazuri son una raza anfibia de cuerpos esbeltos y ojos que brillan como la luna sobre el agua. Su afinidad con el agua les convierte en los señores indiscutibles del océano.',
    lore: 'Maestros de la percepción y la adaptación, habitan en ciudades semi-sumergidas de coral y piedra, guiados por un profundo vínculo espiritual con las corrientes oceánicas.',
  },
  myridian: {
    icon: '🐜',
    color: '#ab47bc',
    passiveName: 'Último Aliento',
    description: 'Los Myridian son seres insectoides definidos por la unión entre el instinto y una férrea disciplina.',
    lore: 'Cubiertos de quitina brillante y deslumbrantes patrones bioluminiscentes, habitan en comunidades donde la cooperación y la sinergia lo son todo. Su cultura honra la interdependencia y el deber compartido, operando como un único organismo coordinado nacidos para proteger, construir y prosperar en grupo.',
  },
};
