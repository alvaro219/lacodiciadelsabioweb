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
    hb1: 'Rastrear: Buscas información sobre una cosa en concreto ya sea seguir la pista de algo o alguien o conseguir datos sobre algo y consigues 1 dato verdadero y 1 dato falso.',
    hb2: 'Distracción: Creas una distracción de forma sencilla que dura 2 turnos.',
    description: 'Expertos en iniciar o terminar combates. Estos combatientes están entrenados en ser precisos y contundentes, de forma que puedan realizar todo el daño posible antes de que sus enemigos se conviertan en un problema o en rematar los adversarios que se resisten a sucumbir.',
    lore: '',
    icon: '🏹',
    color: '#8f4adeff',
    subclasses: [
      {
        id: 'explorador',
        name: 'Explorador',
        weapons: 'Arco Corto (2 manos)',
        weaponType: '2-manos',
        description: 'El Explorador es un tirador estratégico que domina la distancia y el control del movimiento enemigo. Marca presas, castiga desplazamientos y convierte cada disparo en una amenaza calculada que condiciona el campo de batalla.',
        icon: '🎯',
        abilities: {
          hap1: 'Vigía (1/Combate): Preparas tu arco para disparar a cualquier enemigo que sea atacado hasta el comienzo de tu próximo turno.',
          hap2: 'Marca del Cazador: Apuntas a un enemigo específico, obteniendo ventaja en el próximo ataque contra él. Lo marca hasta el comienzo de tu próximo turno.',
          hap3: 'Flecha Envenenada: Disparas una flecha que provoca "Envenenamiento" si hiere.',
          hap4: 'Disparo de Oportunidad (Reacción): Si un enemigo marcado intenta moverse, realizas un ataque de oportunidad a distancia.',
          had: 'Flecha Perforadora Rebotante (1/Día): Disparas una flecha que rebota hasta 2 veces contra paredes u objetos, causando daño y atravesando a todos los enemigos en su línea de trayectoria.'
        }
      },
      {
        id: 'ladron',
        name: 'Ladrón',
        weapons: 'Daga + Ballesta de Mano (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Ladrón es movilidad pura y ejecución precisa. Ataca desde la sombra, manipula el ritmo del combate y multiplica su daño cuando encuentra el momento perfecto para golpear.',
        icon: '🗡️',
        abilities: {
          hap1: 'Paso Sombrío (1/Combate): Das un paso sombrío y te camuflas en el entorno obteniendo "Invisibilidad".',
          hap2: 'Asalto por la Espalda: Asaltas un objetivo por la espalda después de desplazarte 15 pies. Si infliges daño, este recibe "Derribado".',
          has1: 'Golpe Preparado: Te preparas tu siguiente acción. La siguiente vez que aciertes una acción ofensiva, realizas el doble de daño.',
          has2: 'Golpe Furtivo (Reacción): Si atacas a alguien mientras tienes "Invisibilidad", le aplicas "Desprevenido 2" y aciertas directamente.',
          had: 'Tajo del Vacío (1/Día): Te teleportas a un enemigo dentro de 60 pies. Realizas un tajo oscuro que atraviesa el escudo del objetivo, infligiendo 1d10 de daño y "Parálisis".'
        }
      },
      {
        id: 'duelista',
        name: 'Duelista',
        weapons: 'Espada Corta + Daga (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Duelista es control personal y castigo del duelo. Provoca a sus rivales, los acorrala con su guardia y contraataca con precisión quirúrgica, convirtiendo cada fallo enemigo en una oportunidad letal.',
        icon: '⚔️',
        abilities: {
          hap1: 'Tajo a Destiempo: Cargas hasta 15 pies con un tajo. Si el objetivo tiene "Provocado", aciertas automáticamente. Si no y le infliges daño, le aplicas "Provocado".',
          hap2: 'Guardia Alta: Preparas una defensa sólida. Quien te ataque o lance una habilidad tiene desventaja y queda "Derribado" si falla.',
          has1: 'Estudio de Combate (1/Combate): Te desplazas 10 pies estudiando al enemigo, obteniendo ventaja y +1 dado de daño en tu siguiente ataque.',
          has2: 'Riposte (Reacción): Si un enemigo con "Provocado" te ataca, realizas un ataque antes del suyo que acierta directamente.',
          had: 'Danza de Fintas (1/Día): Te desplazas hasta 10 pies y atacas. Si aciertas, puedes repetir la habilidad sin coste.'
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
    description: 'Solitarios y feroces. Los Luchadores son famosos no por sus capacidades de cooperación sino por presentar una amenaza más que importante por sí solos. Tienen recursos para mantenerse con vida o rebajar la amenaza de sus contendientes.',
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
          hap2: 'Carga Brutal: Te mueves tu rango completo empujando enemigos, infligiendo 1d4 de daño y "Derribado".',
          hap3: 'Golpe Rompeescudos: Golpeas con el mango del mandoble, duplicando el daño al escudo y aplicando "Frágil".',
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
          hap1: 'Gancho Ascendente / Golpes Ralentizantes: En "Postura": gancho que aplica "Levantado". Sin "Postura": dos golpes que "Ralentizan" al rival.',
          hap2: 'Salto Giratorio / Patada Baja: En "Postura": golpeas a todos los enemigos alrededor. Sin "Postura": patada baja que "Derriba" si el objetivo tiene algún estado y le infliges daño, entras en "Postura" y ganas "Impulso".',
          hap3: 'Desplazamiento Instantáneo / Carga Violenta: En "Postura": teleportación a melee y golpe. Sin "Postura": carga violenta que aplica "Aturdido", entras en "Postura" y ganas "Impulso".',
          hap4: 'Golpe Interceptador (Reacción): Un enemigo intenta salir de tu rango. Golpe súbito que, si hace daño, termina su acción, no se desplaza, entras en "Postura" y ganas "Impulso".',
          had: 'Descarga de Energía: Debes estar en "Postura". Concentras energía y la descargas en línea recta hasta dos veces tu rango de movimiento. 3d6 de daño a todo lo impactado. Sales de "Postura" y recibes "Ralentizado".'
        }
      },
      {
        id: 'barbaro',
        name: 'Bárbaro',
        weapons: 'Matadragones (2 manos)',
        weaponType: '2-manos',
        description: 'El Bárbaro es furia desatada y potencia bruta. Entra en Rabia para desbloquear ataques atronadores que cargan durante turnos, barren áreas enteras y sacuden el terreno, convirtiendo el campo de batalla en su patio de destrucción.',
        icon: '🪓',
        abilities: {
          hap1: 'Ira Descontrolada (1/Combate): ⚡⚡, 🟢. Una ira homicida recorre tus venas provocándote "Rabia" y "Coraje 2".',
          hap2: 'Azote Indómito: ⚡, 🟢🟢. Debes tener "Rabia". Levantas tu arma cargando un ataque atronador que se realiza al comienzo de tu próximo turno. Acierta automáticamente e inflige 1d20 + 1d12 por cada acción omitida al mantenerlo cargado (hasta 10d12 adicionales).',
          hap3: 'Barrido Atroz: ⚡⚡, 🟢🟢. Debes tener "Rabia". Tajo giratorio que impacta a todos los enemigos alrededor. Ganas 🛡️ por cada enemigo al que hieras.',
          hap4: 'Sin Escapatoria (Reacción): ⚡, 🔶. Un enemigo a 15 pies o menos te inflige daño. Te desplazas para quedar a melee de dicho enemigo por la trayectoria más cercana.',
          had: 'Atardecer Quebrantador (1/Día): 🚫⚡, 🟢🟢🟢. Debes tener "Rabia". Arremetes contra el suelo a hasta 15 pies, provocando 1d12 a los enemigos en área a 20 pies, aplicando "Derribado" a quienes reciban daño y convirtiendo el terreno en difícil.'
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
    description: 'Resistentes y contundentes. Estos increíbles aliados cuentan con excelentes formas de mantener al equipo a salvo de los enemigos ya sea con sus escudos o con su propio cuerpo.',
    lore: 'Los protectores son el escudo del mundo. Juran defender a los inocentes y a sus compañeros con su propia vida si es necesario. Su entrenamiento les ha convertido en fortalezas vivientes, capaces de resistir avalanchas de golpes sin ceder un paso.',
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
          hap1: 'Carga Justiciera: Te desplazas la mitad de tu movimiento y realizas un ataque al final que causa "Aturdimiento" si impacta.',
          hap2: 'Acusación: Declaras a un enemigo. Debe superar una salvación de Voluntad o queda "Provocado 2" contra ti.',
          has1: 'Escudo Bendito: Imbuyes tu escudo de luz bendita que provoca 1d6 de daño sagrado si recibes un ataque hasta tu siguiente turno.',
          has2: 'Protección (Reacción): Si un aliado a menos de la mitad de tu movimiento va a recibir un impacto, te desplazas y lo recibes tú.',
          had: 'Castigo Divino: Ataque descargando toda la justicia divina. Sumas Mod. Carisma al ataque y, si impactas, tiras un dado extra que inflige daño sagrado en área.'
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
          hap1: 'Transferencia de Égida: Cedes todo tu 🛡️ a un aliado hasta tu siguiente turno. Luego vuelve convertido en 🛡️ perduradero.',
          hap2: 'Asalto Justiciero: Cae una lanza con bandera blanca. Tu Mod. Carisma se suma a tiradas de ataque tuyas y de aliados hasta el final del siguiente turno.',
          hap3: 'Golpe Contundente: Golpeas al enemigo y le aplicas "Derribado" si infliges daño.',
          hap4: 'Mediación (Reacción): Si un enemigo va a infligirte daño, obtienes "Égida".',
          had: 'Ascensión: Despliegas alas y halo. Ganas "Volar", tu halo disipa oscuridad mágica y tus ataques infligen 1d6 de daño sagrado extra. Dura 3 turnos.'
        }
      },
      {
        id: 'penitente',
        name: 'Penitente',
        weapons: 'Lanza (2 manos)',
        weaponType: '2-manos',
        description: 'El Penitente es un mártir de combate que se inflige condiciones a sí mismo para potenciar al grupo. Absorbe el sufrimiento ajeno y lo convierte en castigo para los enemigos, transformando el dolor propio en escudo y sentencia.',
        icon: '✝️',
        abilities: {
          hap1: 'Penitencia: ⚡⚡⚡, 🟢. Sacrificas 🛡️🛡️ para obtener "Coraje 1" e infligir "Miedo 2" con tus ataques mientras tengas "Coraje".',
          hap2: 'Ascesis y Mortificación: ⚡⚡, 🟢. Sacrificas 🛡️ para infligirte "Mudez" y "Debilidad 3". No realizas tiradas de salvación contra "Mudez".',
          hap3: 'Confesión: ⚡⚡, 🟢🟢. Ganas 🛡️ por cada condición Restrictiva o Debilitante que sufras e infliges esas mismas condiciones a los enemigos a 10 pies de ti.',
          hap4: 'Absolución (Reacción): ⚡, 🔶. Si un aliado a 20 pies o menos va a sufrir una condición Restrictiva o Debilitante, sacrificas 🛡️ para absorberla y sufrirla en su lugar.',
          had: 'Ecumenismo del Mártir (1/Día): 🚫⚡, 🟢🟢🟢. Absorbes todas las condiciones no Potenciadoras de aliados a 20 pies, aplicas "Miedo 2" a todos los enemigos a 20 pies y les infliges 1d8 por cada condición absorbida.'
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
    hb2: 'Programar Robot: Puedes programar a tu ayudante para que realice hasta 2 acciones sencillas.',
    description: 'Los Artilleros son unos increíbles visionarios que construyen maravillas futurísticas avanzadas a su tiempo. Podría decirse que un Artillero lo suficientemente ingenioso solo trabaja un tercio de su vida… Si ha hecho bien su trabajo.',
    lore: 'Los artilleros son los inventores del campo de batalla. Donde otros ven chatarra, ellos ven potencial. Sus mentes brillantes diseñan dispositivos capaces de cambiar el curso de cualquier enfrentamiento.',
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
          hap1: 'Torreta Automática: Despliegas una torreta estática con ❤️, 1d6 de daño y 10 DA. Ataca 2 veces al enemigo más cercano dentro de 30 pies en su turno. Se desmonta al acabar el combate.',
          hap2: 'Campo Repulsor: Despliegas un campo de 15 pies durante 2 turnos. Enemigos que entren deben superar salvación de Agilidad CD10 o quedan "Inmóvil". Si superan, sufren "Ralentizado 1".',
          hap3: 'Disparo Sobrecargado: Sobrecargas el rifle realizando un disparo penetrante que provoca "Aturdido 2" a los enemigos que hieras.',
          hap4: 'Evasión Asistida (Reacción): Si un enemigo te ataca y falla, tu robot te desplaza 15 pies con condición "Volar".',
          had: 'Protocolo de Sobrecarga Total (1/Día): Campo energizado que duplica vida, duración y ataques de tus torretas. Genera además una torreta cañón (❤️❤️, 1d10, 14 DA) que ataca al enemigo con más vida con efecto explosivo.'
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
          hap1: 'Robot de Combate (1/Combate): Conviertes tu robot en un combatiente táctico con ❤️❤️❤️, 1d10 y 10 DA. Dirigible desde el interior o por órdenes. Inmune a "Envenenamiento" y "Derribado".',
          hap2: 'Perímetro de Seguridad: Sensor que provoca 1d4 si un enemigo entra. Tu robot ataca gratis a dicho enemigo si está a 15 pies dentro del perímetro.',
          has1: 'Sobrecarga del Núcleo: Sobrecargas tu robot, sacrificando ❤️ suyo para que inflija 1d10 extra hasta el final del siguiente turno.',
          has2: 'Acceso al Robot (Reacción): Si tu robot está a 15 pies y realiza una acción, puedes entrar en él.',
          had: 'Botón?? Rojo?!?!? (1/Día): Contador de 1 turno en tu robot. Explota al inicio de tu próximo turno infligiendo 2d20 a 30 pies, sin poder fallar, pero también te afecta a ti y aliados.'
        }
      },
      {
        id: 'operador',
        name: 'Operador',
        weapons: 'Ballesta de Mano + Maza (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Operador coordina un ejército de Robots Soldado que replican sus acciones. Cuantas más unidades mantiene en el campo, mayor es su presencia táctica y su potencial ofensivo.',
        icon: '🤖',
        abilities: {
          hap1: 'Robot Soldado: Invocas un Robot Soldado con ❤️, 11 DA y 1d4 de daño que replica tus movimientos y acciones en la casilla adyacente. Inmune a "Envenenamiento".',
          hap2: 'Orden de Ataque: Sobrecargas un Robot Soldado aumentando su daño a 1d6 y su DA a 12. Al final de tu turno, pierde ❤️.',
          has1: 'Entrelazamiento: Enlazas cada Robot Soldado a un objetivo a 20 pies. Cuando realizas una acción ofensiva, los robots la replican hacia dichos objetivos.',
          has2: 'Cortocircuito (Reacción): Si un Robot Soldado es derrotado, provoca que explote causando 1d6 a 5 pies.',
          had: 'Actualización de Software (1/Día): Tus Robots Soldado realizan todas sus acciones ofensivas dos veces hasta el fin del combate y ganan ❤️ extra.'
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
    hb1: 'Lectura Arcana: Puedes leer cualquier tipo de texto pero no sabrás si es correcta la información que consigas.',
    hb2: 'Detectar Magia: Puedes detectar el encantamiento que tiene un objeto o el hechizo que describe un pergamino.',
    description: 'Constantes y meticulosos. Los Controladores son ingeniosos a la hora de realizar constantes cantidades de daño en el tiempo prolongado. Sus objetivos favoritos son tipos grandes con enormes cantidades de vida.',
    lore: 'Los controladores son los arquitectos de la destrucción arcana. Años de estudio les han otorgado un dominio sobre las fuerzas mágicas que pocos pueden igualar. Cada hechizo es una obra de arte letal, cada encantamiento una sentencia.',
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
          hap1: 'Proyectiles Mágicos: Lanzas 1d4 proyectiles mágicos que impactan automáticamente, cada uno infligiendo 1d4 de daño mágico.',
          hap2: 'Mano Mágica (1/Combate): Invocas una mano mágica que puede ser comandada con 🟢🟢. Tiene 10 DA y se desconvoca si recibe cualquier daño.',
          hap3: 'Prisión de Hielo: El objetivo hace salvación de Fortaleza CD(10+Conocimiento). Si falla queda atrapado, no puede recibir daño y sufre "Parálisis".',
          hap4: 'Reflejo Mental (Reacción): Si fueras objetivo de un hechizo enemigo, fuerzas salvación de Voluntad CD(10+Conocimiento). Si falla, el enemigo sufre "Confusión 2".',
          had: 'Bola de Fuego (1/Día): Conjuras una bola de fuego. Salvación de Agilidad CD(10+Conocimiento): fallo → 1d8+1d8 de daño de fuego por 💧 gastado; éxito → 1d4+1d4 por 💧 gastado, a 15 pies del impacto.'
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
          hap1: 'Sello de Rayos: Envuelves al objetivo en un sello que inflige 1d6 de daño de Rayo al inicio de su turno a criaturas hostiles a melee de él hasta el final del combate.',
          hap2: 'Sello de Hielo (1/Combate): Creas un sello en el suelo que al ser pisado inflige 1d6 de daño de Hielo y provoca "Mudez" a los hostiles a melee.',
          has1: 'Barrera Rúnica: Sello a tus pies que detona y crea una barrera mágica que inflige 1d6 a toda criatura hostil que la cruce. Dura hasta el final del combate.',
          has2: 'Reubicación de Sello (Reacción): Si un sello derrota a un enemigo, puedes reubicarlo en la posición u objetivo deseado.',
          had: 'Agujero Oscuro (1/Día): Un sello se dirige al lugar objetivo dentro de tu rango. Al impactar genera un agujero oscuro que absorbe a todos los enemigos en la mitad de tu rango alrededor, infligiendo 1d10 a todos.'
        }
      },
      {
        id: 'astronomo',
        name: 'Astrónomo',
        weapons: 'Guante Arcano + Tomo (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Astrónomo invoca rocas orbitales que dañan pasivamente a los enemigos cercanos y puede ceder a sus aliados. Una red gravitacional de apoyo y presión constante que culmina en una supernova devastadora.',
        icon: '🌌',
        abilities: {
          hap1: 'Constelación Estelar (1/Combate): 💧💧, 🟢🟢. Te rodeas de 3 rocas que orbitan a tu alrededor, infligiendo 1d4 por roca a todos los enemigos a 20 pies al comienzo de tu turno. Este ataque no falla y las rocas permanecen hasta el final del combate.',
          hap2: 'Cambio de Órbita (1/Turno): 💧, 🟢. Debes tener al menos 1 roca orbitando. Cedes 1 roca a un aliado a 20 pies o menos; este aplica el mismo efecto orbitante alrededor suyo.',
          hap3: 'Cometa: 💧💧, 🟢. Al menos 1 aliado debe tener 1 roca orbitando. Regresas una roca violentamente a tu órbita, provocando 1d8 a todos los enemigos en el camino entre tú y ese aliado.',
          hap4: 'Atracción Gravitacional (Reacción): 💧, 🔶. Si un aliado provoca daño con su roca, puedes acercarte a él hasta estar a 20 pies de dicho aliado.',
          had: 'Super Nova (1/Día): 🚫💧, 🟢🟢🟢. Provocas una falla que desestabiliza todas las órbitas. Las rocas colisionan entre ellas infligiendo 1d8 cada una por cada 20 pies viajados desde el núcleo de sus órbitas hasta ti a todos los enemigos a 20 pies de ti.'
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
    hb2: 'Fertilización: Haces que una o muchas plantas que te rodean crezcan mucho más rápido.',
    description: 'Equilibrados y variados. Los Invocadores son famosos por sus poderosos aliados. Invocaciones con inmensas y diversas capacidades para ayudar al grupo ya sea aportando daño, apoyo al equipo o simple supervivencia.',
    lore: 'Los invocadores han forjado pactos con las criaturas del más allá. Su poder no reside en la destrucción directa, sino en la capacidad de llamar aliados de otros planos para que luchen a su lado.',
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
          hap1: 'Compañero Oso: Invocas un oso con ❤️❤️, 1d6 de daño y 11 DA que puedes comandar. Obtiene "Armonía". Se marcha al acabar el combate.',
          hap2: 'Muralla de Zarzas: Creas una muralla delante tuya con ❤️. Mide la mitad de tu movimiento y solo puede crecer a esa distancia.',
          hap3: 'Salto Bestial: Transmutas tus piernas en las de un conejo enorme. Saltas tu movimiento completo y al aterrizar puedes atacar con tu dado más 1d4 de daño en área.',
          hap4: 'Vínculo Protector (Reacción): Si tu compañero va a sufrir un ataque y estás a rango, atacas antes. Si tú vas a sufrir un ataque y él está a rango, ataca él. Solo uno puede reaccionar.',
          had: 'Sobrecrecimiento (1/Día): Cántico gutural que hace crecer al objetivo hasta 3 veces su tamaño, duplicando su vida y aumentando su dado de ataque en 2 hasta el final del turno. Obtiene "Armonía".'
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
          hap1: 'Posturas Salvajes (1/Combate): Adoptas una de las 4 posturas — Oso: 🛡️ al inicio de turno · Tigre: DA+2 · Dragón: +2 daño · Cisne: +15 pies de movimiento.',
          hap2: 'Movimiento Exhaustivo: Te mueves hasta 60 pies y realizas un golpe que no hace daño pero provoca "Debilidad 2".',
          hap3: 'Descarga Vital: Inflige 1d10 a un oponente y 1d4 a enemigos en 15 pies alrededor suyo.',
          hap4: 'Cambio de Postura (Reacción): Si llevas a cabo con éxito una habilidad, puedes cambiar de postura. Obtienes "Kiai".',
          had: 'Postura del Rey Mono (1/Día): Ganas todos los beneficios de todas las posturas durante 2 turnos, más un dado de daño extra al atacar. Obtienes "Kiai".'
        }
      },
      {
        id: 'chaman',
        name: 'Chamán',
        weapons: 'Maza + Escudo (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Chamán controla el campo mediante Tótems del Sol y la Luna. Alterna entre daño y curación zonal, y puede combinar ambos poderes en el devastador Tótem del Eclipse.',
        icon: '🌿',
        abilities: {
          hap1: 'Tótems Convergentes: Invocas un Tótem (❤️❤️, 10 DA) a 20 pies. Sol: inflige "Quemadura" al enemigo más cercano cada turno. Luna: aplica "Regeneración 1" al aliado más cercano cada turno.',
          hap2: 'Poder Telúrico: Activa el Tótem. Sol → 1d6 de daño a enemigos a 20 pies de ti y el Tótem. Luna → 🛡️ a aliados a 20 pies de ti y el Tótem.',
          has1: 'Despertar Ceremonial: El Tótem activo cambia de tipo, detona su nuevo poder y se encadena al aliado/enemigo más cercano al primer objetivo a 30 pies.',
          has2: 'Rescate de la Naturaleza (Reacción): Un enemigo actúa a 20 pies o menos del Tótem: provoca su ruptura violenta causando "Derribado" y cortando su acción.',
          had: 'Eclipse Atronador (1/Día): Requiere Tótem activo. Se convierte en Tótem del Eclipse (efecto de ambos, ❤️❤️ extra). Un rayo provoca 1d8 automático a enemigos en 20 pies del Tótem y tuya.'
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
    hb1: 'Intuir Creencias: Puedes detectar las creencias de un objetivo así como sus motivaciones y preocupaciones.',
    hb2: 'Santificar: Creas un espacio santificado alrededor tuya durante un minuto en el que las criaturas se apaciguan y pierden las ganas de combatir.',
    description: 'Vitales y persistentes. Cuando todas las medidas de seguridad fallen y tu equipo esté a las puertas de la muerte, allí estarán estos excelentes aliados listos para daros una segunda oportunidad, o las que hagan falta.',
    lore: 'Los veladores son la luz en la oscuridad, la esperanza cuando todo parece perdido. Su magia no destruye, sino que restaura y protege. Cada curación es un acto de fe, cada barrera un juramento de protección.',
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
          hap1: 'Canalización: Canalizas ayuda divina en área otorgando 🛡️ a todos los aliados dentro de 30 pies.',
          hap2: 'Bendición: Bendices a un aliado dentro de 30 pies otorgándole 🛡️🛡️.',
          has1: 'Rayo Celestial: Chorro de luz sagrada de 15 pies que inflige 1d6 a enemigos y otorga 🛡️ a aliados acertados.',
          has2: 'Favor Cegador (Reacción): Si un aliado a 30 pies sufre un ataque y el atacante falla, provoca "Cegar 1" al atacante.',
          had: 'Intervención (1/Día): Restauras todos los ❤️ de ti y aliados a 30 pies y otorgas "Invulnerable 1". Al inicio de tu siguiente turno ganas 🛡️ equivalente a los 💧 gastados.'
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
          hap1: 'Haz Corrosivo Redentor: Lanzas un haz de luz a un enemigo (1d8). Todo el daño infligido se otorga a ti y aliados en forma de 🛡️.',
          hap2: 'Sacrificio Deflagrante: Sacrifica 🛡️ para infligir 1d6 a todos los enemigos a 10 pies alrededor tuya.',
          hap3: 'Ofrenda: Sacrifica ❤️ para ganar 🛡️🛡️.',
          hap4: 'Intercambio Profético (Reacción): Si un aliado a 30 pies fuera a recibir daño, sacrificas 🛡️ para anular ese daño. El aliado queda "Vigorizado 2".',
          had: 'Juicio del Sacrificio (1/Día): Sacrificas todo tu 🛡️ restante e infliges esa cantidad de daño a todos los enemigos a 30 pies. No puede fallar.'
        }
      },
      {
        id: 'restaurador',
        name: 'Restaurador',
        weapons: 'Maza + Escudo (1 mano cada)',
        weaponType: '1-mano',
        description: 'El Restaurador convierte el sufrimiento ajeno en protección para el grupo. Exalta almas, expía condiciones y canaliza el dolor recibido para forjar escudos reactivos para sus aliados.',
        icon: '🌟',
        abilities: {
          hap1: 'A las Puertas del Cielo: Exaltas el espíritu de un aliado a 20 pies: si es derribado, vuelve al combate con ❤️.',
          hap2: 'Sacrificio: Expías a un aliado a 20 pies otorgándole 🛡️ por cada condición que esté sufriendo.',
          has1: 'Sufrimiento Ejemplar: Canalizas el daño de escudo que sufrió un aliado a 20 pies el último turno, otorgando esa cantidad de 🛡️ a aliados a 10 pies de ti.',
          has2: 'Plegaria (Reacción): Un aliado a 30 pies va a atacar. Gastas 🛡️ para darle ventaja en la tirada de impacto.',
          had: 'Resurrección (1/Día): Contactas con el alma de un aliado de hace 1 turno y restauras sus PV, escudo, condiciones y recursos a como estaban entonces.'
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
    hb1: 'Melodía Emotiva: Puedes empezar a entonar una melodía que potenciará una emoción en concreto a los que estén dentro de 15 pies.',
    hb2: 'Disfraz: Te adaptas al entorno disfrazándote y pasando desapercibido por 1 hora.',
    description: 'Peligrosos e inspiradores. Aunque los Exaltadores pueden llegar a provocar algunos resultados no deseados, suelen ser grandes fuentes de apoyo para el equipo. Si bien no siempre controlan todo su potencial, pueden ser la diferencia entre la vida y la muerte de la forma más literal posible.',
    lore: 'Los exaltadores son los catalizadores de la grandeza. Su magia no destruye ni cura directamente, sino que desbloquea el potencial oculto en los demás. Con una canción, un gesto o una palabra de poder, pueden convertir a un soldado mediocre en un campeón invencible.',
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
          hap1: 'Melodía de Celeridad: Entonas una melodía que confiere "Acelerado 2" a ti y aliados dentro de 30 pies.',
          hap2: 'Ritmo de Batalla: Marcas el ritmo a ti y aliados dentro de 15 pies aumentando su dado de daño en 1 hasta tu siguiente turno.',
          has1: 'Escudo Encantado: Tu rodela se enlaza a un aliado dentro de 30 pies confiriéndole 1d4 extra de daño por ataque hasta el final de tu turno.',
          has2: 'Improvisación (Reacción): Si sufres un ataque y lo esquivas, puedes realizar otra habilidad (distinta a esta y la definitiva) gratis.',
          had: 'Himno de Determinación (1/Día): Infundes determinación a ti y aliados, otorgando "Acelerado 2". Las condiciones perjudiciales que sufríais cesan inmediatamente.'
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
          hap1: 'Robo del Destino (1/Combate): Robas 3 cartas del mazo (10 cartas: 4 Amarillas = nada, 2 Verdes = +1 objetivo, 2 Azules = +1 turno efecto, 2 Rojas = -1 / -1 turno).',
          hap2: 'El Juez: Invoca el poder del Juez confiriendo "Coraje 2" a 1 aliado dentro de 30 pies.',
          has1: 'La Templanza: Invoca el poder de la Templanza convirtiendo 1 efecto perjudicial en beneficioso a 1 aliado a 20 pies.',
          has2: 'El Necio (Reacción): Si un aliado a 30 pies recibe un estado perjudicial, descarta una carta a elección y roba una carta.',
          had: 'La Emperatriz (1/Día): Convierte cualquier estado perjudicial de todos los aliados a 30 pies en beneficioso y aumenta su duración en 1 turno.'
        }
      },
      {
        id: 'bailarin',
        name: 'Bailarín',
        weapons: 'Próximamente',
        weaponType: '1-mano',
        description: 'Subclase en desarrollo. Próximamente disponible.',
        icon: '💃',
        abilities: {
          hap1: 'Próximamente.',
          hap2: 'Próximamente.',
          has1: 'Próximamente.',
          has2: 'Próximamente.',
          had: 'Próximamente.'
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
    hb1: 'Voz Fantasmal: Puedes generar un sonido fantasmal con la voz de alguien que conozcas dentro de tu rango de movimiento. El sonido se disipa al minuto.',
    hb2: 'Forma de Sombra: Pierdes la corporeidad volviéndote una sombra que puede desplazarse por cualquier superficie hasta 10 minutos.',
    description: 'Absolutos y manipuladores. Los Místicos prefieren destacar su potencial de formas abruptas. No existen términos medios con ellos, es todo o nada. Son la representación más viva del azar y pueden convertir algunos combates en simples trivialidades.',
    lore: 'Los místicos caminan por el filo entre la luz y la oscuridad, y han elegido abrazar las sombras. Su magia no es malvada per se, sino una herramienta que pocos se atreven a empuñar.',
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
          hap1: 'Espada Maldita: Calumnias tu espada provocando "Parálisis" al siguiente objetivo que aciertes.',
          hap2: 'Lanzamiento Impuro: Lanzas tu espada a un objetivo dentro de 30 pies, provocándole "Aturdido 2" si aciertas.',
          has1: 'Quiebre Temporal: Quebrantas el tiempo provocando "Ralentizado 2" a todos los enemigos dentro de 30 pies.',
          has2: 'Interrupción Oscura (Reacción): Si un enemigo a 30 pies va a lanzar un hechizo o habilidad, fuerzas salvación de Voluntad CD(10+Mod.Percepción). Si falla, lo falla directamente.',
          had: 'Augurio Final (1/Día): Todos los enemigos dentro de 30 pies sufren "Inmóvil" y "Aturdido 2".'
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
          hap1: 'Rito Oscuro: Te provocas "Debilidad 2". Si ya sufres un estado perjudicial, te aplicas también "Frágil 2".',
          hap2: 'Aura del Terror (1/Turno): Enemigos a 30 pies con estado perjudicial deben superar salvación de Voluntad CD13 o reciben "Miedo 2". Si ya tenían "Miedo", sufren 1d6.',
          has1: 'Esparcir Aflicción: Esparce todos tus estados perjudiciales o los de un enemigo a 10 pies, a todos los enemigos hasta 15 pies de ti.',
          has2: 'Extender el Sufrimiento (Reacción): Un enemigo con estado perjudicial realiza una acción a 20 pies o menos: aumentas la duración de todos sus estados en 1 turno.',
          had: 'Llamada de la Parca (1/Día): Todos los enemigos a 30 pies que sufran un estado perjudicial pierden todo su 🛡️.'
        }
      },
      {
        id: 'arlequin',
        name: 'Arlequín',
        weapons: 'Próximamente',
        weaponType: '1-mano',
        description: 'Subclase en desarrollo. Próximamente disponible.',
        icon: '🃏',
        abilities: {
          hap1: 'Próximamente.',
          hap2: 'Próximamente.',
          has1: 'Próximamente.',
          has2: 'Próximamente.',
          had: 'Próximamente.'
        }
      }
    ]
  }
];
