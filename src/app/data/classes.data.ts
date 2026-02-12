import { GameClass } from '../models/class.model';

export const CLASSES: GameClass[] = [
  // ===== MARTIAL CLASSES =====
  {
    id: 'escaramuzador',
    name: 'Escaramuzador',
    role: 'DPS a distancia / Sigilo',
    type: 'martial',
    resource: 'Energía Marcial',
    resourceIcon: '⚡',
    shieldBase: 2,
    passiveName: 'Emboscada',
    passive: 'El Escaramuzador obtiene bonificaciones al atacar desde sigilo o desde posiciones elevadas.',
    masteryPassiveName: 'Maestro del Terreno',
    masteryPassive: 'Domina el campo de batalla, obteniendo ventaja en cualquier terreno y pudiendo moverse sin provocar ataques de oportunidad.',
    hb1: 'Rastrear: Permite seguir huellas y detectar trampas en exploración.',
    hb2: 'Sigilo Avanzado: Puede moverse sin ser detectado fuera de combate.',
    description: 'Especialista en ataques a distancia y tácticas de sigilo. El Escaramuzador golpea donde menos se espera y desaparece antes de que el enemigo pueda reaccionar.',
    lore: 'Los escaramuzadores son las sombras del campo de batalla. Entrenados en el arte de la guerra silenciosa, prefieren acabar con sus enemigos antes de que estos sepan que están ahí. Ya sea con un arco desde la distancia o con una daga en la oscuridad, un escaramuzador siempre tiene la ventaja del primer golpe.',
    icon: '🏹',
    color: '#4ade80',
    subclasses: [
      {
        id: 'explorador',
        name: 'Explorador',
        weapons: 'Arco (2 manos)',
        weaponType: '2-manos',
        description: 'Maestro del arco y la distancia. El Explorador domina el campo de batalla desde lejos, eliminando amenazas antes de que se acerquen.',
        icon: '🎯',
        abilities: {
          hap1: 'Disparo Certero: Ataque a distancia con bonificación de precisión.',
          hap2: 'Lluvia de Flechas: Ataque en área que afecta a múltiples enemigos.',
          hap3: 'Flecha Perforante: Disparo que ignora parte de la armadura enemiga.',
          hap4: 'Esquiva Instintiva (Reacción): Evita un ataque moviéndose rápidamente.',
          had: 'Tormenta de Acero: Desata una ráfaga devastadora de flechas sobre el campo de batalla.'
        }
      },
      {
        id: 'ladron',
        name: 'Ladrón',
        weapons: 'Daga + Ballesta (1 mano cada)',
        weaponType: '1-mano',
        description: 'Especialista en combate furtivo y ataques oportunistas. El Ladrón combina la precisión de la ballesta con la letalidad de la daga.',
        icon: '🗡️',
        abilities: {
          hap1: 'Puñalada Traicionera: Ataque cuerpo a cuerpo con daño extra desde sigilo.',
          hap2: 'Disparo de Ballesta: Ataque a distancia rápido y preciso.',
          has1: 'Paso Sombrío: Se mueve sin ser detectado y gana posición ventajosa.',
          has2: 'Contraataque Furtivo (Reacción): Responde a un ataque fallido con un golpe letal.',
          had: 'Golpe Fantasma: Desaparece y reaparece detrás del enemigo para un ataque devastador.'
        }
      }
    ]
  },
  {
    id: 'luchador',
    name: 'Luchador',
    role: 'DPS cuerpo a cuerpo',
    type: 'martial',
    resource: 'Energía Marcial',
    resourceIcon: '⚡',
    shieldBase: 3,
    passiveName: 'Ímpetu',
    passive: 'El Luchador gana bonificaciones al encadenar ataques consecutivos en el mismo turno.',
    masteryPassiveName: 'Furia Imparable',
    masteryPassive: 'Cada golpe exitoso aumenta el daño del siguiente. Al alcanzar 3 golpes consecutivos, el siguiente ataque es automáticamente crítico.',
    hb1: 'Intimidar: Puede amedrentar a NPCs en situaciones sociales.',
    hb2: 'Fuerza Bruta: Puede romper objetos y obstáculos fuera de combate.',
    description: 'El guerrero definitivo del cuerpo a cuerpo. El Luchador se lanza al centro de la batalla y destruye todo a su paso con fuerza bruta y técnica marcial.',
    lore: 'Los luchadores viven para el combate. Cada cicatriz es una lección aprendida, cada victoria una prueba de su valía. No necesitan magia ni artimañas — sus puños, su acero y su voluntad inquebrantable son todo lo que necesitan para dominar cualquier campo de batalla.',
    icon: '⚔️',
    color: '#f87171',
    subclasses: [
      {
        id: 'guerrero',
        name: 'Guerrero',
        weapons: 'Mandoble (2 manos)',
        weaponType: '2-manos',
        description: 'Maestro del mandoble que descarga golpes devastadores. El Guerrero sacrifica defensa por un poder ofensivo abrumador.',
        icon: '🗡️',
        abilities: {
          hap1: 'Tajo Amplio: Golpe en arco que puede alcanzar a varios enemigos.',
          hap2: 'Carga Brutal: Avanza hacia el enemigo con un golpe potenciado.',
          hap3: 'Ejecución: Ataque devastador contra enemigos debilitados.',
          hap4: 'Contraataque Feroz (Reacción): Responde a un ataque con un golpe de mandoble.',
          had: 'Vendaval de Acero: Serie de cortes imparables que arrasan con todo a su alrededor.'
        }
      },
      {
        id: 'artista-marcial',
        name: 'Artista Marcial',
        weapons: 'Nudilleras (2 manos)',
        weaponType: '2-manos',
        description: 'Combatiente que ha perfeccionado su cuerpo como arma. El Artista Marcial encadena golpes rápidos y precisos con fluidez letal.',
        icon: '👊',
        abilities: {
          hap1: 'Ráfaga de Golpes: Serie rápida de puñetazos.',
          hap2: 'Patada Giratoria: Ataque en área con las piernas.',
          hap3: 'Golpe de Presión: Ataque que debilita al enemigo.',
          hap4: 'Desvío Marcial (Reacción): Desvía un ataque con las manos desnudas.',
          had: 'Mil Puños: Descarga una tormenta de golpes imposible de esquivar.'
        }
      }
    ]
  },
  {
    id: 'protector',
    name: 'Protector',
    role: 'Tank / Soporte defensivo',
    type: 'martial',
    resource: 'Energía Marcial',
    resourceIcon: '⚡',
    shieldBase: 3,
    passiveName: 'Bastión',
    passive: 'El Protector puede absorber daño destinado a aliados adyacentes.',
    masteryPassiveName: 'Guardián Inquebrantable',
    masteryPassive: 'Mientras tenga escudo activo, reduce todo el daño recibido. Los aliados adyacentes reciben una bonificación permanente a su DA.',
    hb1: 'Inspirar Valor: Otorga moral a los aliados en situaciones de exploración.',
    hb2: 'Defensa Férrea: Puede bloquear caminos y proteger a otros fuera de combate.',
    description: 'El muro infranqueable del grupo. El Protector se interpone entre el peligro y sus aliados, absorbiendo golpes que destruirían a cualquier otro.',
    lore: 'Los protectores son el escudo del mundo. Juran defender a los inocentes y a sus compañeros con su propia vida si es necesario. Su entrenamiento les ha convertido en fortalezas vivientes, capaces de resistir avalanchas de golpes sin ceder un paso. Donde hay un protector, hay esperanza.',
    icon: '🛡️',
    color: '#60a5fa',
    subclasses: [
      {
        id: 'paladin',
        name: 'Paladín',
        weapons: 'Martillo + Escudo (1 mano cada)',
        weaponType: '1-mano',
        description: 'Guerrero sagrado que combina defensa con poder divino. El Paladín protege a sus aliados mientras castiga a los malvados.',
        icon: '🔨',
        abilities: {
          hap1: 'Golpe Sagrado: Ataque con martillo imbuido de energía divina.',
          hap2: 'Escudo de Fe: Levanta su escudo para proteger a un aliado.',
          has1: 'Aura Protectora: Genera un campo que reduce el daño a aliados cercanos.',
          has2: 'Intervención Divina (Reacción): Se interpone para recibir un golpe destinado a un aliado.',
          had: 'Juicio Divino: Invoca poder sagrado que daña enemigos y cura aliados.'
        }
      },
      {
        id: 'cruzado',
        name: 'Cruzado',
        weapons: 'Mandoble (2 manos)',
        weaponType: '2-manos',
        description: 'Tank ofensivo que usa un mandoble para controlar el campo de batalla. El Cruzado combina resistencia con poder de ataque.',
        icon: '✝️',
        abilities: {
          hap1: 'Embate Sagrado: Carga con el mandoble generando escudo.',
          hap2: 'Corte Protector: Ataque que genera escudo para aliados cercanos.',
          hap3: 'Desafío: Obliga a un enemigo a atacarle.',
          hap4: 'Represalia Santa (Reacción): Contraataca cuando un aliado recibe daño.',
          had: 'Cruzada Imparable: Se convierte en un torbellino de acero y fe, dañando enemigos y protegiendo aliados.'
        }
      }
    ]
  },
  {
    id: 'artillero',
    name: 'Artillero',
    role: 'Constructor / Control de zona',
    type: 'martial',
    resource: 'Energía Marcial',
    resourceIcon: '⚡',
    shieldBase: 2,
    passiveName: 'Ingenio Táctico',
    passive: 'El Artillero puede colocar dispositivos y trampas en el campo de batalla.',
    masteryPassiveName: 'Genio Tecnológico',
    masteryPassive: 'Los dispositivos y construcciones del Artillero tienen el doble de duración y efectividad. Puede tener un dispositivo adicional activo.',
    hb1: 'Reparar: Puede arreglar objetos mecánicos y dispositivos fuera de combate.',
    hb2: 'Analizar: Examina mecanismos y trampas para desactivarlos.',
    description: 'Maestro de la tecnología y las construcciones. El Artillero controla el campo de batalla con dispositivos, trampas y armas de fuego.',
    lore: 'Los artilleros son los inventores del campo de batalla. Donde otros ven chatarra, ellos ven potencial. Sus mentes brillantes diseñan dispositivos capaces de cambiar el curso de cualquier enfrentamiento, desde torretas automáticas hasta trampas explosivas. Un artillero bien preparado es más peligroso que un ejército.',
    icon: '🔧',
    color: '#fb923c',
    subclasses: [
      {
        id: 'ingeniero',
        name: 'Ingeniero',
        weapons: 'Rifle (2 manos)',
        weaponType: '2-manos',
        description: 'Especialista en armas de fuego y construcciones defensivas. El Ingeniero domina el campo con torretas y disparos precisos.',
        icon: '🔫',
        abilities: {
          hap1: 'Disparo de Rifle: Ataque a distancia potente y preciso.',
          hap2: 'Desplegar Torreta: Coloca una torreta automática.',
          hap3: 'Mina de Proximidad: Coloca una trampa explosiva.',
          hap4: 'Escudo Energético (Reacción): Activa un campo de fuerza temporal.',
          had: 'Bombardeo Orbital: Desata una lluvia de proyectiles sobre una zona amplia.'
        }
      },
      {
        id: 'maquinista',
        name: 'Maquinista',
        weapons: 'Pistola + Daga (1 mano cada)',
        weaponType: '1-mano',
        description: 'Combatiente versátil que alterna entre disparos y cuchilladas. El Maquinista es impredecible y letal a cualquier distancia.',
        icon: '⚙️',
        abilities: {
          hap1: 'Disparo Rápido: Ataque a distancia con la pistola.',
          hap2: 'Cuchillada Mecánica: Ataque cuerpo a cuerpo potenciado.',
          has1: 'Trampa de Red: Atrapa a un enemigo limitando su movimiento.',
          has2: 'Contramedida (Reacción): Activa un dispositivo defensivo al ser atacado.',
          had: 'Arsenal Completo: Despliega todo su armamento en una ráfaga devastadora.'
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
    resource: 'Energía Mágica',
    resourceIcon: '💧',
    shieldBase: 1,
    passiveName: 'Canalización Arcana',
    passive: 'El Controlador puede potenciar sus hechizos gastando energía mágica adicional para aumentar su efecto.',
    masteryPassiveName: 'Maestro Arcano',
    masteryPassive: 'Los hechizos del Controlador ignoran resistencias mágicas. Los hechizos de control duran un turno adicional.',
    hb1: 'Detectar Magia: Percibe auras mágicas en el entorno.',
    hb2: 'Descifrar: Puede leer textos arcanos y runas antiguas.',
    description: 'El mago de combate por excelencia. El Controlador domina las fuerzas arcanas para devastar enemigos y controlar el campo de batalla con hechizos poderosos.',
    lore: 'Los controladores son los arquitectos de la destrucción arcana. Años de estudio les han otorgado un dominio sobre las fuerzas mágicas que pocos pueden igualar. Cada hechizo es una obra de arte letal, cada encantamiento una sentencia. El campo de batalla es su lienzo, y la magia, su pincel.',
    icon: '🔥',
    color: '#f87171',
    subclasses: [
      {
        id: 'mago',
        name: 'Mago',
        weapons: 'Bastón (2 manos)',
        weaponType: '2-manos',
        description: 'Hechicero clásico que canaliza poder arcano puro a través de su bastón. Devastador a distancia con hechizos de área.',
        icon: '🪄',
        abilities: {
          hap1: 'Proyectil Arcano: Disparo mágico certero.',
          hap2: 'Bola de Fuego: Explosión mágica en área.',
          hap3: 'Rayo Congelante: Ataque que ralentiza al objetivo.',
          hap4: 'Escudo Arcano (Reacción): Barrera mágica que absorbe daño.',
          had: 'Cataclismo Arcano: Desata una tormenta de energía pura que arrasa el campo de batalla.'
        }
      },
      {
        id: 'arcanista',
        name: 'Arcanista',
        weapons: 'Tomo + Maza (1 mano cada)',
        weaponType: '1-mano',
        description: 'Mago de combate que combina hechizos con golpes físicos. El Arcanista es versátil y peligroso tanto de cerca como de lejos.',
        icon: '📖',
        abilities: {
          hap1: 'Golpe Imbuido: Ataque con maza cargada de energía arcana.',
          hap2: 'Descarga Mística: Onda de choque mágica.',
          has1: 'Sello Arcano: Marca a un enemigo aumentando el daño que recibe.',
          has2: 'Contrahechizo (Reacción): Interrumpe un hechizo enemigo.',
          had: 'Ruptura Dimensional: Abre una fisura que devora a los enemigos cercanos.'
        }
      }
    ]
  },
  {
    id: 'invocador',
    name: 'Invocador',
    role: 'Invocaciones / Versatilidad',
    type: 'magic',
    resource: 'Energía Mágica',
    resourceIcon: '💧',
    shieldBase: 2,
    passiveName: 'Vínculo Natural',
    passive: 'El Invocador mantiene un vínculo con sus criaturas invocadas, compartiendo sentidos y pudiendo canalizar hechizos a través de ellas.',
    masteryPassiveName: 'Vínculo Primordial',
    masteryPassive: 'Las criaturas invocadas obtienen estadísticas mejoradas y el Invocador puede tener una invocación adicional activa.',
    hb1: 'Hablar con Animales: Puede comunicarse con criaturas naturales.',
    hb2: 'Sentidos Compartidos: Puede ver y oír a través de sus invocaciones.',
    description: 'Maestro de las invocaciones que llama criaturas al campo de batalla. El Invocador nunca lucha solo — sus aliados sobrenaturales son una extensión de su voluntad.',
    lore: 'Los invocadores han forjado pactos con las criaturas del más allá. Su poder no reside en la destrucción directa, sino en la capacidad de llamar aliados de otros planos para que luchen a su lado. Cada invocación es un vínculo de confianza mutua entre el invocador y la criatura, una simbiosis que trasciende los límites del mundo material.',
    icon: '🐉',
    color: '#4ade80',
    subclasses: [
      {
        id: 'druida',
        name: 'Druida',
        weapons: 'Lanza (2 manos)',
        weaponType: '2-manos',
        description: 'Guardián de la naturaleza que invoca bestias y espíritus del bosque. El Druida canaliza el poder primordial de la tierra.',
        icon: '🌳',
        abilities: {
          hap1: 'Estocada Natural: Ataque con lanza imbuida de energía natural.',
          hap2: 'Invocar Bestia: Llama a una criatura del bosque al combate.',
          hap3: 'Enredadera: Raíces que inmovilizan a los enemigos.',
          hap4: 'Escudo de Corteza (Reacción): Se cubre con corteza mágica.',
          had: 'Furia de la Naturaleza: Invoca una bestia primordial devastadora.'
        }
      },
      {
        id: 'monje',
        name: 'Monje',
        weapons: 'Nudilleras (2 manos)',
        weaponType: '2-manos',
        description: 'Combatiente espiritual que invoca manifestaciones de su ki interior. El Monje fusiona artes marciales con poder espiritual.',
        icon: '☯️',
        abilities: {
          hap1: 'Golpe Espiritual: Puñetazo cargado de energía ki.',
          hap2: 'Invocar Espíritu: Materializa un espíritu guardián.',
          hap3: 'Palma de Energía: Onda de choque espiritual.',
          hap4: 'Flujo de Ki (Reacción): Redirige la energía de un ataque.',
          had: 'Avatar Espiritual: Se fusiona con un espíritu ancestral, transformándose temporalmente.'
        }
      }
    ]
  },
  {
    id: 'velador',
    name: 'Velador',
    role: 'Curación / Protección',
    type: 'magic',
    resource: 'Energía Mágica',
    resourceIcon: '💧',
    shieldBase: 3,
    passiveName: 'Gracia Sanadora',
    passive: 'Las curaciones del Velador son más efectivas cuando el objetivo tiene poca vida.',
    masteryPassiveName: 'Gracia Divina',
    masteryPassive: 'Las curaciones del Velador pueden exceder el máximo de vida del objetivo como escudo temporal. Puede curar a dos aliados simultáneamente.',
    hb1: 'Purificar: Elimina venenos y enfermedades fuera de combate.',
    hb2: 'Bendecir: Otorga protección divina temporal a un aliado.',
    description: 'El sanador y protector del grupo. El Velador mantiene a sus aliados con vida y los protege con barreras mágicas y bendiciones divinas.',
    lore: 'Los veladores son la luz en la oscuridad, la esperanza cuando todo parece perdido. Su magia no destruye, sino que restaura y protege. Cada curación es un acto de fe, cada barrera un juramento de protección. Un grupo sin velador camina hacia la muerte; con uno, camina hacia la victoria.',
    icon: '💚',
    color: '#4ade80',
    subclasses: [
      {
        id: 'clerigo',
        name: 'Clérigo',
        weapons: 'Sable + Tomo (1 mano cada)',
        weaponType: '1-mano',
        description: 'Sacerdote guerrero que combina curación con combate. El Clérigo puede luchar en primera línea mientras mantiene a sus aliados con vida.',
        icon: '📿',
        abilities: {
          hap1: 'Corte Luminoso: Ataque con sable imbuido de luz.',
          hap2: 'Curación Mayor: Restaura una cantidad significativa de vida.',
          has1: 'Barrera Sagrada: Escudo mágico que protege a un aliado.',
          has2: 'Intervención Sagrada (Reacción): Cura a un aliado que recibe daño.',
          had: 'Milagro: Curación masiva que restaura a todos los aliados y daña a los no-muertos.'
        }
      },
      {
        id: 'oraculo',
        name: 'Oráculo',
        weapons: 'Lanza (2 manos)',
        weaponType: '2-manos',
        description: 'Vidente que canaliza visiones del futuro para proteger y curar. El Oráculo anticipa el peligro antes de que ocurra.',
        icon: '👁️',
        abilities: {
          hap1: 'Lanza de Luz: Ataque a distancia con energía divina.',
          hap2: 'Visión Curativa: Curación guiada por visiones proféticas.',
          hap3: 'Premonición: Otorga ventaja a un aliado en su próxima acción.',
          hap4: 'Destino Alterado (Reacción): Cambia el resultado de una tirada de un aliado.',
          had: 'Revelación: Visión del futuro que otorga ventaja masiva al grupo y desorienta a los enemigos.'
        }
      }
    ]
  },
  {
    id: 'exaltador',
    name: 'Exaltador',
    role: 'Buff / Soporte ofensivo',
    type: 'magic',
    resource: 'Energía Mágica',
    resourceIcon: '💧',
    shieldBase: 1,
    passiveName: 'Inspiración',
    passive: 'Los aliados potenciados por el Exaltador obtienen una bonificación adicional a sus tiradas de ataque.',
    masteryPassiveName: 'Inspiración Suprema',
    masteryPassive: 'Los buffs del Exaltador afectan a un aliado adicional y su duración se duplica.',
    hb1: 'Persuadir: Puede influir en NPCs con su carisma sobrenatural.',
    hb2: 'Canción de Viaje: Acelera el movimiento del grupo fuera de combate.',
    description: 'El potenciador definitivo del grupo. El Exaltador convierte a aliados normales en héroes legendarios con sus buffs y auras de poder.',
    lore: 'Los exaltadores son los catalizadores de la grandeza. Su magia no destruye ni cura directamente, sino que desbloquea el potencial oculto en los demás. Con una canción, un gesto o una palabra de poder, pueden convertir a un soldado mediocre en un campeón invencible. Son los héroes detrás de los héroes.',
    icon: '🎵',
    color: '#f0c040',
    subclasses: [
      {
        id: 'bardo',
        name: 'Bardo',
        weapons: 'Flautaespada + Rodela (1 mano cada)',
        weaponType: '1-mano',
        description: 'Músico guerrero que potencia a sus aliados con melodías mágicas. La flautaespada del Bardo es tanto instrumento como arma.',
        icon: '🎶',
        abilities: {
          hap1: 'Estocada Melódica: Ataque con la flautaespada que genera una nota de poder.',
          hap2: 'Canción de Guerra: Potencia el ataque de los aliados cercanos.',
          has1: 'Melodía Protectora: Otorga escudo temporal a un aliado.',
          has2: 'Contranota (Reacción): Interrumpe un efecto enemigo con una nota discordante.',
          had: 'Sinfonía de la Victoria: Composición épica que potencia masivamente a todos los aliados.'
        }
      },
      {
        id: 'cartomante',
        name: 'Cartomante',
        weapons: 'Bastón + Guante Arcano (1 mano cada)',
        weaponType: '1-mano',
        description: 'Místico que lee el destino en las cartas y manipula la suerte. El Cartomante altera las probabilidades a favor de sus aliados.',
        icon: '🃏',
        abilities: {
          hap1: 'Carta del Destino: Lanza una carta mágica que daña al enemigo.',
          hap2: 'Fortuna: Otorga ventaja a un aliado en sus próximas tiradas.',
          has1: 'Mala Suerte: Impone desventaja a un enemigo.',
          has2: 'Carta Trampa (Reacción): Activa una carta preparada cuando un enemigo ataca.',
          had: 'Mano del Destino: Roba cinco cartas del destino con efectos aleatorios devastadores.'
        }
      }
    ]
  },
  {
    id: 'mistico',
    name: 'Místico',
    role: 'Debuff / Control oscuro',
    type: 'magic',
    resource: 'Energía Mágica',
    resourceIcon: '💧',
    shieldBase: 1,
    passiveName: 'Corrupción',
    passive: 'Los debuffs del Místico tienen una probabilidad de extender su duración al infligir daño.',
    masteryPassiveName: 'Señor de las Sombras',
    masteryPassive: 'Los debuffs del Místico no pueden ser disipados por medios normales. Los enemigos debuffados reciben daño adicional de todas las fuentes.',
    hb1: 'Sentir Oscuridad: Detecta presencias malignas y no-muertos.',
    hb2: 'Susurros: Puede extraer información de las sombras.',
    description: 'Maestro de las artes oscuras y la debilitación. El Místico corrompe y debilita a sus enemigos, convirtiendo sus fortalezas en debilidades.',
    lore: 'Los místicos caminan por el filo entre la luz y la oscuridad, y han elegido abrazar las sombras. Su magia no es malvada per se, sino una herramienta que pocos se atreven a empuñar. Cada maldición, cada debuff, es un recordatorio de que el poder tiene muchas formas, y las más temidas son las que no puedes ver venir.',
    icon: '🌑',
    color: '#a78bfa',
    subclasses: [
      {
        id: 'brujo',
        name: 'Brujo',
        weapons: 'Espada Corta + Guante Arcano (1 mano cada)',
        weaponType: '1-mano',
        description: 'Hechicero oscuro que combina magia de sombras con combate cuerpo a cuerpo. El Brujo drena la fuerza vital de sus enemigos.',
        icon: '🖐️',
        abilities: {
          hap1: 'Corte Maldito: Ataque con espada que aplica un debuff.',
          hap2: 'Drenar Vida: Absorbe vida del enemigo.',
          has1: 'Maldición de Debilidad: Reduce las estadísticas del objetivo.',
          has2: 'Escudo de Sombras (Reacción): Se envuelve en oscuridad para reducir daño.',
          had: 'Noche Eterna: Sumerge el campo en oscuridad total, debilitando a todos los enemigos.'
        }
      },
      {
        id: 'aruspice',
        name: 'Arúspice',
        weapons: 'Hacha + Tomo (1 mano cada)',
        weaponType: '1-mano',
        description: 'Adivino oscuro que lee el futuro en las entrañas y manipula el destino de sus enemigos. El Arúspice maldice con conocimiento prohibido.',
        icon: '💀',
        abilities: {
          hap1: 'Hachazo Profano: Ataque con hacha imbuida de energía oscura.',
          hap2: 'Presagio Funesto: Maldición que reduce la efectividad del enemigo.',
          has1: 'Marca de Muerte: Señala a un enemigo, aumentando el daño que recibe.',
          has2: 'Augurio Protector (Reacción): Una visión le permite esquivar un ataque.',
          had: 'Apocalipsis: Invoca una visión de destrucción que aterroriza y daña a todos los enemigos.'
        }
      }
    ]
  }
];
