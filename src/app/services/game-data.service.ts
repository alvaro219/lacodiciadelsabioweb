import { Injectable } from '@angular/core';
import { RACES } from '../data/races.data';
import { CLASSES } from '../data/classes.data';
import { Race } from '../models/race.model';
import { GameClass, Subclass } from '../models/class.model';

@Injectable({
  providedIn: 'root'
})
export class GameDataService {

  getRaces(): Race[] {
    return RACES;
  }

  getRaceById(id: string): Race | undefined {
    return RACES.find(r => r.id === id);
  }

  getClasses(): GameClass[] {
    return CLASSES;
  }

  getClassById(id: string): GameClass | undefined {
    return CLASSES.find(c => c.id === id);
  }

  getSubclassById(classId: string, subclassId: string): Subclass | undefined {
    const gameClass = this.getClassById(classId);
    return gameClass?.subclasses.find(s => s.id === subclassId);
  }

  getMartialClasses(): GameClass[] {
    return CLASSES.filter(c => c.type === 'martial');
  }

  getMagicClasses(): GameClass[] {
    return CLASSES.filter(c => c.type === 'magic');
  }
}
