import { Race } from '../models/race.model';

export const RACES: Race[] = [
  {
    id: 'humano',
    name: 'Humano',
    size: 'Mediano',
    speed: 30,
    traits: [],
    passiveName: 'Determinación',
    passive: 'Los críticos te inspiran otorgándote ventaja en la siguiente tirada con un d20 que realices.',
    description: 'Versátiles y ambiciosos, los humanos son la raza más adaptable del mundo. Pese a que no porten ninguna ventaja física con respecto a otras razas, están más que dispuestos a realizar cualquier tipo de tareas.',
    lore: 'Los humanos son comúnmente conocidos por su perseverancia y tenacidad ante los peligros. Pese a que no porten ninguna ventaja física con respecto a otras razas, están más que dispuestos a realizar cualquier tipo de tareas.',
    icon: '⚔️',
    color: '#974400ff',
    subraces: [
      {
        name: 'Humano',
        description: 'La variante estándar. Sin modificadores, pero con la pasiva de Determinación al máximo.',
        passive: 'Sin modificadores de atributo. Los críticos otorgan ventaja en la siguiente tirada de d20.',
        traits: []
      },
      {
        name: 'Primalga',
        description: 'Una variante más primitiva y físicamente poderosa del humano. Gana musculatura a costa de carisma, y puede correr a cuatro patas sin penalización.',
        passive: 'Puede correr a cuatro patas a velocidad completa sin penalización.',
        traits: [
          { attribute: 'FUE', modifier: 1 },
          { attribute: 'CAR', modifier: -1 }
        ]
      }
    ]
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
    passive: 'Tienes visión en la oscuridad y eres resistente al elemento Naturaleza.',
    description: 'Los elfos son artistas natos, conocidos por su pasión por todas las formas de arte y su profundo interés en la biología.',
    lore: 'Estos seres orgánicos presentan una fusión única con la naturaleza. Su conexión con la naturaleza se refleja en su creatividad y habilidad para transformar el entorno en expresiones artísticas vivas.',
    icon: '🌿',
    color: '#4ade80',
    subraces: [
      {
        name: 'Elfo',
        description: 'La variante estándar. Inteligente y conectado con la naturaleza, con visión en la oscuridad.',
        passive: 'Visión en la oscuridad y resistencia al elemento Naturaleza.',
        traits: [
          { attribute: 'INT', modifier: 1 },
          { attribute: 'FUE', modifier: -1 }
        ]
      },
      {
        name: 'Funguleno',
        description: 'Una variante de elfo con rasgos fúngicos. Más resistente y con una conexión única con las esporas, pero menos carismático.',
        passive: 'Inmune a Envenenar. Sus esporas pueden adormecer criaturas cercanas una vez por día.',
        traits: [
          { attribute: 'CON', modifier: 1 },
          { attribute: 'CAR', modifier: -1 }
        ]
      }
    ]
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
    passive: 'Digieres perfectamente cualquier mineral cocinado y eres resistente al elemento Fuego.',
    description: 'Los enanos son habitantes de las montañas, donde han creado una vasta red de túneles subterráneos que conectan sus reinos.',
    lore: 'Son estoícos y, aunque pueden parecer rudos al principio, poseen un gran corazón y una lealtad inquebrantable hacia sus amigos y familia. Su habilidad para trabajar con metales y piedra es legendaria.',
    icon: '⛏️',
    color: '#b9b9b9ff',
    subraces: [
      {
        name: 'Enano',
        description: 'La variante estándar. Robusto y resistente al fuego, con conocimiento innato de la forja.',
        passive: 'Resistente al elemento Fuego. Puede digerir minerales cocinados.',
        traits: [
          { attribute: 'CON', modifier: 1 },
          { attribute: 'DES', modifier: -1 }
        ]
      },
      {
        name: 'Titán',
        description: 'Una variante grande y poderosa del enano. Su tamaño Grande le da ventaja en empujes y agarres, pero pierde agilidad.',
        passive: 'Ventaja en tiradas de Voluntad. Su tamaño Grande le permite empujar criaturas más fácilmente.',
        traits: [
          { attribute: 'FUE', modifier: 1 },
          { attribute: 'DES', modifier: -1 }
        ],
        size: 'Grande'
      }
    ]
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
    passive: 'Puedes resplandecer en la oscuridad iluminando una sala pequeña y eres resistente al elemento Luz.',
    description: 'Los Aasimar son seres celestiales, descendientes de ángeles o entidades divinas.',
    lore: 'Irradian una presencia majestuosa y poseen un fuerte sentido del deber y la justicia. A menudo son vistos como protectores y líderes naturales, utilizando sus habilidades para iluminar el camino en tiempos de oscuridad.',
    icon: '✨',
    color: '#ffe066',
    subraces: [
      {
        name: 'Aasimar',
        description: 'La variante estándar. Carismático y luminoso, con resistencia a la luz sagrada.',
        passive: 'Resistente al elemento Luz. Puede iluminar su entorno como acción libre.',
        traits: [
          { attribute: 'CAR', modifier: 1 },
          { attribute: 'PER', modifier: -1 }
        ]
      },
      {
        name: 'Tiefling',
        description: 'Una variante tocada por la oscuridad infernal. Inteligente y con capacidad de planeo, resiste el fuego pero pierde carisma.',
        passive: 'Puede planear con alas infernales. Resistente al elemento Fuego.',
        traits: [
          { attribute: 'INT', modifier: 1 },
          { attribute: 'CAR', modifier: -1 }
        ]
      }
    ]
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
    passive: 'La primera vez al día que tu salud llegue a 0, recuperas ❤️ instantáneamente y al final de tu turno sufres 1 de daño.',
    description: 'Imponentes y feroces, los orcos son guerreros natos cuya fuerza bruta es solo igualada por su voluntad de sobrevivir.',
    lore: 'Viven en clanes tribales y valoran el poder y el honor en combate. A pesar de su apariencia temible, los orcos poseen una cultura rica y compleja, centrada en la preservación de la cultura y el linaje.',
    icon: '💪',
    color: '#02a83fff',
    subraces: [
      {
        name: 'Orco',
        description: 'La variante estándar. Grande y poderoso, con una pasiva de supervivencia única.',
        passive: 'La primera vez al día que llegue a 0 de vida, recupera ❤️ instantáneamente.',
        traits: [
          { attribute: 'FUE', modifier: 1 },
          { attribute: 'CAR', modifier: -1 }
        ],
        size: 'Grande',
        speed: 35
      },
      {
        name: 'Goblin',
        description: 'Una variante pequeña y ágil. Rápido y escurridizo, puede hablar vagamente con cualquier ser consciente.',
        passive: 'Habla vaga con cualquier ser consciente. Su tamaño Pequeño le permite esconderse en espacios reducidos.',
        traits: [
          { attribute: 'DES', modifier: 1 },
          { attribute: 'CAR', modifier: -1 }
        ],
        size: 'Pequeño',
        speed: 30
      }
    ]
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
    passive: 'Puedes ver las convergencias mágicas.',
    description: 'Pequeños pero brillantes, los medianos poseen una inteligencia aguda y una conexión innata con las corrientes mágicas del mundo.',
    lore: 'Los medianos compensan su reducido tamaño con una mente prodigiosa. Viven en comunidades rurales y tienen una afinidad natural con la magia y los objetos mágicos.',
    icon: '🔮',
    color: '#ffc558ff',
    subraces: [
      {
        name: 'Mediano',
        description: 'La variante estándar. Inteligente y con capacidad de ver la magia invisible a otras razas.',
        passive: 'Ve las convergencias mágicas. Ventaja en identificar objetos y zonas mágicas.',
        traits: [
          { attribute: 'INT', modifier: 1 },
          { attribute: 'PER', modifier: -1 }
        ]
      },
      {
        name: 'Hada',
        description: 'Una variante mágica y etérea. Más carismática y capaz de levitar, pero físicamente débil.',
        passive: 'Puede gastar energía para levitar y moverse por el aire hasta 10 pies de altura.',
        traits: [
          { attribute: 'CAR', modifier: 1 },
          { attribute: 'FUE', modifier: -1 }
        ]
      }
    ]
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
    passive: 'El color de tu piel se adapta al entorno y eres resistente a Envenenar.',
    description: 'Reptilianos ágiles y sigilosos, los lagarliz son maestros del camuflaje cuya sangre fría les hace resistentes a los venenos.',
    lore: 'Los lagarliz son una raza reptiliana adaptada a una variedad de entornos, desde selvas densas hasta pantanos oscuros. Su piel escamosa y sus reflejos rápidos los convierten en cazadores eficientes y supervivientes natos.',
    icon: '🦎',
    color: '#2dd4bf',
    subraces: [
      {
        name: 'Lagarliz',
        description: 'La variante estándar. Perceptivo y sigiloso, su piel cambia de color para camuflarse.',
        passive: 'Resistente a Envenenar. La piel cambia de color al entorno como acción libre.',
        traits: [
          { attribute: 'PER', modifier: 1 },
          { attribute: 'FUE', modifier: -1 }
        ]
      },
      {
        name: 'Dracánido',
        description: 'Una variante Grande con herencia dracónica. Más fuerte pero menos ágil, posee un aliento elemental una vez al día.',
        passive: 'Aliento elemental 1 vez al día (daño de elemento a elección en cono de 15 pies).',
        traits: [
          { attribute: 'FUE', modifier: 1 },
          { attribute: 'DES', modifier: -1 }
        ],
        size: 'Grande'
      }
    ]
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
    passive: 'Puedes oler la sangre a kilómetros y gastar energía para correr a 4 patas (+20 pies) hasta erguirte.',
    description: 'Los bestani son seres antropomorfos que viven de forma desestructurada y están repartidos por todo el mundo.',
    lore: 'En el pasado, tuvieron una cultura floreciente, pero ahora quedan pocos vestigios de esa civilización. Los bestani se dedican a todo tipo de oficios en diversos lugares, buscando labrarse un nuevo lugar en el mundo.',
    icon: '🐾',
    color: '#f87171',
    subraces: [
      {
        name: 'Bestani',
        description: 'La variante estándar. Perceptivo e instintivo, con capacidad de correr a cuatro patas.',
        passive: 'Huele la sangre a kilómetros. Puede correr a cuatro patas (+20 pies) hasta erguirse.',
        traits: [
          { attribute: 'PER', modifier: 1 },
          { attribute: 'INT', modifier: -1 }
        ]
      },
      {
        name: 'Kenku',
        description: 'Una variante con rasgos de ave. Más ágil y capaz de imitar a la perfección cualquier voz o sonido que haya escuchado.',
        passive: 'Imita perfectamente cualquier voz o sonido escuchado anteriormente.',
        traits: [
          { attribute: 'DES', modifier: 1 },
          { attribute: 'FUE', modifier: -1 }
        ]
      }
    ]
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
    passive: 'No necesitas comer ni respirar.',
    description: 'Los omnimek son robots casi en su totalidad, envueltos en un misticismo debido a su origen desconocido.',
    lore: 'Nadie sabe quién los creó, cómo, ni cuándo, ni con qué propósito. Estos seres curiosos vagan por el mundo en busca de algo que incluso muchos de ellos han olvidado con el tiempo.',
    icon: '⚙️',
    color: '#7a889bff',
    subraces: [
      {
        name: 'Omnimek',
        description: 'La variante estándar. Resistente y autosuficiente, no necesita comer ni respirar.',
        passive: 'No necesita comer ni respirar. Inmune a enfermedades biológicas.',
        traits: [
          { attribute: 'CON', modifier: 1 },
          { attribute: 'CAR', modifier: -1 }
        ]
      },
      {
        name: 'Germinante',
        description: 'Una variante Grande de origen orgánico-mecánico. Más robusto y con un límite de daño por impacto, pero menos inteligente.',
        passive: 'No puede perder más de ❤️❤️ por un solo ataque o habilidad.',
        traits: [
          { attribute: 'CON', modifier: 1 },
          { attribute: 'INT', modifier: -1 }
        ],
        size: 'Grande'
      }
    ]
  },
  {
    id: 'lazuri',
    name: 'Lazuri',
    size: 'Mediano',
    speed: 30,
    traits: [
      { attribute: 'PER', modifier: 1 },
      { attribute: 'DES', modifier: -1 }
    ],
    passiveName: 'Hijo del Mar',
    passive: 'Puedes aguantar la respiración 1 hora y moverte a velocidad máxima sin penalización en medios acuáticos. Eres resistente al elemento Agua.',
    description: 'Los Lazuri son una raza anfibia de cuerpos esbeltos y ojos que brillan como la luna sobre el agua. Su afinidad con el agua les convierte en los señores indiscutibles del océano.',
    lore: 'Maestros de la percepción y la adaptación, habitan en ciudades semi-sumergidas de coral y piedra, guiados por un profundo vínculo espiritual con las corrientes oceánicas.',
    icon: '🌊',
    color: '#60a5fa',
    subraces: [
      {
        name: 'Lazuri',
        description: 'La variante estándar. Perceptivo y adaptado al agua, aguanta la respiración durante horas.',
        passive: 'Aguanta la respiración 1 hora. Velocidad máxima en medios acuáticos. Resistente al elemento Agua.',
        traits: [
          { attribute: 'PER', modifier: 1 },
          { attribute: 'DES', modifier: -1 }
        ]
      },
      {
        name: 'Abisal',
        description: 'Una variante de aguas profundas. Más ágil pero más lento, puede respirar bajo el agua y ver en la oscuridad.',
        passive: 'Respira bajo el agua. Visión en la oscuridad total.',
        traits: [
          { attribute: 'DES', modifier: 1 },
          { attribute: 'CAR', modifier: -1 }
        ],
        speed: 25
      }
    ]
  }
];
