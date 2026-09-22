// Clases de la web, construidas con los datos de la app (game/classes.json,
// se actualiza con `npm run sync-app`) y los textos propios de la web
// (class-extras.ts).

import appClasses from './game/classes.json';
import { AppArma, AppClase, AppSubclase } from '../models/app-data.model';
import { AbilityInfo, GameClass, Subclass, WeaponInfo } from '../models/class.model';
import { gameImage, slugify, splitAbility } from '../utils/game.utils';
import { CLASS_EXTRAS } from './class-extras';

/** Huecos de habilidad de una subclase, en el orden en que se muestran. */
const SLOTS: { key: string; slot: string; kind: string }[] = [
  { key: 'hap1', slot: 'HAP1', kind: 'Habilidad principal' },
  { key: 'hap2', slot: 'HAP2', kind: 'Habilidad principal' },
  { key: 'hap3', slot: 'HAP3', kind: 'Habilidad principal' },
  { key: 'has1', slot: 'HAS1', kind: 'Habilidad secundaria' },
  { key: 'hap4', slot: 'HAP4', kind: 'Reacción' },
  { key: 'has2', slot: 'HAS2', kind: 'Reacción' },
  { key: 'had', slot: 'HAD', kind: 'Definitiva' },
];

function weapon(arma: AppArma, slot: 'Principal' | 'Secundaria'): WeaponInfo {
  return {
    name: arma.nombre,
    type: arma.tipo,
    die: arma.dado,
    attacks: arma.ataques,
    modifier: arma.modificador,
    twoHanded: arma.dosManos,
    slot,
    properties: arma.propiedades ?? [],
  };
}

function abilities(sub: AppSubclase): AbilityInfo[] {
  const text = (key: string) => (typeof sub[key] === 'string' && sub[key] ? (sub[key] as string) : null);
  const props = (key: string) => (Array.isArray(sub[key]) ? (sub[key] as string[]) : []);
  return SLOTS.filter((s) => text(s.key)).map((s) => {
    const improved = text(`${s.key}Mejorada`);
    return {
      key: s.key,
      slot: s.slot,
      kind: s.kind,
      name: text(`${s.key}Nombre`) ?? s.slot,
      ...splitAbility(text(s.key)!),
      improved: improved ? splitAbility(improved) : null,
      properties: props(`${s.key}Props`),
      improvedProperties: props(`${s.key}MejoradaProps`),
    };
  });
}

function subclass(classId: string, sub: AppSubclase): Subclass {
  const id = slugify(sub.nombre);
  const extras = CLASS_EXTRAS[classId]?.subclasses[id];
  const main = sub.armas.armaPrincipal;
  const off = sub.armas.armaSecundaria;
  return {
    id,
    name: sub.nombre,
    icon: extras?.icon ?? '⚔️',
    description: extras?.description ?? '',
    weapons: off ? `${main.nombre} + ${off.nombre} (1 mano cada)` : `${main.nombre} (2 manos)`,
    weaponType: off ? '1-mano' : '2-manos',
    weaponList: off ? [weapon(main, 'Principal'), weapon(off, 'Secundaria')] : [weapon(main, 'Principal')],
    abilities: abilities(sub),
  };
}

export const CLASSES: GameClass[] = (appClasses as unknown as AppClase[]).map((c) => {
  const id = slugify(c.nombre);
  const extras = CLASS_EXTRAS[id];
  return {
    id,
    name: c.nombre,
    role: extras?.role ?? c.rol,
    type: c.esMagica ? 'magic' : 'martial',
    resource: c.esMagica ? 'Maná' : 'Energía',
    resourceIcon: c.esMagica ? '💧' : '⚡',
    pv: c.pv,
    shieldBase: c.escudo,
    ph: c.ph,
    passive: c.pasiva,
    passiveName: extras?.passiveName ?? 'Pasiva',
    masteryPassive: c.maestria.descripcion,
    masteryPassiveName: c.maestria.nombre,
    hb1: c.hb1,
    hb1Name: c.hb1Nombre ?? 'HB1',
    hb2: c.hb2,
    hb2Name: c.hb2Nombre ?? 'HB2',
    description: extras?.description ?? c.definicion,
    lore: extras?.lore ?? '',
    icon: extras?.icon ?? '⚔️',
    color: extras?.color ?? '#a78bfa',
    subclasses: c.subclases.map((s) => subclass(id, s)),
    preset: c.preparado
      ? {
          name: c.preparado.nombre,
          subclass: c.preparado.subclase,
          race: c.preparado.subraza ? `${c.preparado.raza} (${c.preparado.subraza})` : c.preparado.raza,
          description: c.preparado.descripcion,
          avatar: gameImage(c.preparado.avatar)!,
          strengths: c.preparado.puntosFuertes,
        }
      : null,
  };
});
