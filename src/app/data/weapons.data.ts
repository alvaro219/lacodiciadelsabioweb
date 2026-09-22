// Armas de la web: las de las subclases de la app (game/classes.json), con
// sus propiedades de arma (game/properties.json) y su dibujo (game/weapons.json).
// Se actualizan con `npm run sync-app`.

import appWeaponImages from './game/weapons.json';
import { Weapon, WeaponAbility } from '../models/weapon.model';
import { CLASSES } from './classes.data';
import { WEAPON_PROPERTIES } from './properties.data';
import { dieLabel, gameImage } from '../utils/game.utils';

const images = appWeaponImages as Record<string, string | null>;

/** Nombre visible de una propiedad de arma a partir de su clave. */
export function weaponPropertyName(key: string): string {
  return WEAPON_PROPERTIES[key]?.nombre ?? key;
}

export const WEAPON_ABILITIES: WeaponAbility[] = Object.values(WEAPON_PROPERTIES).map((p) => ({
  name: p.nombre,
  description: p.descripcion,
}));

function buildWeapons(): Weapon[] {
  const byKey = new Map<string, Weapon>();
  for (const cls of CLASSES) {
    for (const sub of cls.subclasses) {
      for (const w of sub.weaponList) {
        const abilities = w.properties.map(weaponPropertyName);
        // Un mismo arma puede ser distinta como principal o como secundaria. Si
        // solo cambia el atributo que suma, es la misma arma (ver usersByModifier).
        const key = [w.name, w.slot, w.die, w.attacks, abilities.join(',')].join('|');
        let weapon = byKey.get(key);
        if (!weapon) {
          weapon = {
            name: w.name,
            damage: dieLabel(w.die, w.attacks),
            modifier: w.modifier,
            hands: w.twoHanded ? 'A dos manos' : 'A una mano',
            slot: w.slot,
            abilities,
            usedBy: [],
            usersByModifier: [],
            image: gameImage(images[w.type]),
          };
          byKey.set(key, weapon);
        }
        const user = { classId: cls.id, className: cls.name, subclassId: sub.id, subclassName: sub.name, modifier: w.modifier };
        weapon.usedBy.push(user);
        const group = weapon.usersByModifier.find((g) => g.modifier === w.modifier);
        if (group) group.users.push(user);
        else weapon.usersByModifier.push({ modifier: w.modifier, users: [user] });
      }
    }
  }
  const weapons = [...byKey.values()];
  for (const weapon of weapons) weapon.modifier = weapon.usersByModifier.map((g) => g.modifier).join(' o ');
  return weapons;
}

export const WEAPONS: Weapon[] = buildWeapons();
