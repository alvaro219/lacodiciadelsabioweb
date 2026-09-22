// Lo propio de la web para cada clase: icono, color, rol y textos de
// presentación. El resto de datos de la clase viene de la app (classes.data.ts).

export interface ClassExtras {
  icon: string;
  color: string;
  role: string;
  passiveName: string;
  description: string;
  lore: string;
  subclasses: Record<string, { icon: string; description: string }>;
}

export const CLASS_EXTRAS: Record<string, ClassExtras> = {
  escaramuzador: {
    icon: '🏹',
    color: '#8f4adeff',
    role: 'DPS por Condición / Sigilo',
    passiveName: 'Oteador',
    description: 'Expertos en iniciar o terminar combates. Estos combatientes están entrenados en ser precisos y contundentes, de forma que puedan realizar todo el daño posible antes de que sus enemigos se conviertan en un problema o en rematar los adversarios que se resisten a sucumbir.',
    lore: '',
    subclasses: {
      explorador: { icon: '🎯', description: 'El Explorador es un tirador estratégico que domina la distancia y el control del movimiento enemigo. Marca presas, castiga desplazamientos y convierte cada disparo en una amenaza calculada que condiciona el campo de batalla.' },
      ladron: { icon: '🗡️', description: 'El Ladrón es movilidad pura y ejecución precisa. Ataca desde la sombra, manipula el ritmo del combate y multiplica su daño cuando encuentra el momento perfecto para golpear.' },
      duelista: { icon: '⚔️', description: 'El Duelista es control personal y castigo del duelo. Provoca a sus rivales, los acorrala con su guardia y contraataca con precisión quirúrgica, convirtiendo cada fallo enemigo en una oportunidad letal.' },
    },
  },
  luchador: {
    icon: '⚔️',
    color: '#f87171',
    role: 'DPS a melee / Autosuficiente',
    passiveName: 'Eristicismo',
    description: 'Solitarios y feroces. Los Luchadores son famosos no por sus capacidades de cooperación sino por presentar una amenaza más que importante por sí solos. Tienen recursos para mantenerse con vida o rebajar la amenaza de sus contendientes.',
    lore: 'Los luchadores viven para el combate. Cada cicatriz es una lección aprendida, cada victoria una prueba de su valía. No necesitan magia ni artimañas — sus puños, su acero y su voluntad inquebrantable son todo lo que necesitan para dominar cualquier campo de batalla.',
    subclasses: {
      guerrero: { icon: '🗡️', description: 'El Guerrero es fuerza frontal y autosuficiencia. Avanza, empuja y rompe defensas con contundencia física, castigando errores y dominando el espacio cuerpo a cuerpo sin depender de nadie.' },
      'artista-marcial': { icon: '👊', description: 'El Artista Marcial alterna entre combate técnico y explosiones de movilidad mediante el uso de Postura e Impulso, castigando cualquier error del enemigo y encadenando estados alterados con precisión.' },
      barbaro: { icon: '🪓', description: 'El Bárbaro es furia desatada y potencia bruta. Entra en Rabia para desbloquear ataques atronadores que cargan durante turnos, barren áreas enteras y sacuden el terreno, convirtiendo el campo de batalla en su patio de destrucción.' },
    },
  },
  protector: {
    icon: '🛡️',
    color: '#f7fa60ff',
    role: 'Tanque / Soporte defensivo',
    passiveName: 'Entereza',
    description: 'Resistentes y contundentes. Estos increíbles aliados cuentan con excelentes formas de mantener al equipo a salvo de los enemigos ya sea con sus escudos o con su propio cuerpo.',
    lore: 'Los protectores son el escudo del mundo. Juran defender a los inocentes y a sus compañeros con su propia vida si es necesario. Su entrenamiento les ha convertido en fortalezas vivientes, capaces de resistir avalanchas de golpes sin ceder un paso.',
    subclasses: {
      paladin: { icon: '🔨', description: 'El Paladín es un defensor sagrado que protege aliados, provoca enemigos y canaliza justicia divina. Controla la agresión rival y transforma la fe en resistencia y castigo equilibrado.' },
      cruzado: { icon: '✝️', description: 'El Cruzado es un baluarte que sacrifica su propia defensa para potenciar al grupo. Se convierte en estandarte viviente, fortaleciendo aliados mientras asume el peso del combate sagrado.' },
      penitente: { icon: '✝️', description: 'El Penitente es un mártir de combate que se inflige condiciones a sí mismo para potenciar al grupo. Absorbe el sufrimiento ajeno y lo convierte en castigo para los enemigos, transformando el dolor propio en escudo y sentencia.' },
    },
  },
  artillero: {
    icon: '🔧',
    color: '#fb923c',
    role: 'Control / Táctico',
    passiveName: 'Clank',
    description: 'Los Artilleros son unos increíbles visionarios que construyen maravillas futurísticas avanzadas a su tiempo. Podría decirse que un Artillero lo suficientemente ingenioso solo trabaja un tercio de su vida… Si ha hecho bien su trabajo.',
    lore: 'Los artilleros son los inventores del campo de batalla. Donde otros ven chatarra, ellos ven potencial. Sus mentes brillantes diseñan dispositivos capaces de cambiar el curso de cualquier enfrentamiento.',
    subclasses: {
      ingeniero: { icon: '🔫', description: 'El Ingeniero es control tecnológico y automatización táctica. Despliega torretas, campos y maquinaria que alteran el terreno, creando zonas peligrosas y presión constante.' },
      maquinista: { icon: '⚙️', description: 'El Maquinista combate junto a su robot táctico personal. Alterna entre asistencia directa y destrucción masiva, sacrificando recursos mecánicos para obtener picos de poder explosivo.' },
      operador: { icon: '🤖', description: 'El Operador coordina un ejército de Robots Soldado que replican sus acciones. Cuantas más unidades mantiene en el campo, mayor es su presencia táctica y su potencial ofensivo.' },
    },
  },
  controlador: {
    icon: '🔥',
    color: '#71d2f8ff',
    role: 'DPS mágico / Control',
    passiveName: 'Canalización Arcana',
    description: 'Constantes y meticulosos. Los Controladores son ingeniosos a la hora de realizar constantes cantidades de daño en el tiempo prolongado. Sus objetivos favoritos son tipos grandes con enormes cantidades de vida.',
    lore: 'Los controladores son los arquitectos de la destrucción arcana. Años de estudio les han otorgado un dominio sobre las fuerzas mágicas que pocos pueden igualar. Cada hechizo es una obra de arte letal, cada encantamiento una sentencia.',
    subclasses: {
      mago: { icon: '☄️', description: 'El Mago es poder arcano directo y control absoluto. Inflige daño inevitable, encierra enemigos y manipula el espacio del combate con hechizos devastadores que obligan a sus rivales a jugar bajo sus reglas.' },
      arcanista: { icon: '📖', description: 'El Arcanista es un estratega del terreno. A través de sellos mágicos permanentes, transforma el campo de batalla en una trampa viva que daña, silencia y reubica el flujo del combate a su favor.' },
      astronomo: { icon: '🌌', description: 'El Astrónomo invoca rocas orbitales que dañan pasivamente a los enemigos cercanos y puede ceder a sus aliados. Una red gravitacional de apoyo y presión constante que culmina en una supernova devastadora.' },
    },
  },
  invocador: {
    icon: '🐉',
    color: '#63de4aff',
    role: 'Invocaciones / Versatilidad',
    passiveName: 'Vínculo Natural',
    description: 'Equilibrados y variados. Los Invocadores son famosos por sus poderosos aliados. Invocaciones con inmensas y diversas capacidades para ayudar al grupo ya sea aportando daño, apoyo al equipo o simple supervivencia.',
    lore: 'Los invocadores han forjado pactos con las criaturas del más allá. Su poder no reside en la destrucción directa, sino en la capacidad de llamar aliados de otros planos para que luchen a su lado.',
    subclasses: {
      druida: { icon: '🌳', description: 'El Druida domina la naturaleza y la transformación. Invoca aliados animales, altera el terreno y modifica su propio cuerpo para adaptarse a cada situación del combate.' },
      monje: { icon: '☯️', description: 'El Monje canaliza energía vital a través de distintas posturas. Se adapta constantemente, alternando defensa, movilidad y explosión ofensiva según la necesidad del momento.' },
      chaman: { icon: '🌿', description: 'El Chamán controla el campo mediante Tótems del Sol y la Luna. Alterna entre daño y curación zonal, y puede combinar ambos poderes en el devastador Tótem del Eclipse.' },
    },
  },
  velador: {
    icon: '💚',
    color: '#4adeadff',
    role: 'Protección / Gestión de escudos',
    passiveName: 'Plegaria',
    description: 'Vitales y persistentes. Cuando todas las medidas de seguridad fallen y tu equipo esté a las puertas de la muerte, allí estarán estos excelentes aliados listos para daros una segunda oportunidad, o las que hagan falta.',
    lore: 'Los veladores son la luz en la oscuridad, la esperanza cuando todo parece perdido. Su magia no destruye, sino que restaura y protege. Cada curación es un acto de fe, cada barrera un juramento de protección.',
    subclasses: {
      clerigo: { icon: '📿', description: 'El Clérigo es sostén y salvación del grupo. Protege, bendice y convierte la energía divina en escudos y supervivencia, garantizando que sus aliados resistan incluso en el peor momento.' },
      oraculo: { icon: '👁️', description: 'El Oráculo es un combatiente místico que manipula el equilibrio entre vida, escudo y sacrificio. Su poder nace del intercambio constante: cuanto más arriesga, más protege o destruye.' },
      restaurador: { icon: '🌟', description: 'El Restaurador convierte el sufrimiento ajeno en protección para el grupo. Exalta almas, expía condiciones y canaliza el dolor recibido para forjar escudos reactivos para sus aliados.' },
    },
  },
  exaltador: {
    icon: '🎵',
    color: '#f04092ff',
    role: 'Buff / Soporte ofensivo',
    passiveName: 'Maquillar',
    description: 'Peligrosos e inspiradores. Aunque los Exaltadores pueden llegar a provocar algunos resultados no deseados, suelen ser grandes fuentes de apoyo para el equipo. Si bien no siempre controlan todo su potencial, pueden ser la diferencia entre la vida y la muerte de la forma más literal posible.',
    lore: 'Los exaltadores son los catalizadores de la grandeza. Su magia no destruye ni cura directamente, sino que desbloquea el potencial oculto en los demás. Con una canción, un gesto o una palabra de poder, pueden convertir a un soldado mediocre en un campeón invencible.',
    subclasses: {
      bardo: { icon: '🎶', description: 'El Bardo es ritmo y sinergia. Potencia a sus aliados mediante música, acelera el flujo del combate y convierte la coordinación del grupo en su mayor arma.' },
      cartomante: { icon: '🃏', description: 'El Cartomante manipula el azar y los estados mediante cartas arcanas. Transforma la incertidumbre en ventaja y convierte condiciones negativas en oportunidades estratégicas.' },
      bailarin: { icon: '💃', description: 'El bailarín es un maestro del apoyo en combate. Cambia de estilo de baile para centrarte en la ofensiva o defensiva.' },
    },
  },
  mistico: {
    icon: '🌑',
    color: '#bb8bfaff',
    role: 'Debuff / Control',
    passiveName: 'Comunión con la muerte',
    description: 'Absolutos y manipuladores. Los Místicos prefieren destacar su potencial de formas abruptas. No existen términos medios con ellos, es todo o nada. Son la representación más viva del azar y pueden convertir algunos combates en simples trivialidades.',
    lore: 'Los místicos caminan por el filo entre la luz y la oscuridad, y han elegido abrazar las sombras. Su magia no es malvada per se, sino una herramienta que pocos se atreven a empuñar.',
    subclasses: {
      brujo: { icon: '🖐️', description: 'El Brujo es interrupción y castigo oscuro. Paraliza, ralentiza y detiene al enemigo, dominando el tempo del combate mediante control severo y debilitamiento constante.' },
      aruspice: { icon: '💀', description: 'El Arúspice es un ritualista del sufrimiento. Convierte los estados perjudiciales en su mayor arma, propagándolos, explotándolos y amplificándolos, incluso a costa de su propio cuerpo.' },
      arlequin: { icon: '🃏', description: 'El Arlequín es un especialista en el engaño y las ilusiones. Castigando a sus rivales por equivocarse de objetivo y esparciendo el caos en la batalla.' },
    },
  },
  apotecario: {
    icon: '⚗️',
    color: '#d4a373',
    role: 'Soporte / Viales adaptativos',
    passiveName: 'Vial Preparado',
    description: 'Astutos y adaptativos. Los Apotecarios se amoldan según la necesidad del combate y de su grupo. Su capacidad para potenciar y debilitar es muy amplia pero viene a costa de una organizada preparación de sus recursos y sus famosos viales que contienen todo cuanto una imaginación pueda crear.',
    lore: '',
    subclasses: {
      alquimista: { icon: '⚗️', description: 'El Alquimista prepara invenciones cuyo efecto decide el azar: potencian un atributo y debilitan otro. Las lanza como bombas, las aplica al arma de un aliado y puede guardar las mejores fórmulas para usarlas más adelante.' },
      genetista: { icon: '🧬', description: 'El Genetista absorbe la principal fuente de poder de sus enemigos con su mandoble y la convierte en un aura que potencia a sus aliados, a los que protege con escudo e incluso con invulnerabilidad momentánea.' },
      hematurgo: { icon: '🩸', description: 'El Hematurgo carga su propia esencia en los viales para regenerarse, drena la vida de los enemigos cercanos y reparte escudo entre sus aliados a costa de su propia sangre.' },
    },
  },
};
