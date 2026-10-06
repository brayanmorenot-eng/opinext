'use client';

import { useEffect, useMemo, useState } from 'react';
import { PageRenderer } from '../../components/page-renderer';
import { defaultPage } from '../../lib/defaults';
import { loadPage, resetPage, savePage } from '../../lib/storage';
import type { Block, BlockType, PageDocument } from '../../lib/types';

const blockOptions: { type: BlockType; label: string; description: string }[] = [
  { type: 'heroMultimedia', label: 'Hero multimedia', description: 'Producto, fabricante, video o imagen.' },
  { type: 'solutionGrid', label: 'Grid de soluciones', description: 'Tres caminos principales.' },
  { type: 'brandGrid', label: 'Grid de marcas', description: 'Fabricantes y categorías.' },
  { type: 'serviceHighlight', label: 'Servicio técnico', description: 'Mantenimiento y soporte.' },
  { type: 'newsGrid', label: 'Novedades', description: 'Noticias, eventos y recursos.' },
  { type: 'cta', label: 'Call to action', description: 'Cierre comercial de página.' },
];

export default function StudioPage() {
  const [page, setPage] = useState<PageDocument>(defaultPage);
  const [selectedId, setSelectedId] = useState<string>(defaultPage.blocks[0].id);
  const [history, setHistory] = useState<PageDocument[]>([]);
  const [future, setFuture] = useState<PageDocument[]>([]);
  const [dragId, setDragId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  useEffect(() => { setPage(loadPage()); }, []);

  const selected = useMemo(() => page.blocks.find((b) => b.id === selectedId) ?? page.blocks[0], [page.blocks, selectedId]);

  function commit(next: PageDocument) {
    setHistory((items) => [...items.slice(-29), page]);
    setFuture([]);
    setPage({ ...next, updatedAt: new Date().toISOString(), status: 'draft' });
    setSaved(false);
  }

  function moveBlock(sourceId: string, targetId: string) {
    const sourceIndex = page.blocks.findIndex((b) => b.id === sourceId);
    const targetIndex = page.blocks.findIndex((b) => b.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0 || sourceIndex === targetIndex) return;
    const next = [...page.blocks];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    commit({ ...page, blocks: next });
  }

  function updateBlock(patch: Partial<Block>) {
    commit({ ...page, blocks: page.blocks.map((b) => b.id === selectedId ? { ...b, ...patch } : b) });
  }

  function addBlock(type: BlockType) {
    const template: Block = { id: `${type}-${crypto.randomUUID()}`, type, label: blockOptions.find((option) => option.type === type)?.label ?? type, title: 'Nueva sección', description: 'Edita el contenido desde el panel de propiedades.' };
    if (type === 'heroMultimedia') template.slides = defaultPage.blocks[0].slides;
    if (type === 'solutionGrid' || type === 'brandGrid' || type === 'newsGrid') template.items = [{ title: 'Elemento nuevo', text: 'Describe aquí esta opción.' }];
    const next = { ...page, blocks: [...page.blocks, template] };
    commit(next);
    setSelectedId(template.id);
  }

  function toggleSelectedVisibility() {
    if (!selected) return;
    updateBlock({ hidden: !selected.hidden });
  }

  function duplicateSelected() {
    if (!selected) return;
    const clone: Block = { ...selected, id: `${selected.type}-${crypto.randomUUID()}`, label: `${selected.label} (copia)`, hidden: false, items: selected.items ? selected.items.map((item) => ({ ...item })) : undefined, slides: selected.slides ? selected.slides.map((slide) => ({ ...slide, desktop: { ...slide.desktop }, mobile: { ...slide.mobile } })) : undefined };
    const index = page.blocks.findIndex((b) => b.id === selected.id);
    const nextBlocks = [...page.blocks];
    nextBlocks.splice(index + 1, 0, clone);
    commit({ ...page, blocks: nextBlocks });
    setSelectedId(clone.id);
  }

  function removeSelected() {
    if (!selected) return;
    if (page.blocks.length === 1) return;
    const nextBlocks = page.blocks.filter((b) => b.id !== selected.id);
    commit({ ...page, blocks: nextBlocks });
    setSelectedId(nextBlocks[0].id);
  }

  function undo() {
    const previous = history.at(-1);
    if (!previous) return;
    setFuture((items) => [...items, page]);
    setHistory((items) => items.slice(0, -1));
    setPage(previous);
  }

  function redo() {
    const next = future.at(-1);
    if (!next) return;
    setHistory((items) => [...items, page]);
    setFuture((items) => items.slice(0, -1));
    setPage(next);
  }

  function publish() {
    const next = { ...page, status: 'published' as const, updatedAt: new Date().toISOString() };
    setPage(next);
    savePage(next);
    setSaved(true);
  }

  function saveDraft() {
    savePage(page);
    setSaved(true);
  }

  function restore() {
    resetPage();
    setPage(defaultPage);
    setSelectedId(defaultPage.blocks[0].id);
    setHistory([]); setFuture([]); setSaved(false);
  }

  if (previewMode) {
    return <div className="studio-preview"><div className="studio-preview-bar"><strong>Preview · {page.title}</strong><button className="button button--small button--ghost" onClick={() => setPreviewMode(false)} type="button">Volver al Studio</button></div><PageRenderer blocks={page.blocks} preview /></div>;
  }

  return (
    <main className="studio-shell">
      <header className="studio-topbar">
        <div className="studio-brand"><a className="logo" href="/">OPIMED<span>.</span></a><span className="studio-chip">STUDIO v1</span></div>
        <div className="studio-toolbar"><span className={`status-dot ${saved ? 'is-saved' : ''}`}>{saved ? 'Guardado' : 'Cambios sin guardar'}</span><button onClick={undo} disabled={!history.length} type="button">↶</button><button onClick={redo} disabled={!future.length} type="button">↷</button><button className="button button--small button--ghost" onClick={() => setPreviewMode(true)} type="button">Preview</button><button className="button button--small button--primary" onClick={publish} type="button">Publicar</button></div>
      </header>

      <div className="studio-grid">
        <aside className="studio-sidebar studio-sidebar--left">
          <div className="sidebar-heading"><span>PÁGINAS</span><button type="button" aria-label="Agregar página">+</button></div>
          <button className="page-item is-active" type="button"><span>⌂</span> Inicio <span className="page-item__dot" /></button>
          <div className="sidebar-divider" />
          <div className="sidebar-heading"><span>BLOQUES</span></div>
          <div className="block-palette">{blockOptions.map((option) => <button key={option.type} className="palette-item" onClick={() => addBlock(option.type)} type="button"><span className="palette-item__icon">＋</span><span><strong>{option.label}</strong><small>{option.description}</small></span></button>)}</div>
          <div className="sidebar-bottom"><button onClick={restore} className="text-button" type="button">Restaurar demo</button></div>
        </aside>

        <section className="studio-canvas-wrap">
          <div className="canvas-bar"><div><span>HOME</span><strong>/{page.slug === '/' ? '' : page.slug}</strong></div><span>{page.blocks.length} bloques</span></div>
          <div className="studio-canvas">
            {page.blocks.map((block, index) => <div key={block.id} className={`canvas-block ${selectedId === block.id ? 'is-selected' : ''} ${block.hidden ? 'is-hidden' : ''}`} draggable onDragStart={() => setDragId(block.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => { if (dragId) moveBlock(dragId, block.id); setDragId(null); }} onClick={() => setSelectedId(block.id)}>
              <div className="canvas-block-toolbar"><span>{index + 1}</span><strong>{block.label}</strong><span className="drag-handle">⋮⋮</span></div>
              <div className="canvas-block-body"><MiniBlockPreview block={block} /></div>
            </div>)}
          </div>
        </section>

        <aside className="studio-sidebar studio-sidebar--right">
          <div className="inspector-header"><div><span>PROPIEDADES</span><strong>{selected?.label ?? 'Bloque'}</strong></div><div className="inspector-actions"><button onClick={toggleSelectedVisibility} type="button" aria-label="Ocultar o mostrar bloque">{selected?.hidden ? '◉' : '○'}</button><button onClick={duplicateSelected} type="button" aria-label="Duplicar bloque">⧉</button><button onClick={removeSelected} type="button" aria-label="Eliminar bloque">⌫</button></div></div>
          {selected ? <BlockInspector block={selected} onChange={updateBlock} /> : <div className="empty-inspector">Selecciona un bloque para editarlo.</div>}
        </aside>
      </div>
    </main>
  );
}

function MiniBlockPreview({ block }: { block: Block }) {
  if (block.type === 'heroMultimedia') {
    const slide = block.slides?.[0];
    return <div className="mini-hero"><div><p>{slide?.brand ?? 'MARCA'}</p><h3>{slide?.title ?? 'Título del hero'}</h3><small>{slide?.description}</small></div><div className="mini-hero__visual" /></div>;
  }
  if (block.items) return <div className="mini-section"><p className="eyebrow">{block.type === 'brandGrid' ? 'FABRICANTES' : 'SECCIÓN'}</p><h3>{block.title}</h3><div className="mini-cards">{block.items.slice(0, 4).map((item) => <div key={item.title}><strong>{item.title}</strong><small>{item.text}</small></div>)}</div></div>;
  return <div className="mini-section"><p className="eyebrow">SECCIÓN</p><h3>{block.title}</h3><small>{block.description}</small></div>;
}

function BlockInspector({ block, onChange }: { block: Block; onChange: (patch: Partial<Block>) => void }) {
  const updateTitle = (value: string) => onChange({ title: value });
  const updateDescription = (value: string) => onChange({ description: value });
  if (block.type === 'heroMultimedia') {
    const slide = block.slides?.[0];
    const updateSlide = (patch: Partial<NonNullable<Block['slides']>[number]>) => onChange({ slides: (block.slides ?? []).map((item, index) => index === 0 ? { ...item, ...patch } : item) });
    return <div className="inspector-body"><Field label="Fabricante"><input value={slide?.brand ?? ''} onChange={(e) => updateSlide({ brand: e.target.value })} /></Field><Field label="Producto"><input value={slide?.product ?? ''} onChange={(e) => updateSlide({ product: e.target.value })} /></Field><Field label="Título"><textarea value={slide?.title ?? ''} onChange={(e) => updateSlide({ title: e.target.value })} /></Field><Field label="Descripción"><textarea value={slide?.description ?? ''} onChange={(e) => updateSlide({ description: e.target.value })} /></Field><Field label="Fuente multimedia"><select value={slide?.desktop.type ?? 'image'} onChange={(e) => updateSlide({ desktop: { ...(slide?.desktop ?? { type: 'image' as const, src: '' }), type: e.target.value as 'image' | 'video' } })}><option value="image">Imagen</option><option value="video">Video</option></select></Field><Field label="URL / ruta desktop"><input value={slide?.desktop.src ?? ''} onChange={(e) => updateSlide({ desktop: { ...(slide?.desktop ?? { type: 'image' as const, src: '' }), src: e.target.value } })} /></Field><Field label="Subir archivo local"><input type="file" accept="image/*,video/*" onChange={(e) => { const file = e.target.files?.[0]; if (!file) return; const type = file.type.startsWith('video/') ? 'video' : 'image'; updateSlide({ desktop: { type, src: URL.createObjectURL(file) } }); }} /><small>Prototipo: la vista previa es local. Producción usará Media Library/CDN.</small></Field><Field label="CTA"><input value={slide?.ctaLabel ?? ''} onChange={(e) => updateSlide({ ctaLabel: e.target.value })} /></Field></div>;
  }
  return <div className="inspector-body"><Field label="Título"><input value={block.title ?? ''} onChange={(e) => updateTitle(e.target.value)} /></Field><Field label="Descripción"><textarea value={block.description ?? ''} onChange={(e) => updateDescription(e.target.value)} /></Field>{block.items ? <Field label="Elementos"><div className="inspector-list">{block.items.map((item, index) => <div className="inspector-item" key={`${item.title}-${index}`}><input value={item.title} onChange={(e) => onChange({ items: block.items?.map((i, itemIndex) => itemIndex === index ? { ...i, title: e.target.value } : i) })} /><textarea value={item.text} onChange={(e) => onChange({ items: block.items?.map((i, itemIndex) => itemIndex === index ? { ...i, text: e.target.value } : i) })} /></div>)}</div></Field> : null}</div>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="field"><span>{label}</span>{children}</label>; }
