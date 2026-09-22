import { Component, EventEmitter, Input, OnInit, Output, WritableSignal, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocialService } from '../../services/social.service';
import { CreationType } from '../../models/social.model';
import { MAGIC_CLASSES, MARTIAL_CLASSES, RACE_ITEMS } from '../../data/catalog.data';

const ATTRS = ['FUE','DES','CON','INT','PER','CAR'];
const DADOS = [4,6,8,10,12];
const MODS  = ['Fuerza','Destreza','Inteligencia','Percepción','Constitución','Carisma'];

// Partes de una campaña, con el mismo formato que las campañas de la app
// (UserCampaign en lib/models/user_campaign_data.dart): así se pueden
// descargar desde la Comunidad de la app y jugarlas.
interface CampaignSectionForm { id: string; title: string; content: string; }
interface CampaignEncounterForm {
  id: string; name: string; location: string; description: string;
  objectives: string; rewards: string; enemies: string; allies: string;
}
interface CampaignNpcForm { id: string; name: string; role: string; description: string; notes: string; }

/** Identificador como los de la app: milisegundos y un número al azar. */
const newId = () => `${Date.now()}_${Math.floor(Math.random() * 10000)}`;
const splitNames = (text: string) => text.split(',').map(t => t.trim()).filter(Boolean);

@Component({
  selector: 'app-creacion-form',
  imports: [FormsModule],
  templateUrl: './creacion-form.html',
  styleUrl: './creacion-form.scss'
})
export class CreacionForm implements OnInit {
  @Input() editPost: import('../../models/social.model').SocialPost | null = null;
  @Output() closed    = new EventEmitter<void>();
  @Output() published = new EventEmitter<void>();

  // ── UI state ──────────────────────────────────────────────
  protected readonly tipo      = signal<CreationType | ''>('');
  protected readonly paso      = signal(0);          // step index dentro del tipo
  protected readonly saving    = signal(false);
  protected readonly uploading = signal(false);
  protected readonly error     = signal('');

  // ── Imagen / tags comunes ─────────────────────────────────
  protected readonly imageUrl = signal('');
  protected readonly tags     = signal('');

  // ══════════════════════════════════════════════════════════
  // RAZA — pasos 1-4
  // ══════════════════════════════════════════════════════════
  protected readonly rNombre   = signal('');
  protected readonly rDefinicion = signal('');
  protected readonly rPasiva   = signal('');
  protected readonly rTamanyo  = signal<'pequeño'|'mediano'|'grande'>('mediano');
  protected readonly rVelocidad = signal(30);
  protected readonly rBono     = signal('');
  protected readonly rPena     = signal('');

  // ══════════════════════════════════════════════════════════
  // SUBRAZA — pasos 1-4
  // ══════════════════════════════════════════════════════════
  protected readonly srRazaPadre   = signal('');
  protected readonly srNombre      = signal('');
  protected readonly srDefinicion  = signal('');
  protected readonly srPasiva      = signal('');
  protected readonly srBono        = signal('');
  protected readonly srPena        = signal('');
  protected readonly srVelOverride = signal<number|null>(null);
  protected readonly srTamOverride = signal<string|null>(null);

  // ══════════════════════════════════════════════════════════
  // CLASE — pasos 1-4
  // ══════════════════════════════════════════════════════════
  protected readonly clNombre    = signal('');
  protected readonly clRol       = signal('');
  protected readonly clDefinicion = signal('');
  protected readonly clPv        = signal(2);
  protected readonly clEscudo    = signal(2);
  protected readonly clPh        = signal(5);
  protected readonly clEsMagica  = signal(false);
  protected readonly clPasiva    = signal('');
  protected readonly clHb1Nombre = signal('');
  protected readonly clHb1Desc   = signal('');
  protected readonly clHb2Nombre = signal('');
  protected readonly clHb2Desc   = signal('');

  // ══════════════════════════════════════════════════════════
  // SUBCLASE — pasos 1-4
  // ══════════════════════════════════════════════════════════
  protected readonly scClasePadre  = signal('');
  protected readonly scDosManos    = signal(true);
  // Arma principal
  protected readonly scAp_tipo     = signal('Espada');
  protected readonly scAp_nombre   = signal('Espada larga');
  protected readonly scAp_dado     = signal(8);
  protected readonly scAp_ataques  = signal(1);
  protected readonly scAp_mod      = signal('Fuerza');
  // Arma secundaria (1 mano)
  protected readonly scAs_tipo     = signal('Daga');
  protected readonly scAs_nombre   = signal('Daga corta');
  protected readonly scAs_dado     = signal(4);
  protected readonly scAs_ataques  = signal(1);
  protected readonly scAs_mod      = signal('Destreza');
  // Habilidades
  protected readonly scHap1Nombre  = signal('');
  protected readonly scHap1Desc    = signal('');
  protected readonly scHap1Coste   = signal(1);
  protected readonly scHap1Acc     = signal(1);
  protected readonly scHap2Nombre  = signal('');
  protected readonly scHap2Desc    = signal('');
  protected readonly scHap2Coste   = signal(1);
  protected readonly scHap2Acc     = signal(1);
  protected readonly scHap3Nombre  = signal('');  // solo 2 manos
  protected readonly scHap3Desc    = signal('');
  protected readonly scHap3Coste   = signal(1);
  protected readonly scHap3Acc     = signal(1);
  protected readonly scHap4Nombre  = signal('');  // reacción 2 manos
  protected readonly scHap4Desc    = signal('');
  protected readonly scHas1Nombre  = signal('');  // solo 1 mano
  protected readonly scHas1Desc    = signal('');
  protected readonly scHas1Coste   = signal(1);
  protected readonly scHas1Acc     = signal(1);
  protected readonly scHas2Nombre  = signal('');  // reacción 1 mano
  protected readonly scHas2Desc    = signal('');
  protected readonly scHadNombre   = signal('');
  protected readonly scHadDesc     = signal('');

  // ══════════════════════════════════════════════════════════
  // ACCESORIO — pasos 1-2
  // ══════════════════════════════════════════════════════════
  protected readonly acNombre      = signal('');
  protected readonly acDescripcion = signal('');
  protected readonly acPrecio      = signal(0);
  protected readonly acRareza      = signal<'Común'|'Raro'|'Épico'|'Legendario'>('Común');

  // ══════════════════════════════════════════════════════════
  // CAMPAÑA — pasos 1-6
  // ══════════════════════════════════════════════════════════
  protected readonly caNombre       = signal('');
  protected readonly caResumen      = signal('');   // shortDescription
  protected readonly caJugadores    = signal(4);
  protected readonly caSesiones     = signal(1);
  protected readonly caSinopsis     = signal('');   // fullDescription
  protected readonly caAmbientacion = signal('');   // setting
  protected readonly caTono         = signal('');   // toneAndStyle
  protected readonly caNotas        = signal('');   // notes
  protected readonly caSecciones    = signal<CampaignSectionForm[]>([{ id: newId(), title: '', content: '' }]);
  protected readonly caEncuentros   = signal<CampaignEncounterForm[]>([]);
  protected readonly caPnjs         = signal<CampaignNpcForm[]>([]);
  protected readonly caFinales      = signal<{ id: string; text: string }[]>([]);
  /** Id y fecha de creación de la campaña que se edita: se conservan al guardar. */
  private caId = '';
  private caCreada = '';

  // ── Constantes de UI ──────────────────────────────────────
  readonly ATTRS  = ATTRS;
  readonly DADOS  = DADOS;
  readonly MODS   = MODS;
  // Las del juego, al día con la app (data/game/catalog.json).
  readonly RAZAS_PADRE = RACE_ITEMS.map(r => r.name);
  readonly CLASES_PADRE = [...MARTIAL_CLASSES, ...MAGIC_CLASSES].map(c => c.name);
  readonly RAREZAS: Array<'Común'|'Raro'|'Épico'|'Legendario'> = ['Común','Raro','Épico','Legendario'];
  readonly TAMANYOS: Array<'pequeño'|'mediano'|'grande'> = ['pequeño','mediano','grande'];
  readonly VELOCIDADES = [25, 30, 35];

  readonly tiposCreacion = [
    { value: 'clase'     as CreationType, icon: '🎯', label: 'Clase',     desc: 'Una clase base completamente nueva' },
    { value: 'subclase'  as CreationType, icon: '⚡', label: 'Subclase',  desc: 'Especialización para una clase existente' },
    { value: 'raza'      as CreationType, icon: '🌍', label: 'Raza',      desc: 'Una nueva raza jugable' },
    { value: 'subraza'   as CreationType, icon: '🧬', label: 'Subraza',   desc: 'Variante de una raza existente' },
    { value: 'accesorio' as CreationType, icon: '💍', label: 'Accesorio', desc: 'Anillo, amuleto, capa u objeto equipable' },
    { value: 'campana'   as CreationType, icon: '📜', label: 'Campaña',   desc: 'Una aventura con su historia, encuentros y PNJs' }
  ];

  // ── Pasos por tipo ────────────────────────────────────────
  readonly pasosPorTipo: Record<CreationType, string[]> = {
    raza:      ['Info Básica','Características','Modificadores','Vista previa'],
    subraza:   ['Raza Padre','Info Básica','Modificadores','Override','Vista previa'],
    clase:     ['Info Básica','Estadísticas','Tipo de Recurso','Habilidades','Vista previa'],
    subclase:  ['Clase Padre','Configuración de Armas','Arma Principal','Arma Secundaria','Habilidades','Vista previa'],
    accesorio: ['Info Básica','Rareza','Vista previa'],
    campana:   ['Info Básica','Ambientación','Historia','Encuentros','PNJs y finales','Vista previa']
  };

  get steps(): string[] {
    return this.tipo() ? this.pasosPorTipo[this.tipo() as CreationType] : [];
  }

  get isLastStep(): boolean { return this.paso() === this.steps.length - 1; }
  get isPreview():  boolean { return this.paso() === this.steps.length - 1; }

  // ── Navegación ────────────────────────────────────────────
  selectTipo(t: CreationType) { this.tipo.set(t); this.paso.set(0); this.error.set(''); }
  resetTipo() { this.tipo.set(''); this.paso.set(0); this.error.set(''); }

  next() {
    const err = this.validateCurrentStep();
    if (err) { this.error.set(err); return; }
    this.error.set('');
    // Subclase de 2 manos: saltar paso Arma Secundaria (paso 3)
    if (this.tipo() === 'subclase' && this.scDosManos() && this.paso() === 2) {
      this.paso.set(4); return;
    }
    this.paso.update(p => p + 1);
  }

  back() {
    this.error.set('');
    if (this.paso() === 0) { this.resetTipo(); return; }
    if (this.tipo() === 'subclase' && this.scDosManos() && this.paso() === 4) {
      this.paso.set(2); return;
    }
    this.paso.update(p => p - 1);
  }

  // ── Validación por paso ───────────────────────────────────
  validateCurrentStep(): string {
    const t = this.tipo() as CreationType;
    const p = this.paso();
    if (t === 'raza') {
      if (p === 0 && (!this.rNombre().trim() || !this.rDefinicion().trim() || !this.rPasiva().trim()))
        return 'Nombre, definición y pasiva son obligatorios.';
      if (p === 2 && this.rBono() && this.rPena() && this.rBono() === this.rPena())
        return 'La bonificación y penalización no pueden ser el mismo atributo.';
    }
    if (t === 'subraza') {
      if (p === 0 && !this.srRazaPadre()) return 'Selecciona una raza padre.';
      if (p === 1 && (!this.srNombre().trim() || !this.srDefinicion().trim() || !this.srPasiva().trim()))
        return 'Nombre, definición y pasiva son obligatorios.';
      if (p === 2 && this.srBono() && this.srPena() && this.srBono() === this.srPena())
        return 'La bonificación y penalización no pueden ser el mismo atributo.';
    }
    if (t === 'clase') {
      if (p === 0 && (!this.clNombre().trim() || !this.clRol().trim() || !this.clDefinicion().trim()))
        return 'Nombre, rol y definición son obligatorios.';
      if (p === 1 && (this.clPv() < 1 || this.clPv() > 3 || this.clEscudo() < 1 || this.clEscudo() > 3 || this.clPh() < 3 || this.clPh() > 7))
        return 'PV y Escudo deben estar entre 1-3. PH entre 3-7.';
    }
    if (t === 'subclase') {
      if (p === 0 && !this.scClasePadre()) return 'Selecciona una clase padre.';
      if (p === 2 && (!this.scAp_tipo().trim() || !this.scAp_nombre().trim()))
        return 'Tipo y nombre del arma principal son obligatorios.';
    }
    if (t === 'campana') {
      if (p === 0 && (!this.caNombre().trim() || !this.caResumen().trim()))
        return 'El nombre y el resumen son obligatorios.';
      if (p === 0 && (this.caJugadores() < 1 || this.caJugadores() > 10 || this.caSesiones() < 1 || this.caSesiones() > 100))
        return 'Jugadores entre 1 y 10; sesiones entre 1 y 100.';
      if (p === 2 && !this.caSecciones().some(x => x.title.trim()))
        return 'Añade al menos una sección de la historia con su título.';
      if (p === 2 && this.caSecciones().some(x => !x.title.trim() && x.content.trim()))
        return 'Cada sección necesita un título.';
      if (p === 3 && this.caEncuentros().some(x => !x.name.trim() && (x.location.trim() || x.description.trim() || x.enemies.trim())))
        return 'Cada encuentro necesita un nombre.';
      if (p === 4 && this.caPnjs().some(x => !x.name.trim() && (x.role.trim() || x.description.trim())))
        return 'Cada PNJ necesita un nombre.';
    }
    if (t === 'accesorio') {
      if (p === 0 && (!this.acNombre().trim() || !this.acDescripcion().trim()))
        return 'Nombre y descripción son obligatorios.';
      if (p === 0 && this.acPrecio() < 0) return 'El precio no puede ser negativo.';
    }
    return '';
  }

  // ── Imagen ────────────────────────────────────────────────
  async onImageFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.uploading.set(true);
    try { this.imageUrl.set(await this.social.uploadImage(file)); }
    catch { this.error.set('Error al subir imagen.'); }
    finally { this.uploading.set(false); }
  }

  // ── Preview helpers ───────────────────────────────────────
  get previewTitle(): string {
    const t = this.tipo();
    if (t === 'raza')      return this.rNombre();
    if (t === 'subraza')   return this.srNombre();
    if (t === 'clase')     return this.clNombre();
    if (t === 'subclase')  return this.scClasePadre() ? `${this.tipo()} de ${this.scClasePadre()}` : '';
    if (t === 'accesorio') return this.acNombre();
    if (t === 'campana')   return this.caNombre().trim();
    return '';
  }

  get previewDesc(): string {
    const t = this.tipo();
    if (t === 'raza')      return this.rDefinicion();
    if (t === 'subraza')   return this.srDefinicion();
    if (t === 'clase')     return this.clDefinicion();
    if (t === 'subclase')  return '';
    if (t === 'accesorio') return this.acDescripcion();
    if (t === 'campana')   return this.caResumen().trim();
    return '';
  }

  rarityColor(): string {
    const map: Record<string,string> = { Común:'#9ca3af', Raro:'#3b82f6', Épico:'#8b5cf6', Legendario:'#f59e0b' };
    return map[this.acRareza()] ?? '#9ca3af';
  }

  // ── Publicar ──────────────────────────────────────────────
  private buildData(): Record<string, unknown> {
    const t = this.tipo() as CreationType;
    if (t === 'raza') return {
      nombre: this.rNombre(), definicion: this.rDefinicion(), pasiva: this.rPasiva(),
      tamano: this.rTamanyo(), velocidad: this.rVelocidad(),
      rasgos: [this.rBono() ? `+1 ${this.rBono()}` : null, this.rPena() ? `-1 ${this.rPena()}` : null].filter(Boolean)
    };
    if (t === 'subraza') return {
      nombre: this.srNombre(), definicion: this.srDefinicion(), pasiva: this.srPasiva(),
      razaPadre: this.srRazaPadre(),
      rasgos: [this.srBono() ? `+1 ${this.srBono()}` : null, this.srPena() ? `-1 ${this.srPena()}` : null].filter(Boolean),
      velocidadOverride: this.srVelOverride(), tamanoOverride: this.srTamOverride()
    };
    if (t === 'clase') return {
      nombre: this.clNombre(), rol: this.clRol(), definicion: this.clDefinicion(),
      pv: this.clPv(), escudo: this.clEscudo(), ph: this.clPh(),
      esMagica: this.clEsMagica(), pasiva: this.clPasiva(),
      hb1Nombre: this.clHb1Nombre(), hb1: this.clHb1Desc(),
      hb2Nombre: this.clHb2Nombre(), hb2: this.clHb2Desc()
    };
    if (t === 'subclase') {
      const habs: Record<string,unknown> = {
        hap1: { nombre: this.scHap1Nombre(), descripcion: this.scHap1Desc(), coste: this.scHap1Coste(), acciones: this.scHap1Acc() },
        hap2: { nombre: this.scHap2Nombre(), descripcion: this.scHap2Desc(), coste: this.scHap2Coste(), acciones: this.scHap2Acc() },
        had:  { nombre: this.scHadNombre(),  descripcion: this.scHadDesc() }
      };
      if (this.scDosManos()) {
        habs['hap3'] = { nombre: this.scHap3Nombre(), descripcion: this.scHap3Desc(), coste: this.scHap3Coste(), acciones: this.scHap3Acc() };
        habs['hap4'] = { nombre: this.scHap4Nombre(), descripcion: this.scHap4Desc(), esReaccion: true };
      } else {
        habs['has1'] = { nombre: this.scHas1Nombre(), descripcion: this.scHas1Desc(), coste: this.scHas1Coste(), acciones: this.scHas1Acc() };
        habs['has2'] = { nombre: this.scHas2Nombre(), descripcion: this.scHas2Desc(), esReaccion: true };
      }
      return {
        clasePadre: this.scClasePadre(), usaDosManos: this.scDosManos(),
        armaPrincipal: { tipo: this.scAp_tipo(), nombre: this.scAp_nombre(), dado: this.scAp_dado(), ataques: this.scAp_ataques(), modificador: this.scAp_mod(), dosManos: this.scDosManos() },
        armaSecundaria: this.scDosManos() ? null : { tipo: this.scAs_tipo(), nombre: this.scAs_nombre(), dado: this.scAs_dado(), ataques: this.scAs_ataques(), modificador: this.scAs_mod() },
        habilidades: habs
      };
    }
    if (t === 'accesorio') return {
      nombre: this.acNombre(), descripcion: this.acDescripcion(),
      rareza: this.acRareza().toLowerCase(), precio: this.acPrecio()
    };
    if (t === 'campana') {
      const now = new Date().toISOString();
      return {
        id: this.caId || Date.now().toString(),
        name: this.caNombre().trim(),
        shortDescription: this.caResumen().trim(),
        fullDescription: this.caSinopsis().trim(),
        setting: this.caAmbientacion().trim(),
        toneAndStyle: this.caTono().trim(),
        notes: this.caNotas().trim(),
        recommendedPlayers: Math.round(+this.caJugadores()),
        estimatedSessions: Math.round(+this.caSesiones()),
        tags: this.tags().split(',').map(x => x.trim()).filter(Boolean),
        sections: this.caSecciones().filter(x => x.title.trim())
          .map((x, order) => ({ id: x.id, title: x.title.trim(), content: x.content.trim(), order })),
        encounters: this.caEncuentros().filter(x => x.name.trim())
          .map((x, order) => ({
            id: x.id, name: x.name.trim(), location: x.location.trim(), description: x.description.trim(),
            objectives: x.objectives.trim(), rewards: x.rewards.trim(),
            enemyNames: splitNames(x.enemies), allyNames: splitNames(x.allies), order
          })),
        npcs: this.caPnjs().filter(x => x.name.trim())
          .map(x => ({ id: x.id, name: x.name.trim(), role: x.role.trim(), description: x.description.trim(), notes: x.notes.trim() })),
        possibleEndings: this.caFinales().map(x => x.text.trim()).filter(Boolean),
        createdAt: this.caCreada || now,
        updatedAt: now
      };
    }
    return {};
  }

  // ── Listas de la campaña ──────────────────────────────────
  /** Lo que se publicará: sin los elementos que se han dejado vacíos. */
  protected secciones()  { return this.caSecciones().filter(x => x.title.trim()); }
  protected encuentros() { return this.caEncuentros().filter(x => x.name.trim()); }
  protected pnjs()       { return this.caPnjs().filter(x => x.name.trim()); }
  protected finales()    { return this.caFinales().filter(x => x.text.trim()); }

  protected addSeccion()   { this.caSecciones.update(l => [...l, { id: newId(), title: '', content: '' }]); }
  protected addEncuentro() {
    this.caEncuentros.update(l => [...l, { id: newId(), name: '', location: '', description: '', objectives: '', rewards: '', enemies: '', allies: '' }]);
  }
  protected addPnj()       { this.caPnjs.update(l => [...l, { id: newId(), name: '', role: '', description: '', notes: '' }]); }
  protected addFinal()     { this.caFinales.update(l => [...l, { id: newId(), text: '' }]); }

  protected removeAt<T>(list: WritableSignal<T[]>, index: number) {
    list.update(l => l.filter((_, i) => i !== index));
  }

  /** Sube un elemento un puesto: las secciones y los encuentros van en orden. */
  protected moveUp<T>(list: WritableSignal<T[]>, index: number) {
    if (index === 0) return;
    list.update(l => {
      const copy = [...l];
      [copy[index - 1], copy[index]] = [copy[index], copy[index - 1]];
      return copy;
    });
  }

  async publish() {
    if (!this.social.currentUser()) {
      this.error.set('Debes iniciar sesión para publicar. Cierra este formulario, inicia sesión y vuelve a intentarlo.');
      return;
    }
    const err = this.validateCurrentStep();
    if (err) { this.error.set(err); return; }
    if (this.saving()) return;
    this.saving.set(true);
    this.error.set('');
    try {
      const tagList = this.tags().split(',').map(t => t.trim()).filter(Boolean);
      const patch = {
        creation_type: this.tipo() as CreationType,
        title: this.previewTitle,
        description: this.previewDesc,
        image_url: this.imageUrl() || null,
        data: this.buildData(),
        tags: tagList
      };
      if (this.editPost) {
        await this.social.updatePost(this.editPost.id, patch);
      } else {
        await this.social.createPost(patch);
      }
      this.published.emit();
    } catch (e: any) {
      const msg = e?.message === 'NOT_LOGGED_IN'
        ? 'Tu sesión ha expirado. Cierra el formulario, inicia sesión de nuevo y vuelve a intentarlo.'
        : (e?.message ?? 'Error al publicar.');
      this.error.set(msg);
    } finally {
      this.saving.set(false);
    }
  }

  close() { this.closed.emit(); }

  constructor(private social: SocialService) {}

  ngOnInit() {
    const p = this.editPost;
    if (!p) return;
    const d = (p.data ?? {}) as Record<string, any>;
    this.tipo.set(p.creation_type);
    this.tags.set((p.tags ?? []).join(', '));
    this.imageUrl.set(p.image_url ?? '');
    // Jump straight to preview (last step)
    const steps = this.pasosPorTipo[p.creation_type];
    this.paso.set(steps.length - 1);

    if (p.creation_type === 'accesorio') {
      this.acNombre.set(d['nombre'] ?? p.title);
      this.acDescripcion.set(d['descripcion'] ?? p.description ?? '');
      this.acPrecio.set(d['precio'] ?? 0);
      const r = (d['rareza'] ?? 'Común') as string;
      this.acRareza.set((r[0].toUpperCase() + r.slice(1)) as any);
    }
    if (p.creation_type === 'raza') {
      this.rNombre.set(d['nombre'] ?? p.title);
      this.rDefinicion.set(d['definicion'] ?? p.description ?? '');
      this.rPasiva.set(d['pasiva'] ?? '');
      this.rTamanyo.set(d['tamano'] ?? 'mediano');
      this.rVelocidad.set(d['velocidad'] ?? 30);
    }
    if (p.creation_type === 'subraza') {
      this.srNombre.set(d['nombre'] ?? p.title);
      this.srDefinicion.set(d['definicion'] ?? p.description ?? '');
      this.srPasiva.set(d['pasiva'] ?? '');
      this.srRazaPadre.set(d['razaPadre'] ?? '');
    }
    if (p.creation_type === 'clase') {
      this.clNombre.set(d['nombre'] ?? p.title);
      this.clRol.set(d['rol'] ?? '');
      this.clDefinicion.set(d['definicion'] ?? p.description ?? '');
      this.clPv.set(d['pv'] ?? 2);
      this.clEscudo.set(d['escudo'] ?? 2);
      this.clPh.set(d['ph'] ?? 5);
      this.clEsMagica.set(d['esMagica'] ?? false);
      this.clPasiva.set(d['pasiva'] ?? '');
    }
    if (p.creation_type === 'campana') {
      this.caId = d['id'] ?? '';
      this.caCreada = d['createdAt'] ?? '';
      this.caNombre.set(d['name'] ?? p.title);
      this.caResumen.set(d['shortDescription'] ?? p.description ?? '');
      this.caJugadores.set(d['recommendedPlayers'] ?? 4);
      this.caSesiones.set(d['estimatedSessions'] ?? 1);
      this.caSinopsis.set(d['fullDescription'] ?? '');
      this.caAmbientacion.set(d['setting'] ?? '');
      this.caTono.set(d['toneAndStyle'] ?? '');
      this.caNotas.set(d['notes'] ?? '');
      this.caSecciones.set(((d['sections'] ?? []) as any[]).map(x => ({ id: x.id ?? newId(), title: x.title ?? '', content: x.content ?? '' })));
      this.caEncuentros.set(((d['encounters'] ?? []) as any[]).map(x => ({
        id: x.id ?? newId(), name: x.name ?? '', location: x.location ?? '', description: x.description ?? '',
        objectives: x.objectives ?? '', rewards: x.rewards ?? '',
        enemies: (x.enemyNames ?? []).join(', '), allies: (x.allyNames ?? []).join(', ')
      })));
      this.caPnjs.set(((d['npcs'] ?? []) as any[]).map(x => ({
        id: x.id ?? newId(), name: x.name ?? '', role: x.role ?? '', description: x.description ?? '', notes: x.notes ?? ''
      })));
      this.caFinales.set(((d['possibleEndings'] ?? []) as string[]).map(text => ({ id: newId(), text })));
    }
    if (p.creation_type === 'subclase') {
      this.scClasePadre.set(d['clasePadre'] ?? '');
      this.scDosManos.set(d['usaDosManos'] ?? true);
      const ap = (d['armaPrincipal'] ?? {}) as any;
      this.scAp_tipo.set(ap['tipo'] ?? 'Espada');
      this.scAp_nombre.set(ap['nombre'] ?? '');
      this.scAp_dado.set(ap['dado'] ?? 8);
      this.scAp_ataques.set(ap['ataques'] ?? 1);
      this.scAp_mod.set(ap['modificador'] ?? 'Fuerza');
    }
  }
}
