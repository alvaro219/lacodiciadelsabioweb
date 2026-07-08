import { Component, EventEmitter, Input, OnInit, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SocialService } from '../../services/social.service';
import { CreationType } from '../../models/social.model';

const ATTRS = ['FUE','DES','CON','INT','PER','CAR'];
const DADOS = [4,6,8,10,12];
const MODS  = ['Fuerza','Destreza','Inteligencia','Percepción','Constitución','Carisma'];

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

  // ── Constantes de UI ──────────────────────────────────────
  readonly ATTRS  = ATTRS;
  readonly DADOS  = DADOS;
  readonly MODS   = MODS;
  readonly RAZAS_PADRE = ['Humano','Elfo','Enano','Aasimar','Orco','Mediano','Lagarliz','Bestani','Omnimek','Lazuri'];
  readonly CLASES_PADRE = ['Escaramuzador','Luchador','Protector','Artillero','Controlador','Invocador','Velador','Exaltador','Místico'];
  readonly RAREZAS: Array<'Común'|'Raro'|'Épico'|'Legendario'> = ['Común','Raro','Épico','Legendario'];
  readonly TAMANYOS: Array<'pequeño'|'mediano'|'grande'> = ['pequeño','mediano','grande'];
  readonly VELOCIDADES = [25, 30, 35];

  readonly tiposCreacion = [
    { value: 'clase'     as CreationType, icon: '🎯', label: 'Clase',     desc: 'Una clase base completamente nueva' },
    { value: 'subclase'  as CreationType, icon: '⚡', label: 'Subclase',  desc: 'Especialización para una clase existente' },
    { value: 'raza'      as CreationType, icon: '🌍', label: 'Raza',      desc: 'Una nueva raza jugable' },
    { value: 'subraza'   as CreationType, icon: '🧬', label: 'Subraza',   desc: 'Variante de una raza existente' },
    { value: 'accesorio' as CreationType, icon: '💍', label: 'Accesorio', desc: 'Anillo, amuleto, capa u objeto equipable' }
  ];

  // ── Pasos por tipo ────────────────────────────────────────
  readonly pasosPorTipo: Record<CreationType, string[]> = {
    raza:      ['Info Básica','Características','Modificadores','Vista previa'],
    subraza:   ['Raza Padre','Info Básica','Modificadores','Override','Vista previa'],
    clase:     ['Info Básica','Estadísticas','Tipo de Recurso','Habilidades','Vista previa'],
    subclase:  ['Clase Padre','Configuración de Armas','Arma Principal','Arma Secundaria','Habilidades','Vista previa'],
    accesorio: ['Info Básica','Rareza','Vista previa']
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
    return '';
  }

  get previewDesc(): string {
    const t = this.tipo();
    if (t === 'raza')      return this.rDefinicion();
    if (t === 'subraza')   return this.srDefinicion();
    if (t === 'clase')     return this.clDefinicion();
    if (t === 'subclase')  return '';
    if (t === 'accesorio') return this.acDescripcion();
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
    return {};
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
