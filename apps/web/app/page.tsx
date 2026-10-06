'use client';

import { useEffect, useState } from 'react';
import { PageRenderer } from '../components/page-renderer';
import { defaultPage } from '../lib/defaults';
import { loadPage } from '../lib/storage';
import type { PageDocument } from '../lib/types';

export default function HomePage() {
  const [page, setPage] = useState<PageDocument>(defaultPage);

  useEffect(() => {
    const stored = loadPage();
    setPage(stored.status === 'published' ? stored : defaultPage);
  }, []);

  return (
    <main>
      <header className="site-header">
        <div className="container site-header__inner">
          <a className="logo" href="/">OPIMED<span>.</span></a>
          <nav><a href="#soluciones">Soluciones</a><a href="#especialidades">Especialidades</a><a href="#marcas">Marcas</a><a href="#servicio">Servicio</a></nav>
          <div className="header-actions"><a className="search-pill" href="/studio">⌕ <span>Studio</span></a><a className="button button--small button--primary" href="#contacto">Contactar</a></div>
        </div>
      </header>
      <PageRenderer blocks={page.blocks} />
      <footer className="footer"><div className="container footer-grid"><div><div className="logo">OPIMED<span>.</span></div><p>Technology for ophthalmology.<br />International technology. Local support.</p></div><div><strong>Soluciones</strong><a href="#">Diagnóstico</a><a href="#">Cirugía</a><a href="#">Instrumental</a><a href="#">Insumos</a></div><div><strong>Soporte</strong><a href="#">Servicio técnico</a><a href="#">Documentación</a><a href="#">Contacto</a></div></div></footer>
    </main>
  );
}
