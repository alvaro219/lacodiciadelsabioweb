import { WeaponAbility, Weapon } from '../models/weapon.model';

export const WEAPON_ABILITIES: WeaponAbility[] = [
  { name: 'Alcance', description: 'Puedes atacar desde 5 pies extras.' },
  { name: 'A distancia', description: 'Puedes usar tu arma para atacar objetivos a 30 pies de distancia.' },
  { name: 'Contundente', description: 'Si haces daño máximo, provocas "Aturdido" al objetivo.' },
  { name: 'Precisa', description: 'Si haces daño máximo, provocas "Inmóvil" al objetivo.' },
  { name: 'Flujo', description: 'Si haces daño máximo, recuperas 1 ⚡/💧.' },
  { name: 'Pesada', description: 'Realizas la tirada de acierto con desventaja.' },
  { name: 'Encadenante', description: 'Si sobra daño y hay enemigos al alcance, puedes repartir el daño sobrante.' },
  { name: 'Ágil', description: 'Después de atacar, si derrotaste al enemigo, puedes moverte 5 pies.' },
  { name: 'Sorpresiva', description: 'El daño se realiza antes de que el enemigo pueda gastar 🔶.' }
];

export const WEAPONS: Weapon[] = [
  { name: 'Arco Corto', damage: '1d8', modifier: 'Percepción', hands: 'A dos manos', slot: 'Principal', abilities: ['A distancia'] },
  { name: 'Daga', damage: '1d6', modifier: 'Destreza', hands: 'A una mano', slot: 'Principal', abilities: ['Precisa', 'Ágil'] },
  { name: 'Ballesta de Mano', damage: '1d6', modifier: 'Percepción', hands: 'A una mano', slot: 'Principal', abilities: ['A distancia', 'Sorpresiva'] },
  { name: 'Bastón', damage: '1d6', modifier: 'Inteligencia', hands: 'A dos manos', slot: 'Principal', abilities: ['Contundente', 'Ágil'] },
  { name: 'Tomo', damage: '1d6', modifier: 'Inteligencia', hands: 'A una mano', slot: 'Principal', abilities: ['Flujo'] },
  { name: 'Maza', damage: '1d8', modifier: 'Fuerza', hands: 'A una mano', slot: 'Principal', abilities: ['Contundente'] },
  { name: 'Mandoble', damage: '1d10', modifier: 'Fuerza', hands: 'A dos manos', slot: 'Principal', abilities: [] },
  { name: 'Nudilleras', damage: '2d4', modifier: 'Fuerza', hands: 'A dos manos', slot: 'Principal', abilities: ['Contundente', 'Ágil', 'Sorpresiva'] },
  { name: 'Martillo de guerra', damage: '1d8', modifier: 'Fuerza', hands: 'A una mano', slot: 'Principal', abilities: ['Contundente'] },
  { name: 'Escudo', damage: '1d4', modifier: 'Constitución', hands: 'A una mano', slot: 'Secundario', abilities: [] },
  { name: 'Lanza', damage: '1d8', modifier: 'Fuerza', hands: 'A dos manos', slot: 'Principal', abilities: ['Alcance'] },
  { name: 'Rifle', damage: '1d8', modifier: 'Percepción', hands: 'A dos manos', slot: 'Principal', abilities: ['A distancia'] },
  { name: 'Pistola', damage: '1d6', modifier: 'Percepción', hands: 'A una mano', slot: 'Principal', abilities: ['A distancia', 'Sorpresiva'] },
  { name: 'Daga', damage: '1d4', modifier: 'Destreza', hands: 'A una mano', slot: 'Secundaria', abilities: [] },
  { name: 'Guante Arcano', damage: '1d4', modifier: 'Inteligencia', hands: 'A una mano', slot: 'Secundaria', abilities: [] },
  { name: 'Sable', damage: '1d8', modifier: 'Destreza', hands: 'A una mano', slot: 'Principal', abilities: ['Precisa'] },
  { name: 'Flautaespada', damage: '1d6', modifier: 'Carisma', hands: 'A una mano', slot: 'Principal', abilities: ['Flujo', 'Ágil'] },
  { name: 'Rodela', damage: '1d4', modifier: 'Constitución', hands: 'A una mano', slot: 'Secundaria', abilities: [] },
  { name: 'Espada Corta', damage: '1d6', modifier: 'Destreza', hands: 'A una mano', slot: 'Principal', abilities: ['Precisa', 'Ágil'] },
  { name: 'Hacha', damage: '1d8', modifier: 'Fuerza', hands: 'A una mano', slot: 'Principal', abilities: ['Precisa'] },
  { name: 'Tomo', damage: '1d4', modifier: 'Inteligencia', hands: 'A una mano', slot: 'Secundaria', abilities: [] },
  { name: 'Ballesta de Mano', damage: '1d4', modifier: 'Percepción', hands: 'A una mano', slot: 'Secundaria', abilities: ['A distancia'] },
  { name: 'Maza', damage: '1d4', modifier: 'Fuerza', hands: 'A una mano', slot: 'Secundaria', abilities: [] }
];
