import type { Block } from '../lib/types';
import { HeroMultimedia } from './hero-multimedia';

export function PageRenderer({ blocks, preview = false }: { blocks: Block[]; preview?: boolean }) {
  return (
    <div className={preview ? 'page-preview' : 'site-page'}>
      {blocks.filter((block) => !block.hidden).map((block) => {
        switch (block.type) {
          case 'heroMultimedia':
            return <HeroMultimedia key={block.id} slides={block.slides ?? []} />;
          case 'solutionGrid':
            return <CardSection key={block.id} eyebrow="01 · ENCUENTRA TU RUTA" title={block.title ?? ''} description={block.description} items={block.items ?? []} />;
          case 'brandGrid':
            return <CardSection key={block.id} eyebrow="FABRICANTES" title={block.title ?? ''} items={block.items ?? []} compact />;
          case 'serviceHighlight':
            return <section key={block.id} className="section section--dark"><div className="container split-callout"><div><p className="eyebrow">SERVICIO TÉCNICO OPIMED</p><h2>{block.title}</h2><p>{block.description}</p></div><div><button className="button button--primary" type="button">{block.ctaLabel ?? 'Conocer servicio'}</button></div></div></section>;
          case 'newsGrid':
            return <CardSection key={block.id} eyebrow="NOVEDADES" title={block.title ?? ''} items={block.items ?? []} compact />;
          case 'cta':
            return <section key={block.id} className="section cta"><div className="container cta-inner"><div><p className="eyebrow">CONTACTO</p><h2>{block.title}</h2><p>{block.description}</p></div><button className="button button--primary" type="button">{block.ctaLabel ?? 'Contactar'}</button></div></section>;
          default:
            return null;
        }
      })}
    </div>
  );
}

function CardSection({ eyebrow, title, description, items, compact = false }: { eyebrow: string; title: string; description?: string; items: { title: string; text: string; eyebrow?: string }[]; compact?: boolean }) {
  return (
    <section className={`section ${compact ? 'section--compact' : ''}`}>
      <div className="container">
        <div className="section-head">
          <div><p className="eyebrow">{eyebrow}</p><h2>{title}</h2></div>
          {description ? <p>{description}</p> : null}
        </div>
        <div className="card-grid">
          {items.map((item) => <article className="content-card" key={`${item.title}-${item.text}`}><span className="card-number">{item.eyebrow ?? '→'}</span><h3>{item.title}</h3><p>{item.text}</p><a href="#">Explorar <span aria-hidden="true">↗</span></a></article>)}
        </div>
      </div>
    </section>
  );
}
