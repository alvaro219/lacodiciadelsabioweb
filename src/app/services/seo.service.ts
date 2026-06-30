import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

const SITE_NAME = 'La Codicia del Sabio';
const BASE_URL = 'https://alvaro219.github.io/lacodiciadelsabioweb';
const DEFAULT_IMAGE = `${BASE_URL}/assets/icons/icon-512.png`;

@Injectable({ providedIn: 'root' })
export class SeoService {
  constructor(private title: Title, private meta: Meta) {}

  setDefault() {
    this.set({
      title: `${SITE_NAME} — Sistema de Rol de Mesa`,
      description: 'La Codicia del Sabio es un sistema de rol de mesa con 9 clases, 29 subclases y 10 razas. Explora mecánicas únicas, novedades y la comunidad.',
      url: BASE_URL,
      image: DEFAULT_IMAGE
    });
  }

  setNovedad(opts: { title: string; description: string; image?: string | null; slug: string }) {
    const url = `${BASE_URL}/novedades/${opts.slug}`;
    this.set({
      title: `${opts.title} — ${SITE_NAME}`,
      description: opts.description.slice(0, 155),
      url,
      image: opts.image ?? DEFAULT_IMAGE
    });
  }

  setNovedadesIndex() {
    this.set({
      title: `Novedades — ${SITE_NAME}`,
      description: 'Últimas noticias, actualizaciones y anuncios sobre La Codicia del Sabio, el sistema de rol de mesa.',
      url: `${BASE_URL}/novedades`,
      image: DEFAULT_IMAGE
    });
  }

  private set(opts: { title: string; description: string; url: string; image: string }) {
    this.title.setTitle(opts.title);

    const tags: { name?: string; property?: string; content: string }[] = [
      { name: 'description',          content: opts.description },
      { property: 'og:title',         content: opts.title },
      { property: 'og:description',   content: opts.description },
      { property: 'og:url',           content: opts.url },
      { property: 'og:image',         content: opts.image },
      { property: 'og:type',          content: 'website' },
      { property: 'og:site_name',     content: SITE_NAME },
      { name: 'twitter:card',         content: 'summary_large_image' },
      { name: 'twitter:title',        content: opts.title },
      { name: 'twitter:description',  content: opts.description },
      { name: 'twitter:image',        content: opts.image },
    ];

    for (const tag of tags) {
      if (tag.name) {
        this.meta.updateTag({ name: tag.name, content: tag.content });
      } else if (tag.property) {
        this.meta.updateTag({ property: tag.property, content: tag.content });
      }
    }
  }
}
