import { GameClass } from '../models/class.model';

export const CLASSES: GameClass[] = [
  // ===== MARTIAL CLASSES =====
  {
    id: 'escaramuzador',
    name: 'Escaramuzador',
    role: 'DPS por Condición / Sigilo',
    type: 'martial',
    resource: 'Energía',
    resourceIcon: '⚡',
    shieldBase: 2,
    passiveName: 'Oteador',
    passive: 'El terreno difícil no te afecta.',
    masteryPassiveName: 'Maestro del Terreno',
    masteryPassive: 'Tu dominio del campo de batalla es absoluto. Puedes moverte a través de enemigos sin provocar ataques de oportunidad y obtienes +2 a todas las tiradas de ataque cuando te has movido al menos 15 pies en tu turno.',
    hb1: 'Buscas información sobre una cosa en concreto ya sea seguir la pista de algo o alguien o conseguir datos sobre algo y consigues 1 dato verdadero y 1 dato falso.',
    hb2: 'Creas una distracción de forma sencilla que dura 2 turnos.',
    description: 'Expertos en iniciar o terminar combates. Estos combatientes están entrenados en ser precisos y contundentes, de forma que puedan realizar todo el daño posible antes de que sus enemigos se conviertan en un problema o en rematar los adversarios que se resisten a sucumbir.',
    lore: '',
    icon: '🏹',
    color: '#8f4adeff',
    subclasses: [
      {
        id: 'explorador',
        name: 'Explorador',
        weapons: 'Arco (2 manos)',
        weaponType: '2-manos',
        description: 'El Explorador es un tirador estratégico que domina la distancia y el control del movimiento enemigo. Marca presas, castiga desplazamientos y convierte cada disparo en una amenaza calculada que condiciona el campo de batalla.',
        icon: '🎯',
        abilities: {
          hap1: 'Preparación Letal: Preparas tu arco para disparar a cualquier enemigo que sea atacado hasta el comienzo de tu próximo turno.',
          hap2: 'Marca del Cazador: Apuntas a un enemigo específico, obteniendo ventaja en el próximo ataque que realices contra él. Esto marca a dicho enemigo hasta el comienzo de tu próximo turno.',
          hap3: 'Flecha Envenenada: Disparas una flecha envenenada que provoca “Envenenamiento” si hiere, causando daño extra de 1d4 al comienzo de cada turno.',
          hap4: 'Disparo de Oportunidad (Reacción): Si un enemigo que marcaste intenta moverse, puedes realizar un ataque de oportunidad a distancia.',
          had: 'Flecha Perforadora Rebotante: Disparas una flecha con “Perforar” que rebota hasta 2 veces contra paredes u objetos, causando daño a todos los enemigos en su línea de trayectoria.'
        }
      },
      {
        id: 'ladron',
        name: 'Ladrón',
        weapons: 'Daga + Ballesta (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Ladrón es movilidad pura y ejecución precisa. Ataca desde la sombra, manipula el ritmo del combate y multiplica su daño cuando encuentra el momento perfecto para golpear.',
        icon: '🗡️',
        abilities: {
          hap1: 'Paso Sombrío: Das un paso sombrío y te camuflas en el entorno obteniendo “Invisibilidad” hasta el final de tu siguiente turno.',
          hap2: 'Asalto por la Espalda: Asaltas un objetivo por la espalda después de desplazarte la mitad de tu movimiento. Si infliges daño, este recibe “Derribado”.',
          has1: 'Golpe Preparado: Te preparas tu siguiente acción. La siguiente vez que aciertes una acción ofensiva, realizas el doble de daño.',
          has2: 'Ataque a Desprevenido (Reacción): Si realizas una acción ofensiva a alguien “Desprevenido”, aciertas directamente.',
          had: 'Tajo del Vacío: Te teleportas a un enemigo que puedas ver dentro de dos veces tu movimiento completo. Realizas un tajo oscuro que atraviesa el escudo del objetivo, infligiendo 1d10 de daño y “Parálisis” hasta el final de su siguiente turno.'
        }
      }
    ]
  },
  {
    id: 'luchador',
    name: 'Luchador',
    role: 'DPS a melee / Autosuficiente',
    type: 'martial',
    resource: 'Energía',
    resourceIcon: '⚡',
    shieldBase: 3,
    passiveName: 'Eristicismo',
    passive: 'Cada vez que haces daño tras un crítico, ganas 🛡️ temporal.',
    masteryPassiveName: 'Furia Imparable',
    masteryPassive: 'Tu determinación en combate es legendaria. Cuando tu vida cae por debajo del 50%, obtienes +1d6 de daño adicional en todos tus ataques y resistencia a todo tipo de daño hasta que recuperes más del 50% de tu vida.',
    hb1: 'Análisis: Puedes intentar observar a un ser y obtener algún tipo de información sobre su fisionomía.',
    hb2: 'A las Armas: Puedes realizar una breve instrucción militar a los objetivos neutrales (si quieren) y aliados que los deja preparados para una batalla y con nociones básicas de combate.',
    description: 'Solitarios y feroces. Los Luchadores son famosos no por sus capacidades de cooperación si no por presentar una amenaza más que importante por sí solos. Tienen recursos para mantenerse con vida o rebajar la amenaza de sus contendientes.',
    lore: 'Los luchadores viven para el combate. Cada cicatriz es una lección aprendida, cada victoria una prueba de su valía. No necesitan magia ni artimañas — sus puños, su acero y su voluntad inquebrantable son todo lo que necesitan para dominar cualquier campo de batalla.',
    icon: '⚔️',
    color: '#f87171',
    subclasses: [
      {
        id: 'guerrero',
        name: 'Guerrero',
        weapons: 'Mandoble (2 manos)',
        weaponType: '2-manos',
        description: 'El Guerrero es fuerza frontal y autosuficiencia. Avanza, empuja y rompe defensas con contundencia física, castigando errores y dominando el espacio cuerpo a cuerpo sin depender de nadie.',
        icon: '🗡️',
        abilities: {
          hap1: 'Tajo en Cono: Realizas un tajo amplio que puede impactar a los 3 enemigos más cercanos.',
          hap2: 'Carga Brutal: Te mueves tu rango completo empujando enemigos, infligiendo 1d4 de daño y “Derribado”.',
          hap3: 'Golpe Rompeescudos: Golpeas con el mango del mandoble, duplicando el daño al escudo y aplicando “Frágil”.',
          hap4: 'Finta Letal (Reacción): Si un enemigo falla un ataque cuerpo a cuerpo, puedes atacarlo y colocarte a su espalda con ventaja.',
          had: 'Multiataque: Realizas tantos golpes al objetivo como PE hayas gastado.'
        }
      },
      {
        id: 'artista-marcial',
        name: 'Artista Marcial',
        weapons: 'Nudilleras (2 manos)',
        weaponType: '2-manos',
        description: 'El Artista Marcial alterna entre combate técnico y explosiones de movilidad mediante el uso de Postura e Impulso, castigando cualquier error del enemigo y encadenando estados alterados con precisión.',
        icon: '👊',
        abilities: {
          hap1: 'Gancho Ascendente / Golpes Ralentizantes: Mientras estás en “Postura”, realizas un devastador gancho ascendente al objetivo, lo que provoca que si le infliges daño, le aplicas “Levantado”. Si no estás en “Postura”, realizas dos golpes que “Ralentizan” al rival al infligirle daño.',
          hap2: 'Salto Giratorio / Patada Baja: Mientras estés en “Postura”, saltas en el aire golpeando a todos los enemigos alrededor tuya. Si no estás en “Postura”, atacas con una patada baja a un objetivo. Si este sufre algún tipo de estado alterado y le infliges daño, le aplicas “Derribado”, entras en “Postura” y ganas “Impulso”.',
          hap3: 'Desplazamiento Instantáneo / Carga Violenta: Mientras estés en “Postura”, te teleportas a cualquier parte a melé de un objetivo a rango de movimiento y lo golpeas. Le aplicas “Desplazado” si le infliges daño. Si no estás en “Postura”, realizas una violenta carga hacia un objetivo a la mitad de tu rango de movimiento y lo golpeas aplicándole “Aturdido” si le infliges daño, entras en “Postura” y ganas “Impulso”.',
          hap4: 'Golpe Interceptador (Reacción): Un enemigo intenta desplazarse fuera de tu rango de ataque estando a rango de ataque. Le descargas un golpe súbito que, en caso de hacer daño, no hace daño pero termina instantáneamente la acción que estaba llevando el objetivo, no se desplaza, entras en “Postura” y ganas “Impulso”.',
          had: 'Descarga de Energía: Debes estar en “Postura” para usar esta habilidad. Te concentras reuniendo toda la energía alrededor tuya y concentrándola en una pequeña bola de energía titilante. Instantes después descargas todo el torrente hacia una dirección. La descarga de energía impacta a todo lo que se encuentre en una línea recta hacia esa dirección hasta dos veces tu rango de movimiento. Todos los objetivos impactados sufren 3d6 de daño acertándoles directamente. Sales de “Postura” y recibes “Ralentizado”.'
        }
      }
    ]
  },
  {
    id: 'protector',
    name: 'Protector',
    role: 'Tanque / Soporte defensivo',
    type: 'martial',
    resource: 'Energía',
    resourceIcon: '⚡',
    shieldBase: 3,
    passiveName: 'Entereza',
    passive: 'Sumas tu Mod. Carisma a tu Fortaleza y Voluntad.',
    masteryPassiveName: 'Guardián Inquebrantable',
    masteryPassive: 'Tu presencia protege a tus aliados. Todos los aliados dentro de tu rango de movimiento obtienen +2 a CA y puedes usar tu reacción para otorgar "Égida" a un aliado que vaya a recibir daño.',
    hb1: 'Juicio: Intentas detectar alguna fuente de maldad, como una criatura malvada o un conjuro con fines oscuros.',
    hb2: 'Enaltecer: Exaltas a quienes te rodean armándolos de coraje durante 2 turnos.',
    description: 'Resistentes y contundentes. Estos increíbles aliados cuentan con excelentes formas de mantener al equipo a salvo de los enemigos ya sea con sus escudos o con su propio cuerpo. En cualquier caso, cuando se acerque un ataque masivo a tu grupo, los Protectores son tus mejores compañeros.',
    lore: 'Los protectores son el escudo del mundo. Juran defender a los inocentes y a sus compañeros con su propia vida si es necesario. Su entrenamiento les ha convertido en fortalezas vivientes, capaces de resistir avalanchas de golpes sin ceder un paso. Donde hay un protector, hay esperanza.',
    icon: '🛡️',
    color: '#f7fa60ff',
    subclasses: [
      {
        id: 'paladin',
        name: 'Paladín',
        weapons: 'Martillo + Escudo (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Paladín es un defensor sagrado que protege aliados, provoca enemigos y canaliza justicia divina. Controla la agresión rival y transforma la fe en resistencia y castigo equilibrado.',
        icon: '🔨',
        abilities: {
          hap1: 'Carga Justiciera: Te desplazas la mitad de tu movimiento y realizas un ataque al final del movimiento que causa “Aturdimiento” si impacta.',
          hap2: 'Acusación: Declaras a un enemigo y le acusas. Debe realizar una tirada de salvación de Voluntad contra una tirada tuya de Liderazgo. Si supera, obtiene un penalizador equivalente a tu Mod. Carisma a las tiradas de ataque contra cualquier objetivo que no seas tu hasta el comienzo de tu turno. Si no supera, queda “Provocado 2” contra ti.',
          has1: 'Escudo Bendito: Imbuyes de luz bendita tu escudo provocando 1d6 de daño sagrado si recibes un ataque hasta el comienzo de tu siguiente turno.',
          has2: 'Protección (Reacción): Si un aliado va a recibir un impacto y se encuentra a menos de la mitad de tu movimiento, te desplazas hacia el y recibes el impacto en su lugar.',
          had: 'Castigo Divino: Realizas un ataque descargando toda la justicia divina sobre un objetivo. Realizas un ataque al que sumas tu Mod. Carisma a la tirada de ataque y, si impactas, tiras un dado extra equivalente a tu dado de daño que inflige daño sagrado en un área pequeña al objetivo y a los enemigos de alrededor.'
        }
      },
      {
        id: 'cruzado',
        name: 'Cruzado',
        weapons: 'Mandoble (2 manos)',
        weaponType: '2-manos',
        description: 'El Cruzado es un baluarte que sacrifica su propia defensa para potenciar al grupo. Se convierte en estandarte viviente, fortaleciendo aliados mientras asume el peso del combate sagrado.',
        icon: '✝️',
        abilities: {
          hap1: 'Transferencia de Égida: Cedes todo tu 🛡️ a un aliado hasta el comienzo de tu siguiente turno. Después, vuelve el 🛡️ restante junto con todo el 🛡️ que tuviera al comienzo de dicho turno, aunque fuese temporal y se convierte en 🛡️ perduradero.',
          hap2: 'Asalto Justiciero: Realizas un llamamiento castigador en el campo de batalla, haciendo que caiga una lanza con bandera blanca en el campo de batalla. Tu Mod. Carisma se suma a las tiradas de ataque tuyas y de cualquier aliado hasta el final del siguiente turno.',
          hap3: 'Golpe Contundente: Golpeas con contundencia al enemigo y le aplicas “Derribado” si le infliges daño.',
          hap4: 'Mediación (Reacción): Si un enemigo va a infligirte daño, obtienes “Égida”.',
          had: 'Ascensión: Asciendes a los cielos desplegando unas alas y un halo. Ganas la habilidad “Volar” libremente, tu halo ilumina tus alrededores y disipa la oscuridad mágica y tus ataques infligen 1d6 de daño sagrado extra. Este efecto dura 3 turnos.'
        }
      }
    ]
  },
  {
    id: 'artillero',
    name: 'Artillero',
    role: 'Control / Táctico',
    type: 'martial',
    resource: 'Energía',
    resourceIcon: '⚡',
    shieldBase: 2,
    passiveName: 'Clank',
    passive: 'Llevas siempre contigo un robot ayudante que puede levitar a la altura de tu cabeza.',
    masteryPassiveName: 'Genio Tecnológico',
    masteryPassive: 'Tus creaciones alcanzan la perfección. Tus torretas y construcciones tienen el doble de vida y duran hasta que sean destruidas. Además, puedes tener hasta 3 torretas activas simultáneamente.',
    hb1: 'Holograma: Puedes hacer que tu robot proyecte una imagen.',
    hb2: 'Sistemizar: Puedes programar a tu ayudante para que realice hasta 2 acciones sencillas. ',
    description: 'Los Artilleros son unos increíbles visionarios que construyen maravillas futurísticas avanzadas a su tiempo. Podría decirse que un Artillero lo suficientemente ingenioso solo trabaja un tercio de su vida… Si ha hecho bien su trabajo.',
    lore: 'Los artilleros son los inventores del campo de batalla. Donde otros ven chatarra, ellos ven potencial. Sus mentes brillantes diseñan dispositivos capaces de cambiar el curso de cualquier enfrentamiento, desde torretas automáticas hasta trampas explosivas. Un artillero bien preparado es más peligroso que un ejército.',
    icon: '🔧',
    color: '#fb923c',
    subclasses: [
      {
        id: 'ingeniero',
        name: 'Ingeniero',
        weapons: 'Rifle (2 manos)',
        weaponType: '2-manos',
        description: 'El Ingeniero es control tecnológico y automatización táctica. Despliega torretas, campos y maquinaria que alteran el terreno, creando zonas peligrosas y presión constante.',
        icon: '🔫',
        abilities: {
          hap1: 'Torreta Automática: Despliegas una torreta automática estática con ❤️, 1d6 dado de daño y 10 CA. Esta atacará 2 veces al enemigo más cercano dentro de tu rango de movimiento alrededor suya en su turno. La torreta se desmontará al finalizar el combate.',
          hap2: 'Campo Repulsor: Despliegas un campo que dura 2 turnos cuyo rango es la mitad de tu movimiento. Dicho campo provocará una tirada de salvación CD 10(contra Agilidad) a cualquier enemigo que entre dentro de su rango. Si no superan los “Empujará” fuera. Si superan serán “Ralentizados” hasta que salgan de su rango.',
          hap3: 'Disparo Sobrecargado: Sobrecargas tu rifle, realizando un disparo con “Penetración” que provocará “Aturdimiento” a los enemigos que inflijas daño. ',
          hap4: 'Evasión Asistida (Reacción): Si algún enemigo intenta atacarte y falla, puedes hacer que tu robot ayudante te desplace la mitad de tu movimiento. Este movimiento tiene “Volar”.',
          had: 'Protocolo de Sobrecarga Total: Despliegas un campo energizado que duplica la vida, duración y ataques que realizan tus torretas y campos. También generas una torreta cañón afectado por tu campo con ❤️❤️, 1d10 de daño y 14 CA. Este cañón atacará 1 vez al enemigo con más vida. Los ataques del cañón tienen “Explosivo”.'
        }
      },
      {
        id: 'maquinista',
        name: 'Maquinista',
        weapons: 'Pistola + Daga (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Maquinista combate junto a su robot táctico personal. Alterna entre asistencia directa y destrucción masiva, sacrificando recursos mecánicos para obtener picos de poder explosivo.',
        icon: '⚙️',
        abilities: {
          hap1: 'Robot de Combate: Conviertes a tu alegre acompañante en un robot mecanizado de combate táctico con ❤️❤️❤️, 1d10 y 10 CA listo para ser dirigido desde el interior o mediante órdenes. El robot tiene “Estructura”.',
          hap2: 'Perímetro de Seguridad: Establece un perímetro de seguridad con un sensor que provoca 1d4 de daño si un enemigo entra dentro de el. Tu robot realiza un ataque gratis a dicho enemigo si está dentro del perímetro y al menos a la mitad de su rango de movimiento.',
          has1: 'Sobrecarga del Núcleo: Sobrecargas a tu robot, sacrificando ❤️ suyo para que inflija 1d10 extra hasta el final del siguiente turno.',
          has2: 'Acceso al Robot (Reacción): Si tu robot está a la mitad de tu rango de movimiento y realiza una acción, puedes entrar en el.',
          had: 'Botón?? Rojo?!?!?: Presionas el botón rojo, poniendo un contador de 1 turno en tu robot y provocando que este explote al comienzo de tu próximo turno infligiendo 2d20 que alcanza todo tu rango de movimiento a su alrededor y que no puede fallar, pero dicho daño también es infligido a ti y a tus aliados si os alcanza.'
        }
      }
    ]
  },
  // ===== MAGIC CLASSES =====
  {
    id: 'controlador',
    name: 'Controlador',
    role: 'DPS mágico / Control',
    type: 'magic',
    resource: 'Maná',
    resourceIcon: '💧',
    shieldBase: 1,
    passiveName: 'Canalización Arcana',
    passive: 'Cuando realices un hechizo, tiras un d20 y si sacas 11 o más no gastas PM.',
    masteryPassiveName: 'Maestro Arcano',
    masteryPassive: 'Tu conocimiento de la magia es supremo. Cuando lanzas un hechizo, puedes elegir un número de aliados igual a tu Mod. Inteligencia que no serán afectados por efectos de área. Además, tus hechizos ignoran resistencias mágicas.',
    hb1: 'Lengua universal: Puedes leer cualquier tipo de texto pero no sabrás si es correcto o no la información que consigas.',
    hb2: 'Conocimiento Arcano: Puedes detectar el encantamiento que tiene un objeto o el hechizo que describe un pergamino.',
    description: 'Constantes y meticulosos. Los Controladores son ingeniosos a la hora de realizar constantes cantidades de daño en el tiempo prolongado. Sus objetivos favoritos son tipos grandes con enormes cantidades de vida.',
    lore: 'Los controladores son los arquitectos de la destrucción arcana. Años de estudio les han otorgado un dominio sobre las fuerzas mágicas que pocos pueden igualar. Cada hechizo es una obra de arte letal, cada encantamiento una sentencia. El campo de batalla es su lienzo, y la magia, su pincel.',
    icon: '🔥',
    color: '#71d2f8ff',
    subclasses: [
      {
        id: 'mago',
        name: 'Mago',
        weapons: 'Bastón (2 manos)',
        weaponType: '2-manos',
        description: 'El Mago es poder arcano directo y control absoluto. Inflige daño inevitable, encierra enemigos y manipula el espacio del combate con hechizos devastadores que obligan a sus rivales a jugar bajo sus reglas.',
        icon: '☄️',
        abilities: {
          hap1: 'Proyectiles Mágicos: Lanzas 1d4 proyectiles mágicos que impactan automáticamente y que infligen cada uno 1d4 de daño mágico.',
          hap2: 'Mano Mágica: Invocas una mano mágica que puede ser “Comandada” y que cuenta con 🟢🟢 para si mismo. Tiene 10 CA y si sufre cualquier cantidad de daño se desconvoca.',
          hap3: 'Prisión de Hielo: Intentas encerrar a un objetivo en una cúpula de hielo, el objetivo debe hacer una tirada de salvación de fortaleza contra (CD 10 + Conocimiento). Si falla queda atrapado, no puede recibir daño y le provoca “Parálisis” por 2 turnos.',
          hap4: 'Reflejo Mental (Reacción): Si fueras a ser objetivo de un hechizo enemigo, puedes intentar forzar al objetivo a realizar una salvación de voluntad contra (CD 10 + Conocimiento). Si falla le provocas “Confusión” hasta el final de su turno.',
          had: 'Bola de Fuego: Conjuras una bola de fuego a un objetivo o a un lugar, todos los que se encuentran cerca del impacto del hechizo hacen una tirada de salvación de Agilidad contra (CD 10 + Conocimiento). Si consiguen salvarse, reciben 1d4 + 1d4 de daño de fuego por cada 💧 gastado a todos los que se encuentran cerca del impacto del hechizo, si no el hechizo inflige 1d8 + 1d8 de daño de fuego por cada 💧 gastado en su lugar.'
        }
      },
      {
        id: 'arcanista',
        name: 'Arcanista',
        weapons: 'Tomo + Maza (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Arcanista es un estratega del terreno. A través de sellos mágicos permanentes, transforma el campo de batalla en una trampa viva que daña, silencia y reubica el flujo del combate a su favor.',
        icon: '📖',
        abilities: {
          hap1: 'Sello de Rayos: Envuelves al objetivo en un sello de rayos que inflige 1d6 de daño de Elemento Rayo al comienzo del turno del objetivo a cualquier criatura hostil que acabe a melee de dicho objetivo hasta el final del combate.',
          hap2: 'Sello de Hielo: Creas un sello en el suelo que se activa al ser pisado. Este emite una explosión que inflige 1d6 de daño de Elemento Hielo y provoca “Mudez” a todos los objetivos hostiles a melé del sello al ser activado.',
          has1: 'Barrera Rúnica: Generas un sello a tus pies que detona al instante y crea una barrera  mágica al rededor que inflige 1d6 de daño a toda criatura hostil que lo cruce. La barrera dura hasta el final del combate.',
          has2: 'Reubicación de Sello (Reacción): Si un sello derrota a un enemigo, puedes reubicarlo en la posición u objetivo deseado.',
          had: 'Agujero Oscuro: Inscribes un sello en el aire y este se dirige al lugar objetivo dentro de tu rango de movimiento. Al entrar en contacto con el lugar deseado, se genera un agujero oscuro que absorbe a todos los enemigos dentro de la mitad de tu rango de movimiento alrededor del lugar de contacto y los desplaza a su centro infligiendo 1d10 de daño a todos los enemigos afectados.'
        }
      }
    ]
  },
  {
    id: 'invocador',
    name: 'Invocador',
    role: 'Invocaciones / Versatilidad',
    type: 'magic',
    resource: 'Maná',
    resourceIcon: '💧',
    shieldBase: 2,
    passiveName: 'Vínculo Natural',
    passive: 'Puedes hablar fluidamente con plantas y animales.',
    masteryPassiveName: 'Habla Silvana',
    masteryPassive: 'Tu conexión con la naturaleza alcanza su cénit. Tus invocaciones obtienen +2 a todas sus estadísticas y puedes tener hasta 2 invocaciones activas simultáneamente. Además, puedes compartir sentidos con tus invocaciones.',
    hb1: 'Fogata de Clarividencia: Puedes llevar a cabo un ritual para cambiar la climatología.',
    hb2: 'Fertilización: Haces que una o muchas plantas que te rodean crezcan mucho más rápido. ',
    description: 'Equilibrados y variados. Los Invocadores son famosos por sus poderosos aliados. Invocaciones con inmensas y diversas capacidades para ayudar al grupo ya sea aportando daño, apoyo al equipo o simple supervivencia.',
    lore: 'Los invocadores han forjado pactos con las criaturas del más allá. Su poder no reside en la destrucción directa, sino en la capacidad de llamar aliados de otros planos para que luchen a su lado. Cada invocación es un vínculo de confianza mutua entre el invocador y la criatura, una simbiosis que trasciende los límites del mundo material.',
    icon: '🐉',
    color: '#63de4aff',
    subclasses: [
      {
        id: 'druida',
        name: 'Druida',
        weapons: 'Lanza (2 manos)',
        weaponType: '2-manos',
        description: 'El Druida domina la naturaleza y la transformación. Invoca aliados animales, altera el terreno y modifica su propio cuerpo para adaptarse a cada situación del combate.',
        icon: '🌳',
        abilities: {
          hap1: 'Compañero Oso: Invocas un oso como compañero animal con ❤️❤️, 1d6 dado de daño y 11 CA. Puedes “Comandar” a esta criatura y siempre aceptará. El oso se irá al finalizar el combate. El oso obtiene “Armonía”.',
          hap2: 'Muralla de Zarzas: Creas una muralla delante tuya con ❤️. Dicha muralla mide la mitad de tu movimiento y solo puede crecer a la mitad de tu movimiento de distancia.',
          hap3: 'Salto Bestial: Transmutas tus piernas a las de un conejo enorme. Das un brinco saltando 3 veces tu altura y pudiendo moverte tu movimiento completo y en la zona de aterrizaje puedes intentar un ataque en caída con tu dado de ataque al objetivo junto con 1d4 de dado de daño alrededor.',
          hap4: 'Vínculo Protector (Reacción): Si tu compañero animal va a sufrir un ataque y estás a rango de ataque, realizas un ataque antes de que tu compañero sufra dicho ataque. Si vas a sufrir un ataque y tu compañero animal está a rango de ataque, realiza un ataque antes de que tu sufras dicho ataque. Solo uno de los dos puede atacar.',
          had: 'Sobrecrecimiento: Realizas un cántico gutural que provoca vibraciones en el suelo y hace al objetivo crecer hasta 3 veces su tamaño original, duplicando su vida máxima y aumentando en 2 su dado de ataque hasta el final del turno. El objetivo obtiene “Armonía”.'
        }
      },
      {
        id: 'monje',
        name: 'Monje',
        weapons: 'Nudilleras (2 manos)',
        weaponType: '2-manos',
        description: 'El Monje canaliza energía vital a través de distintas posturas. Se adapta constantemente, alternando defensa, movilidad y explosión ofensiva según la necesidad del momento.',
        icon: '☯️',
        abilities: {
          hap1: 'Posturas Salvajes: - Adoptas una de las 4 posturas Salvajes:\nPostura del Oso. Ganas 🛡️ al comienzo de tu turno y dura hasta el comienzo de tu turno.\nPostura del Tigre. Tu CA aumenta en 2.\nPostura del Dragón. Añade 2 a tus tiradas de daño.\nPostura del Cisne. Tu rango de movimiento aumenta en 15.',
          hap2: 'Movimiento Exhaustivo: Sobrepasas los límites físicos del cuerpo realizando un sorprendente despliegue de movimiento que acaba en un ligero golpe. Te mueves hasta el doble de tu rango de movimiento y realizas un golpe que no hace daño pero provoca “Debilidad”.',
          hap3: 'Descarga Vital: Descargas toda la energía vital en un oponente infligiéndole 1d10 de daño a el y 1d4 de daño alrededor suya a todos los enemigos dentro de la mitad de tu movimiento.',
          hap4: 'Cambio de Postura (Reacción): Si llevas a cabo de forma exitosa una habilidad, puedes cambiar de postura. Obtienes “Kiai”.',
          had: 'Postura del Rey Mono: Adoptas la postura del Rey Mono y ganas todos los beneficios de todas las posturas durante 3 turnos. Además, realizas un dado de daño extra cuando atacas. Obtienes “Kiai”.'
        }
      }
    ]
  },
  {
    id: 'velador',
    name: 'Velador',
    role: 'Protección / Gestión de escudos',
    type: 'magic',
    resource: 'Maná',
    resourceIcon: '💧',
    shieldBase: 3,
    passiveName: 'Plegaria',
    passive: '1 vez al día, al comienzo de este, tira 1d10. Puedes sumar dicho dado a cualquier tirada hasta el comienzo del próximo día.',
    masteryPassiveName: 'Gracia Divina',
    masteryPassive: 'Tu conexión con lo divino es absoluta. Una vez por combate, cuando un aliado (incluido tú) caería a 0 de vida, automáticamente recupera la mitad de su vida máxima. Además, tus curaciones siempre curan el máximo posible.',
    hb1: 'Inquirir: Puedes detectar las creencias de un objetivo así como sus motivaciones y preocupaciones.',
    hb2: 'Zona de Paz: Creas un espacio santificado alrededor tuya durante un minuto en el que las criaturas se apaciguan y pierden las ganas de combatir.',
    description: 'Vitales y persistentes. Cuando todas las medidas de seguridad fallen y tu equipo esté a las puertas de la muerte, allí estarán estos excelentes aliados listos para daros una segunda oportunidad, o las que hagan falta.',
    lore: 'Los veladores son la luz en la oscuridad, la esperanza cuando todo parece perdido. Su magia no destruye, sino que restaura y protege. Cada curación es un acto de fe, cada barrera un juramento de protección. Un grupo sin velador camina hacia la muerte; con uno, camina hacia la victoria.',
    icon: '💚',
    color: '#4adeadff',
    subclasses: [
      {
        id: 'clerigo',
        name: 'Clérigo',
        weapons: 'Sable + Tomo (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Clérigo es sostén y salvación del grupo. Protege, bendice y convierte la energía divina en escudos y supervivencia, garantizando que sus aliados resistan incluso en el peor momento.',
        icon: '📿',
        abilities: {
          hap1: 'Canalización: Canalizas una ayuda divina en área al rededor tuya que otorga 🛡️🛡️ a todos tus aliados dentro de tu rango de movimiento hasta el final de tu siguiente turno.',
          hap2: 'Bendición: Bendices a un aliado dentro de tu rango de movimiento con poder divino y le otorgas 🛡️🛡️ hasta el final del combate.',
          has1: 'Rayo Celestial: Conjuras todo el poder celestial en un chorro de luz sagrada pura hacia delante hasta la mitad de tu rango de movimiento que inflige 1d6 de daño a todos los enemigos y otorga 🛡️ a los aliados acertados hasta el final de tu siguiente turno.',
          has2: 'Favor Cegador (Reacción): Si un aliado dentro de tu rango de movimiento sufre un ataque y el atacante falla, puedes realizar una plegaria que provoca “Cegar” al enemigo hasta tu siguiente turno.',
          had: 'Intervención: Oras a los cielos rogando una salvación y haces a ti y a todos tus aliados dentro de tu rango de movimiento otorgando “Invulnerable” hasta el comienzo de tu siguiente turno. Además, al comienzo de tu siguiente turno ganas 🛡️ equivalente a los puntos de 💧 gastados por esta habilidad hasta el comienzo del siguiente turno.'
        }
      },
      {
        id: 'oraculo',
        name: 'Oráculo',
        weapons: 'Lanza (2 manos)',
        weaponType: '2-manos',
        description: 'El Oráculo es un combatiente místico que manipula el equilibrio entre vida, escudo y sacrificio. Su poder nace del intercambio constante: cuanto más arriesga, más protege o destruye.',
        icon: '👁️',
        abilities: {
          hap1: 'Haz Corrosivo Redentor: Lanzas un corrosivo haz de luz a un enemigo que inflige 1d8 de daño si aciertas. Todo el daño infligido se otorga a ti y a los aliados en forma de 🛡️ hasta el final de tu siguiente turno.',
          hap2: 'Sacrificio Deflagrante: Sacrifica 🛡️ para infligir 1d6 alrededor tuya a todos los enemigos.',
          hap3: 'Ofrenda: Sacrifica ❤️ para ganar 🛡️🛡️ hasta el final de tu siguiente turno.',
          hap4: 'Intercambio Profético (Reacción): Si un aliado dentro de tu rango de movimiento fuera a recibir daño, puedes sacrificar 🛡️ para anular la misma cantidad de daño que fuera a sufrir. El aliado queda “Vigorizado”.',
          had: 'Juicio del Sacrificio: Sacrificas todo tu 🛡️ restante e infliges esa misma cantidad de daño a todos los enemigos dentro de tu rango de movimiento. Esta habilidad no se puede fallar. '
        }
      }
    ]
  },
  {
    id: 'exaltador',
    name: 'Exaltador',
    role: 'Buff / Soporte ofensivo',
    type: 'magic',
    resource: 'Maná',
    resourceIcon: '💧',
    shieldBase: 1,
    passiveName: 'Maquillar',
    passive: 'Tus aliados pueden sumar un 1d4 a sus tiradas sociales siempre que estén dentro de tu rango de movimiento.',
    masteryPassiveName: 'Inspiración Suprema',
    masteryPassive: 'Tu presencia eleva a tus aliados a nuevas alturas. Todos los aliados dentro de tu rango de movimiento pueden volver a tirar un dado fallido una vez por turno y obtienen ventaja en salvaciones contra efectos mentales.',
    hb1: 'Tocar Fibra: Puedes empezar a entonar una melodía que potenciara una emoción en concreto a los que estén dentro de la mitad de tu rango de movimiento.',
    hb2: 'Fiesta de Disfraces: Te adaptas al entorno disfrazándote y pasando desapercibido por 1 hora.',
    description: 'Peligrosos e inspiradores. Aunque los Exaltadores pueden llegar a provocar algunos resultados no deseados, suelen ser grandes fuentes de apoyo para el equipo. Si bien no siempre controlan todo su potencial, pueden ser la diferencia entre la vida y la muerte de la forma más literal posible.',
    lore: 'Los exaltadores son los catalizadores de la grandeza. Su magia no destruye ni cura directamente, sino que desbloquea el potencial oculto en los demás. Con una canción, un gesto o una palabra de poder, pueden convertir a un soldado mediocre en un campeón invencible. Son los héroes detrás de los héroes.',
    icon: '🎵',
    color: '#f04092ff',
    subclasses: [
      {
        id: 'bardo',
        name: 'Bardo',
        weapons: 'Flautaespada + Rodela (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Bardo es ritmo y sinergia. Potencia a sus aliados mediante música, acelera el flujo del combate y convierte la coordinación del grupo en su mayor arma.',
        icon: '🎶',
        abilities: {
          hap1: 'Melodía de Celeridad: Entonas una melodía armoniosa que exalta a tus aliados  y a ti dentro de tu rango de movimiento confiriéndoles “Acelerado” hasta el final de tu siguiente turno.',
          hap2: 'Ritmo de Batalla: Marcas el ritmo de la batalla a tus aliados y a ti dentro de la mitad de tu rango de movimiento haciendo que aumente su nivel de dado de daño en 1 hasta el final de tu siguiente turno.',
          has1: 'Escudo Encantado: Conviertes tu pequeño escudo en un arma encantada que se enlaza al objetivo dentro de tu rango de movimiento confiriéndole un 1d4 extra de daño cada vez que intente un ataque hasta el final de tu turno.',
          has2: 'Improvisación (Reacción): Si sufres un ataque y lo esquivas, puedes realizar una habilidad distinta a esta y a la definitiva gratis.',
          had: 'Himno de Determinación: Infundes de determinación los corazones de tus aliados y el tuyo, obteniendo “Acelerado” hasta el final de vuestros siguientes respectivos turnos. Si estabais sufriendo alguna condición perjudicial, cesa inmediatamente.'
        }
      },
      {
        id: 'cartomante',
        name: 'Cartomante',
        weapons: 'Bastón + Guante Arcano (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Cartomante manipula el azar y los estados mediante cartas arcanas. Transforma la incertidumbre en ventaja y convierte condiciones negativas en oportunidades estratégicas.',
        icon: '🃏',
        abilities: {
          hap1: 'Robo de Cartas: - Robas 3 cartas de tu mazo. El efecto de las cartas se mantiene hasta el final del combate.\n(El mazo está compuesto de 10 cartas. 2 Azules, 2 Rojas, 2 Verdes y 4 Amarillas:\nLas Amarillas no hacen nada.\nLas Verdes suman +1 objetivo.\nLas Azules aumentan +1 turno fase el efecto.\nLas rojas restan -1 y reducen -1 turno el efecto.)',
          hap2: 'El Juez: Invoca el poder del Juez confiriendo a 1 aliado dentro de tu rango de movimiento “Coraje” hasta el final de su próximo turno.',
          has1: 'La Templanza: Invoca el poder de la Templanza convirtiendo 1 efecto perjudicial en beneficioso hasta el final del siguiente turno.',
          has2: 'El Necio (Reacción): Si un aliado dentro de tu rango de movimiento recibe un estado perjudicial, puedes Invocar el poder del Necio, descartar una carta a elección y robar una carta.',
          had: 'La Emperatriz: Invocas el poder de la Emperatriz convirtiendo cualquier estado perjudicial de todos los aliados dentro de tu rango de movimiento en beneficioso y aumentando el tiempo que dura dicho efecto en 1 turno.'
        }
      }
    ]
  },
  {
    id: 'mistico',
    name: 'Místico',
    role: 'Debuff / Control',
    type: 'magic',
    resource: 'Maná',
    resourceIcon: '💧',
    shieldBase: 1,
    passiveName: 'Comunión con la muerte',
    passive: 'Puedes hablar con no-muertos y cadáveres recientes.',
    masteryPassiveName: 'Señor de las Sombras',
    masteryPassive: 'Dominas las artes oscuras completamente. Tus hechizos que infligen estados perjudiciales tienen CD +2 y duran 1 turno adicional. Además, eres inmune a "Miedo", "Confusión" y "Parálisis".',
    hb1: 'Eco Fantasmal: Puedes generar un sonido fantasmal con la voz de alguien que conozcas o conociste dentro de tu rango de movimiento. El sonido se disipa al minuto.',
    hb2: 'Forma Sombría: Pierdes la corporeidad volviéndote una mera sombra que puede desplazarse por cualquier superficie. Vuelves a la normalidad cuando lo desees hasta un máximo de 10 minutos, después vuelves a ser tangible forzadamente.',
    description: 'Absolutos y manipuladores. Los Místicos prefieren destacar su potencial de formas abruptas. No existen términos medios con ellos, es todo o nada. Son la representación más viva del azar y pueden convertir algunos combates en simples trivialidades.',
    lore: 'Los místicos caminan por el filo entre la luz y la oscuridad, y han elegido abrazar las sombras. Su magia no es malvada per se, sino una herramienta que pocos se atreven a empuñar. Cada maldición, cada debuff, es un recordatorio de que el poder tiene muchas formas, y las más temidas son las que no puedes ver venir.',
    icon: '🌑',
    color: '#bb8bfaff',
    subclasses: [
      {
        id: 'brujo',
        name: 'Brujo',
        weapons: 'Espada Corta + Guante Arcano (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Brujo es interrupción y castigo oscuro. Paraliza, ralentiza y detiene al enemigo, dominando el tempo del combate mediante control severo y debilitamiento constante.',
        icon: '🖐️',
        abilities: {
          hap1: 'Espada Maldita: Calumnias tu espada provocando en tu siguiente ataque “Parálisis” al siguiente objetivo del ataque que aciertes.',
          hap2: 'Lanzamiento Impuro: Lanzas tu espada con un toque impuro a un objetivo dentro de tu rango de movimiento, provocándole “Aturdido” si aciertas hasta el final del combate.',
          has1: 'Quiebre Temporal: Quebrantas el tiempo “Ralentizando” a todos los enemigos dentro de tu rango de movimiento hasta el final de su siguiente turno.',
          has2: 'Interrupción Oscura (Reacción): Si un enemigo dentro de tu rango de movimiento fuera a conjurar un hechizo o a lanzar una habilidad, puedes lanzarle un chorro de energía oscura. Tiene que hacer una tirada de salvación de voluntad contra CD(10+Mod.Percepcion). Si supera lanza su hechizo con normalidad, si no, lo falla directamente.',
          had: 'Augurio Final: Auguras el final de tus rivales empoderando tu espada y descargando toda tu ira a través de su punta. Todos los enemigos dentro de tu rango de movimiento quedan “Inmóviles” y “Aturdidos”.'
        }
      },
      {
        id: 'aruspice',
        name: 'Arúspice',
        weapons: 'Hacha + Tomo (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Arúspice es un ritualista del sufrimiento. Convierte los estados perjudiciales en su mayor arma, propagándolos, explotándolos y amplificándolos, incluso a costa de su propio cuerpo.',
        icon: '💀',
        abilities: {
          hap1: 'Rito Oscuro: Aclamas un rito oscuro y te provocas “Debilidad” hasta el comienzo de tu siguiente turno. Si ya sufres un estado perjudicial, te aplicas también “Parálisis” hasta el comienzo de tu siguiente turno.',
          hap2: 'Aura del Terror: Provocas “Miedo” a todos los enemigo dentro de tu rango de movimiento que esté sufriendo un estado perjudicial hasta el final de tu siguiente turno. Si ya sufrían “Miedo”, les infliges 1d6 de daño.',
          has1: 'Propagación de la Aflicción: Realizas un llamamiento al mal que esparce todos tus estados perjudiciales o los de un enemigo alrededor a todos los enemigos hasta la mitad de tu rango de movimiento. ',
          has2: 'Extender el Sufrimiento (Reacción): Un enemigo con un estado perjudicial realiza a cabo una acción, aumentas la duración de todos los estados que sufre dicho enemigo en 1 turno.',
          had: 'Llamada de la Parca: Explotas las debilidades de todos los enemigos alrededor tuya que sufran un estado perjudicial dentro de tu rango de movimiento. Pierden todo su 🛡️ hasta el final de tu siguiente turno.'
        }
      }
    ]
  }
];
