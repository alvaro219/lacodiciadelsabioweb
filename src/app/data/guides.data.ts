import { Guide } from '../models/guide.model';

export const GUIDES: Guide[] = [
  {
    id: 'manual-del-jugador',
    name: 'Manual del Jugador',
    subtitle: 'Todo lo que necesitas saber para crear tu personaje, entender las reglas de combate y dominar el sistema de juego.',
    description: 'La guía completa para jugadores de La Codicia del Sabio. Aprende a crear tu personaje, dominar el combate y entender todas las mecánicas del juego.',
    icon: '📖',
    color: '#8b5cf6',
    pdfFile: 'assets/pdf/Manual_del_Jugador_LCDS.pdf',
    sections: [
      {
        id: 'creacion-de-personaje',
        title: '1. Creación de Personaje',
        icon: '🧙',
        content: [
          { type: 'paragraph', text: 'Crear un personaje se resume en 3 decisiones clave:' },
          { type: 'subheading', text: '1. Elige una Raza' },
          { type: 'paragraph', text: 'Tu raza define tu pasiva racial, un bono (+1) y una penalización (−1) a dos estadísticas, y rasgos especiales como velocidad y tamaño.' },
          { type: 'paragraph', text: '<em>Humano, Elfo, Enano, Aasimar, Orco, Mediano, Lagarliz, Bestani, Omnimek, Lazuri…</em>' },
          { type: 'subheading', text: '2. Elige una Clase' },
          { type: 'paragraph', text: 'La clase define tu rol en el grupo: cómo luchas, qué recursos usas y qué pasiva de clase tienes. También determina tus PV base, Escudo base y Puntos de Habilidad (PH).' },
          { type: 'paragraph', text: '<em>Escaramuzador, Controlador, Luchador, Protector, Invocador, Artillero, Velador, Exaltador, Místico…</em>' },
          { type: 'subheading', text: '3. Elige una Subclase (Arma)' },
          { type: 'paragraph', text: 'La subclase viene determinada por el arma que equipas. Cada subclase tiene sus propias habilidades activas y una habilidad definitiva. Cambiar de arma = cambiar de subclase en cualquier momento.' }
        ]
      },
      {
        id: 'estadisticas',
        title: '2. Estadísticas',
        icon: '📊',
        content: [
          { type: 'paragraph', text: 'Hay 6 estadísticas principales. Cada una tiene un valor base (normalmente entre 8 y 12) y un modificador que se calcula como (Valor − 10).' },
          {
            type: 'list',
            items: [
              '<strong>FUE — Fuerza</strong>: Daño cuerpo a cuerpo, atletismo, cargar peso.',
              '<strong>DES — Destreza</strong>: Agilidad, reflejos, sigilo, Capacidad de Esquiva.',
              '<strong>CON — Constitución</strong>: Resistencia, aguante, PV extra.',
              '<strong>INT — Inteligencia</strong>: Conocimiento, hechizos, investigación.',
              '<strong>PER — Percepción</strong>: Sentidos, puntería, detectar trampas.',
              '<strong>CAR — Carisma</strong>: Liderazgo, persuasión, presencia.'
            ]
          },
          { type: 'subheading', text: 'Modificador' },
          { type: 'paragraph', text: 'El modificador de una estadística es (Valor − 10). Un valor de 12 da +2, un valor de 8 da −2. Este modificador se suma a tiradas relevantes.' }
        ]
      },
      {
        id: 'estadisticas-derivadas',
        title: '3. Estadísticas Derivadas',
        icon: '🔢',
        content: [
          {
            type: 'list',
            items: [
              '❤️ <strong>Puntos de Vida (PV)</strong>: Tu salud. Al llegar a 0, caes inconsciente. Se calcula: PV base de clase + Mod. Constitución.',
              '🛡️ <strong>Escudo</strong>: Puntos temporales que absorben daño antes que tu vida. Se calcula: Escudo base de clase.',
              '🎯 <strong>DA (Dificultad de Acierto)</strong>: Lo difícil que eres de golpear. Se calcula: 10 + Mod. Destreza. Los enemigos deben igualar ó superar tu DA para acertarte.',
              '⚡ <strong>Energía (PE)</strong>: Recurso marcial. Comienzas con el máximo (PH de clase) y regeneras +1 por turno.',
              '💧 <strong>Maná (PM)</strong>: Recurso mágico. Comienzas en 0 y regeneras +2 por turno.',
              '🏃 <strong>Iniciativa</strong>: Determina el orden de turno. Se calcula: 10 + Mod. Destreza (modificada por armadura).',
              '👟 <strong>Velocidad</strong>: Distancia que puedes recorrer por turno (en pies). Depende de tu raza.'
            ]
          }
        ]
      },
      {
        id: 'turno-de-combate',
        title: '4. Tu Turno de Combate',
        icon: '⚔️',
        content: [
          { type: 'paragraph', text: 'Cada turno dispones de los siguientes recursos de acción:' },
          {
            type: 'list',
            items: [
              '🟢🟢🟢 <strong>Puntos de Acción</strong><br>Tienes 3 por turno. Cada acción cuesta uno o más 🟢. Puedes moverte, atacar, usar habilidades, interactuar con objetos, etc.',
              '🔶 <strong>Reacción</strong><br>Tienes 1 reacción fuera de tu turno. Se recupera al inicio de tu turno. Sirve para contraataques, bloqueos y habilidades reactivas.'
            ]
          },
          { type: 'paragraph', text: '<strong>Ejemplos de acciones y su coste:</strong>' },
          {
            type: 'list',
            items: [
              'Moverse — 🟢',
              'Atacar (cuerpo a cuerpo / distancia) — 🟢',
              'Usar una habilidad — 🟢 a 🟢🟢🟢 (varía)',
              'Interactuar con un objeto — 🟢',
              'Levantarse si estás derribado — 🟢',
              'Esquivar (prepararse) — 🟢'
            ]
          }
        ]
      },
      {
        id: 'como-atacar',
        title: '5. Cómo Atacar',
        icon: '🎯',
        content: [
          { type: 'subheading', text: '1. Tirada de Acierto' },
          { type: 'paragraph', text: 'Tira 1d20 + modificador del arma (FUE, DES, INT o PER según el arma).' },
          {
            type: 'list',
            items: [
              'Si superas el DA del enemigo → aciertas.',
              'Si sacas 20 natural → crítico automático.',
              'Si superas el DA por 5 o más → también es crítico.'
            ]
          },
          { type: 'subheading', text: '2. Tirada de Daño' },
          { type: 'paragraph', text: 'Si aciertas, tiras tu dado de daño del arma:' },
          {
            type: 'list',
            items: [
              'Desarmado → 1d4',
              'Arma ligera (daga, etc.) → 1d6',
              'Arma intermedia (arco, espada, etc.) → 1d8',
              'Arma pesada (mandoble, etc.) → 1d10'
            ]
          },
          { type: 'paragraph', text: 'En crítico, subes un nivel de dado (ej: 1d8 → 1d10).' },
          { type: 'subheading', text: '3. Umbral de Daño' },
          {
            type: 'list',
            items: [
              '4+ → 1 punto de daño',
              '8+ → 2 puntos de daño',
              '12+ → 3 puntos de daño'
            ]
          },
          { type: 'note', text: '<strong>Escudo primero</strong><br>El daño reduce primero el Escudo 🛡️ del objetivo. Cuando el escudo llega a 0, el daño restante se aplica a los PV ❤️.' }
        ]
      },
      {
        id: 'recursos-de-habilidad',
        title: '6. Recursos de Habilidad (PH)',
        icon: '⚡',
        content: [
          { type: 'paragraph', text: 'Cada clase usa uno de estos dos recursos para activar sus habilidades:' },
          { type: 'subheading', text: '⚡ Energía (PE)' },
          { type: 'paragraph', text: 'Clases marciales (Escaramuzador, Luchador, Protector…)' },
          { type: 'paragraph', text: 'Comienzas con el máximo. Regeneras +1 al inicio de cada turno.' },
          { type: 'subheading', text: '💧 Maná (PM)' },
          { type: 'paragraph', text: 'Clases mágicas (Controlador, Invocador…)' },
          { type: 'paragraph', text: 'Comienzas en 0. Regeneras +2 al inicio de cada turno.' },
          { type: 'paragraph', text: 'Las habilidades tienen un coste de recurso (ej: ⚡⚡) y un coste de acción (ej: 🟢🟢). Debes pagar ambos para usar la habilidad.' },
          { type: 'subheading', text: 'Habilidad Definitiva' },
          { type: 'paragraph', text: 'Marcada con 🚫⚡ o 🚫💧, la HAD cuesta todos los ⚡/💧 que tengas (mínimo 1) y normalmente 3 acciones (🟢🟢🟢). Suele ser "1 Vez por Día" o "1 Vez por Combate".' }
        ]
      },
      {
        id: 'tipos-de-habilidades',
        title: '7. Tipos de Habilidades',
        icon: '✨',
        content: [
          {
            type: 'list',
            items: [
              '<strong>HAP (Habilidad Activa Principal)</strong><br>Habilidades ligadas a tu arma principal. Puedes tener hasta 4 (HAP1-HAP4). Si tu arma es a dos manos, tienes acceso a las 4.',
              '<strong>HAS (Habilidad Activa Secundaria)</strong><br>Habilidades ligadas a tu arma secundaria (solo si usas una mano). Puedes tener hasta 2 (HAS1-HAS2).',
              '<strong>HB (Habilidad Base)</strong><br>Habilidades fuera de combate que vienen con tu clase. Suelen ser de exploración o sociales.',
              '<strong>HAD (Habilidad Definitiva)</strong><br>Tu habilidad más poderosa. Limitada a 1 Vez por Día o 1 Vez por Combate. Cuesta todos tus recursos disponibles (⚡/💧).'
            ]
          },
          { type: 'subheading', text: 'Habilidades mejoradas' },
          { type: 'paragraph', text: 'Al subir de nivel, tus habilidades pueden mejorar: costar menos recursos, hacer más daño o tener efectos adicionales.' }
        ]
      },
      {
        id: 'defensa-y-armadura',
        title: '8. Defensa y Armadura',
        icon: '🛡️',
        content: [
          { type: 'paragraph', text: 'Tu defensa se compone de:' },
          {
            type: 'list',
            items: [
              '<strong>DA (Dificultad de Acierto)</strong>: 10 + Mod. Destreza. Los atacantes deben igualar ó superar este valor con su tirada de acierto.',
              '<strong>Escudo 🛡️</strong>: Puntos temporales que absorben daño. Cuando el escudo se agota, el daño pasa a los PV.'
            ]
          },
          { type: 'paragraph', text: '<strong>Tipos de armadura:</strong>' },
          {
            type: 'list',
            items: [
              'Armadura Ligera — 🛡️ — Sin penalización a iniciativa.',
              'Armadura Media — 🛡️🛡️ — −2 a Iniciativa.',
              'Armadura Pesada — 🛡️🛡️🛡️ — −4 a Iniciativa.'
            ]
          },
          { type: 'subheading', text: 'Sobreescudo' },
          { type: 'paragraph', text: 'El sobreescudo es lo que se obtiene al tener escudo por encima del límite de escudo máximo. Este puede llegar a cualquier cantidad pero desaparece al comenzar el turno.' }
        ]
      },
      {
        id: 'tiradas-de-salvacion',
        title: '9. Tiradas de Salvación',
        icon: '🎲',
        content: [
          { type: 'paragraph', text: 'Cuando recibes un efecto adverso, el DM puede pedirte una tirada de salvación. Tiras 1d20 + el modificador relevante y debes superar la CD (Clase de Dificultad) del efecto.' },
          {
            type: 'list',
            items: [
              '<strong>Fortaleza (CON)</strong>: Resiste venenos, enfermedades, efectos físicos.',
              '<strong>Agilidad (DES)</strong>: Esquiva explosiones, trampas, efectos de área.',
              '<strong>Voluntad (INT)</strong>: Resiste control mental, miedo, ilusiones.'
            ]
          }
        ]
      },
      {
        id: 'condiciones',
        title: '10. Condiciones',
        icon: '💀',
        content: [
          { type: 'paragraph', text: 'Las condiciones son estados alterados que afectan a los personajes. Hay 4 tipos:' },
          {
            type: 'list',
            items: [
              '<strong>Restricción</strong>: Limitan tu movimiento o acciones.<br><em>Derribado, Inmóvil, Levantado, Paralizado…</em>',
              '<strong>Debilitación</strong>: Reducen tus capacidades.<br><em>Desprevenido, Cegado, Envenenado, Ralentizado…</em>',
              '<strong>Potenciación</strong>: Te otorgan ventajas.<br><em>Montar, Invisible, Impulso, Égida…</em>',
              '<strong>Dañinas</strong>: Causan daño directo.<br><em>Sangrado, Quemadura…</em>'
            ]
          },
          { type: 'note', text: '<strong>Consulta el Compendium</strong><br>Puedes ver todas las condiciones con sus descripciones completas en la guía "Condiciones" del Compendium.' }
        ]
      },
      {
        id: 'descansos',
        title: '11. Descansos',
        icon: '🏕️',
        content: [
          { type: 'subheading', text: 'Descanso Corto' },
          { type: 'paragraph', text: '~1 hora de reposo.' },
          {
            type: 'list',
            items: [
              'Recuperas la mitad de PV (redondeando hacia abajo) y todo tu escudo.',
              'Algunas habilidades HB se recargan.'
            ]
          },
          { type: 'subheading', text: 'Descanso Largo' },
          { type: 'paragraph', text: '~8 horas de sueño.' },
          {
            type: 'list',
            items: [
              'Recuperas todos tus PV y escudo.',
              'Todas las habilidades se recargan.',
              'Las habilidades "1 Vez por Día" se recargan.'
            ]
          }
        ]
      },
      {
        id: 'ventaja-y-desventaja',
        title: '12. Ventaja y Desventaja',
        icon: '🎰',
        content: [
          { type: 'paragraph', text: 'Algunas situaciones te dan ventaja o desventaja en tus tiradas:' },
          {
            type: 'list',
            items: [
              '<strong>Ventaja</strong>: Tiras 2d20 y te quedas con el resultado más ALTO.',
              '<strong>Desventaja</strong>: Tiras 2d20 y te quedas con el resultado más BAJO.'
            ]
          },
          { type: 'paragraph', text: 'Si tienes ventaja y desventaja a la vez, se cancelan mutuamente y tiras 1d20 normal.' }
        ]
      },
      {
        id: 'clases-y-subclases',
        title: '13. Clases y Subclases',
        icon: '⚔️',
        content: [
          { type: 'paragraph', text: 'Cada clase tiene un rol, una pasiva, habilidades base (HB) y subclases definidas por el arma:' },
          {
            type: 'list',
            items: [
              'Escaramuzador — Daño rápido y movilidad. Inicia o remata combates. (⚡ Energía)',
              'Controlador — Daño constante y control del campo. (💧 Maná)',
              'Luchador — Fuerte en solitario, autosuficiente. (⚡ Energía)',
              'Protector — Tanque, protege aliados. (⚡ Energía)',
              'Invocador — Invoca criaturas aliadas. (💧 Maná)',
              'Artillero — Daño a distancia especializado. (⚡ Energía)',
              'Velador — Sanador y apoyo. (💧 Maná)',
              'Exaltador — Bufos positivos al grupo. (💧 Maná)',
              'Místico — Debufos negativos a los enemigos. (💧 Maná)'
            ]
          },
          { type: 'note', text: '<strong>Explora las clases</strong><br>Puedes consultar todas las clases con sus subclases y habilidades completas en la guía "Clases y Subclases" del Compendium.' }
        ]
      },
      {
        id: 'razas',
        title: '14. Razas',
        icon: '🌍',
        content: [
          { type: 'paragraph', text: 'Cada raza otorga una pasiva única, un bono de +1 a una estadística, un −1 a otra, y características especiales como velocidad y tamaño.' },
          {
            type: 'list',
            items: [
              'Humano: Los críticos inspiran: ventaja en la siguiente tirada. (30 pies, mediano)',
              'Elfo: Visión en la oscuridad. +1 INT, −1 FUE. (30 pies, mediano)',
              'Enano: Resistente al fuego, digiere minerales. +1 CON, −1 DES. (25 pies, mediano)',
              'Aasimar: Resplandece, resistente a la luz. +1 CAR, −1 PER. (30 pies, mediano)',
              'Orco: Si llega a 0 PV, recupera ❤️ (1/día). +1 FUE, −1 CAR. (35 pies, grande)',
              'Mediano: Ve convergencias mágicas. +1 INT, −1 PER. (25 pies, pequeño)',
              'Lagarliz: Se adapta al entorno, inmune a veneno. +1 PER, −1 FUE. (30 pies, mediano)',
              'Bestani: Huele sangre, puede correr a 4 patas. +1 PER, −1 INT. (30 pies, mediano)',
              'Omnimek: No necesita comer ni respirar. +1 CON, −1 CAR. (30 pies, mediano)',
              'Lazuri: Respira bajo el agua, sin penalización acuática. +1 PER, −1 DES. (30 pies, mediano)'
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'manual-del-master',
    name: 'Manual del Dungeon Master',
    subtitle: 'Todo lo que necesitas para dirigir partidas, diseñar encuentros, manejar enemigos y crear aventuras memorables.',
    description: 'La guía completa para Dungeon Masters de La Codicia del Sabio. Aprende a dirigir partidas, diseñar encuentros y crear aventuras épicas.',
    icon: '👑',
    color: '#f0c040',
    pdfFile: 'assets/pdf/Manual_del_Master_LCDS.pdf',
    sections: [
      {
        id: 'rol-del-dm',
        title: '1. El Rol del Dungeon Master',
        icon: '🎭',
        content: [
          { type: 'paragraph', text: 'El Dungeon Master (DM) es el narrador y árbitro del juego. Tu trabajo es:' },
          {
            type: 'list',
            items: [
              'Narrar la historia y describir el mundo.',
              'Controlar a los NPCs (personajes no jugadores) y enemigos.',
              'Arbitrar las reglas y resolver conflictos.',
              'Diseñar encuentros, mazmorras y aventuras.',
              'Reaccionar a las decisiones de los jugadores e improvisar.'
            ]
          },
          { type: 'subheading', text: 'Regla de oro' },
          { type: 'paragraph', text: 'El objetivo del DM no es ganar contra los jugadores, sino crear una experiencia divertida y memorables para todos. Las reglas son una guía, no una prisión y si una regla hace que el juego deje de ser divertido para la mesa, obvia la regla.' }
        ]
      },
      {
        id: 'estructura-sesion',
        title: '2. Estructura de una Sesión',
        icon: '📋',
        content: [
          { type: 'subheading', text: '1. Resumen' },
          { type: 'paragraph', text: 'Recuerda brevemente lo que pasó en la sesión anterior. Deja que los jugadores añadan lo que recuerden.' },
          { type: 'subheading', text: '2. Exploración' },
          { type: 'paragraph', text: 'Los jugadores interactúan con el mundo: hablan con NPCs, investigan, viajan. Aquí usas tiradas de habilidad para resolver situaciones.' },
          { type: 'subheading', text: '3. Combate' },
          { type: 'paragraph', text: 'Cuando la acción lo requiere, entras en modo combate con turnos, iniciativa y acciones tácticas.' },
          { type: 'subheading', text: '4. Desenlace' },
          { type: 'paragraph', text: 'Tras el combate o evento principal, da espacio para roleplay, recompensas y preparación para la siguiente sesión.' }
        ]
      },
      {
        id: 'tiradas',
        title: '3. Cuándo y Cómo Pedir Tiradas',
        icon: '🎲',
        content: [
          { type: 'paragraph', text: 'Pide una tirada cuando el resultado es incierto y las consecuencias importan. No pidas tiradas para acciones triviales.' },
          { type: 'subheading', text: 'Tiradas de Habilidad' },
          { type: 'paragraph', text: 'El jugador tira 1d20 + modificador relevante contra una CD (Clase de Dificultad) que tú decides:' },
          {
            type: 'list',
            items: [
              'Muy Fácil — CD 5',
              'Fácil — CD 8',
              'Normal — CD 10',
              'Difícil — CD 13',
              'Muy Difícil — CD 15',
              'Casi Imposible — CD 18',
              'Imposible — CD 20+'
            ]
          },
          { type: 'subheading', text: 'Tiradas de Salvación' },
          { type: 'paragraph', text: 'Cuando un efecto fuerza al personaje a resistirlo. El jugador tira 1d20 + modificador contra la CD del efecto.' },
          {
            type: 'list',
            items: [
              '<strong>Fortaleza (CON):</strong> Venenos, enfermedades, efectos físicos.',
              '<strong>Agilidad (DES):</strong> Trampas, explosiones, efectos de área.',
              '<strong>Voluntad (INT):</strong> Control mental, miedo, ilusiones.'
            ]
          },
          { type: 'subheading', text: 'Grados de éxito' },
          { type: 'paragraph', text: 'Si un jugador falla por poco (1-2), puedes dar un éxito parcial.' },
          { type: 'paragraph', text: 'Si supera la CD por 5+, dale un éxito excepcional con beneficios extra.' }
        ]
      },
      {
        id: 'dirigir-combate',
        title: '4. Dirigir el Combate',
        icon: '⚔️',
        content: [
          { type: 'subheading', text: 'Inicio del combate' },
          { type: 'subheading', text: '1. Iniciativa' },
          { type: 'paragraph', text: 'Todos los participantes (jugadores y enemigos) tiran iniciativa: 1d20 + Mod. Destreza (menos penalización por armadura). El orden va de mayor a menor.' },
          { type: 'subheading', text: '2. Posicionamiento' },
          { type: 'paragraph', text: 'Coloca a los enemigos y deja que los jugadores se posicionen en caso de que no estén ya a melée. Describe el escenario y las distancias.' },
          { type: 'subheading', text: 'Flujo del turno' },
          { type: 'paragraph', text: 'Cada participante, en orden de iniciativa, tiene:' },
          { type: 'paragraph', text: '<strong>🟢🟢🟢 Puntos de Acción</strong>' },
          { type: 'paragraph', text: 'Moverse, atacar, usar habilidades, interactuar…' },
          { type: 'paragraph', text: '<strong>🔶 Reacción</strong>' },
          { type: 'paragraph', text: 'Fuera de turno: contraataques, bloqueos, habilidades reactivas.' },
          { type: 'subheading', text: 'Resolver un ataque' },
          { type: 'subheading', text: '1. Tirada de acierto' },
          { type: 'paragraph', text: 'Atacante tira 1d20 + mod. del arma.' },
          { type: 'paragraph', text: 'Si supera el DA del defensor → acierta.' },
          { type: 'paragraph', text: '20 natural o superar por 5+ → crítico.' },
          { type: 'subheading', text: '2. Tirada de daño' },
          { type: 'paragraph', text: 'Dado del arma:' },
          {
            type: 'list',
            items: [
              'd4 (desarmado/ligera)',
              'd6 (ligera)',
              'd8 (intermedia)',
              'd10 (pesada)'
            ]
          },
          { type: 'paragraph', text: 'En crítico sube un dado.' },
          { type: 'subheading', text: '3. Umbral de daño' },
          {
            type: 'list',
            items: [
              '4+ = 1 daño',
              '8+ = 2 daño',
              '12+ = 3 daño'
            ]
          },
          { type: 'paragraph', text: 'El daño reduce primero escudo, luego PV.' },
          { type: 'subheading', text: 'Consejo de combate' },
          { type: 'paragraph', text: 'Intenta que los combates duren entre 3-6 rondas. Si se alargan demasiado, ajusta la vida de los enemigos sobre la marcha. Si son demasiado fáciles, añade refuerzos.' }
        ]
      },
      {
        id: 'disenar-encuentros',
        title: '5. Diseñar Encuentros',
        icon: '🗺️',
        content: [
          { type: 'paragraph', text: 'Un buen encuentro tiene variedad y no solo consiste en "matar enemigos". Considera:' },
          { type: 'subheading', text: 'Composición del grupo enemigo' },
          {
            type: 'list',
            items: [
              'Mezcla tiers: un mini-jefe con varios minions es más interesante que 5 enemigos iguales.',
              'Roles enemigos: incluye luchadores, tiradores, disruptores y hechiceros para crear dinámicas.',
              'Diferencia los enemigos: cada tipo tiene sus propias habilidades, pasivas y armas.'
            ]
          },
          { type: 'subheading', text: 'Tiers de enemigos' },
          {
            type: 'list',
            items: [
              '<strong>Minion:</strong> Débiles, mueren fácil. Buenos en grupo para abrumar.',
              '<strong>Normal:</strong> El estándar. Estadísticas equilibradas.',
              '<strong>Mini Boss:</strong> Potentes. Habilidades peligrosas. Necesitan estrategia.',
              '<strong>Boss:</strong> Amenaza máxima. Múltiples habilidades, mucha vida.'
            ]
          },
          { type: 'subheading', text: 'Dificultad orientativa (grupo de 4 jugadores)' },
          {
            type: 'list',
            items: [
              '<strong>Fácil:</strong> 4-6 Minions o 2-3 Normales.',
              '<strong>Normal:</strong> 3-4 Normales o 1 Mini Boss + 2 Minions.',
              '<strong>Difícil:</strong> 1 Mini Boss + 2-3 Normales o 2 Mini Bosses.',
              '<strong>Letal:</strong> 1 Boss + Minions de apoyo, o 2 Mini Bosses + Normales.'
            ]
          },
          { type: 'subheading', text: 'El entorno importa' },
          {
            type: 'list',
            items: [
              'Terreno difícil: cuesta moverse el doble.',
              'Cobertura: da ventaja o desventaja según la situación.',
              'Altura y caídas: ventaja al atacar desde arriba y 1d4 de daño por cada 10 pies de caída.',
              'Peligros ambientales: fuego, ácido, trampas que dañen a ambos bandos.'
            ]
          }
        ]
      },
      {
        id: 'manejar-enemigos',
        title: '6. Manejar Enemigos',
        icon: '👹',
        content: [
          { type: 'paragraph', text: 'Cada enemigo tiene:' },
          {
            type: 'list',
            items: [
              '<strong>Estadísticas:</strong> FUE, DES, INT, PER, CON, CAR — funcionan igual que las de los jugadores.',
              '<strong>PV y Escudo:</strong> Vida y escudo del enemigo. Según su tier, tendrá más o menos.',
              '<strong>DA:</strong> 10 + Mod. Destreza. Los jugadores deben igualar ó superar esto para acertar.',
              '<strong>Arma:</strong> Define el dado de daño y nº de ataques. Los enemigos también atacan con 1d20 + mod.',
              '<strong>Habilidades:</strong> Habilidades especiales que gastan recursos (🟢). Definen el peligro táctico.',
              '<strong>Pasivas:</strong> Efectos permanentes: regeneración, auras, resistencias…'
            ]
          },
          { type: 'subheading', text: 'Generador de Enemigos' },
          { type: 'paragraph', text: 'Usa el Generador de Enemigos de la app para crear enemigos rápidamente. Puedes generar automáticamente, manualmente con puntos, o usar los pregenerados editables.' }
        ]
      },
      {
        id: 'npcs-y-roleplay',
        title: '7. NPCs y Roleplay',
        icon: '🎲',
        content: [
          { type: 'paragraph', text: 'Los NPCs dan vida al mundo. No todos necesitan estadísticas de combate.' },
          { type: 'subheading', text: 'Crear un NPC rápido' },
          {
            type: 'list',
            items: [
              'Nombre y apariencia: algo memorable.',
              'Motivación: ¿qué quiere? ¿qué le preocupa?',
              'Personalidad: un rasgo dominante (nervioso, arrogante, amable…).',
              'Utilidad: ¿qué ofrece a los jugadores? (información, misiones, comercio).'
            ]
          },
          { type: 'subheading', text: 'Interacciones sociales' },
          { type: 'paragraph', text: 'Las tiradas sociales usan principalmente Carisma (CAR):' },
          {
            type: 'list',
            items: [
              'Persuasión: convencer con lógica y encanto.',
              'Intimidación: forzar mediante amenazas (CAR y FUE).',
              'Engaño: mentir convincentemente.',
              'Perspicacia (PER): detectar mentiras o intenciones ocultas.'
            ]
          }
        ]
      },
      {
        id: 'exploracion-y-descansos',
        title: '8. Exploración y Descansos',
        icon: '🏕️',
        content: [
          { type: 'subheading', text: 'Exploración' },
          {
            type: 'list',
            items: [
              'Pide tiradas de Percepción (PER) para detectar trampas, puertas ocultas o emboscadas.',
              'Pide tiradas de Inteligencia (INT) para recordar conocimiento, descifrar textos o identificar objetos.',
              'Pide tiradas de Destreza (DES) para abrir cerraduras, desactivar trampas o moverse sigilosamente.'
            ]
          },
          { type: 'subheading', text: 'Descansos' },
          { type: 'subheading', text: 'Descanso Corto (~1 hora)' },
          {
            type: 'list',
            items: [
              'Recuperas la mitad de PV (redondeando hacia abajo) y todo tu escudo.',
              'Se recargan habilidades HB marcadas "1 Vez por descanso corto".'
            ]
          },
          { type: 'subheading', text: 'Descanso Largo (~8 horas)' },
          {
            type: 'list',
            items: [
              'Recuperación total de PV y escudo.',
              'Se recargan todas las habilidades.',
              'Las habilidades "1 Vez por Día" se recargan.'
            ]
          },
          { type: 'subheading', text: 'Controla los descansos' },
          { type: 'paragraph', text: 'Controlar cuándo y dónde pueden descansar los jugadores es clave para la dificultad. Interrumpe descansos con emboscadas si abusan.' }
        ]
      },
      {
        id: 'recompensas-y-progresion',
        title: '9. Recompensas y Progresión',
        icon: '🏆',
        content: [
          { type: 'subheading', text: 'Tipos de recompensa' },
          {
            type: 'list',
            items: [
              'Oro y objetos: equipamiento, pociones, materiales.',
              'Información: pistas para la trama, mapas, secretos.',
              'Aliados: NPCs que se unen o ayudan en el futuro.',
              'Mejora de habilidades: al subir de nivel, las habilidades de los jugadores mejoran.'
            ]
          },
          { type: 'subheading', text: 'Subida de nivel' },
          { type: 'paragraph', text: 'Los jugadores suben de nivel cuando tú lo consideres apropiado: tras un arco narrativo, una batalla importante, o un hito en la campaña. Al subir pueden obtener dependiendo del nivel:' },
          {
            type: 'list',
            items: [
              '+1 a una estadística (a elección del jugador).',
              '+2 a una subestadística (a elección del jugador).',
              'Acceso a habilidades mejoradas de su subclase.'
            ]
          }
        ]
      },
      {
        id: 'herramienta-de-campanas',
        title: '10. Usar la Herramienta de Campañas',
        icon: '📱',
        content: [
          { type: 'paragraph', text: 'La app incluye una herramienta de Campañas que te permite gestionar combates en tiempo real:' },
          {
            type: 'list',
            items: [
              'Añade personajes de jugadores y enemigos a la campaña.',
              'Tira iniciativa para todos con un botón.',
              'Reordena los turnos manteniendo pulsada una tarjeta.',
              'Controla la vida, escudo y condiciones de cada participante.',
              'Usa el botón de ataque en enemigos para tirar su ataque automáticamente.',
              'Consulta los detalles de cada enemigo desde la vista de combate.'
            ]
          },
          { type: 'subheading', text: 'Enemigos pregenerados' },
          { type: 'paragraph', text: 'Puedes añadir enemigos pregenerados directamente desde la pestaña "Enemigo" en la campaña. Están listos para usar con todas sus estadísticas, habilidades y pasivas.' }
        ]
      },
      {
        id: 'consejos-para-el-dm',
        title: '11. Consejos para el DM',
        icon: '💡',
        content: [
          {
            type: 'list',
            items: [
              '<strong>Sé flexible:</strong> Los jugadores siempre harán algo que no esperabas. Improvisa y adapta.',
              '<strong>Di "sí, pero…":</strong> En lugar de negar ideas creativas, añade consecuencias o complicaciones.',
              '<strong>Haz que las decisiones importen:</strong> Las elecciones deben tener consecuencias, buenas o malas.',
              '<strong>Varía el ritmo:</strong> Alterna combate, exploración y roleplay para mantener el interés según las preferencias de la mesa.',
              '<strong>Describe con los sentidos:</strong> No solo lo que ven: olores, sonidos, texturas, temperatura…',
              '<strong>No tengas miedo de equivocarte:</strong> Si te equivocas en una regla, corrígelo después. No pares el juego.',
              '<strong>Escucha a los jugadores:</strong> Presta atención a lo que disfrutan y adapta la campaña a ello.'
            ]
          },
          { type: 'subheading', text: 'Diviértete' },
          { type: 'paragraph', text: 'El DM es el guía de la aventura. Todos tenemos la misma meta: pasar una buena noche jugando.' }
        ]
      }
    ]
  }
];
