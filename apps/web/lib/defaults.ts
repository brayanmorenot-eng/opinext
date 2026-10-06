import { Block, PageDocument } from './types';

export const heroSlides = [
  {
    id: 'hero-geuder-vivos',
    brand: 'GEUDER',
    product: 'VIVOS',
    eyebrow: 'TECNOLOGÍA PARA CIRUGÍA OFTALMOLÓGICA',
    title: 'Precisión que acompaña cada procedimiento.',
    description: 'Una experiencia multimedia pensada para presentar tecnología oftalmológica con claridad, impacto y respaldo técnico.',
    desktop: { type: 'image' as const, src: '/media/opimed-hero.jpg' },
    mobile: { type: 'image' as const, src: '/media/opimed-hero.jpg' },
    ctaLabel: 'Descubrir producto',
    ctaHref: '/productos/geuder/vivos',
    imageDurationMs: 6500,
  },
  {
    id: 'hero-keeler',
    brand: 'KEELER',
    product: 'VANTAGE PLUS',
    eyebrow: 'DIAGNÓSTICO Y DOCUMENTACIÓN',
    title: 'Tecnología diseñada para ver con más claridad.',
    description: 'Productos, especialidades y servicio reunidos en una experiencia digital preparada para crecer.',
    desktop: { type: 'image' as const, src: '/media/opimed-hero.jpg' },
    mobile: { type: 'image' as const, src: '/media/opimed-hero.jpg' },
    ctaLabel: 'Conocer equipo',
    ctaHref: '/productos/keeler/vantage-plus',
    imageDurationMs: 6000,
  },
  {
    id: 'hero-ocular',
    brand: 'OCULAR INSTRUMENTS',
    product: 'LENTES DE VISUALIZACIÓN',
    eyebrow: 'INSTRUMENTAL DE PRECISIÓN',
    title: 'El detalle importa.',
    description: 'Una plataforma multimarca para explorar soluciones de diagnóstico, cirugía e instrumental.',
    desktop: { type: 'image' as const, src: '/media/opimed-hero.jpg' },
    mobile: { type: 'image' as const, src: '/media/opimed-hero.jpg' },
    ctaLabel: 'Ver soluciones',
    ctaHref: '/marcas/ocular-instruments',
    imageDurationMs: 6000,
  },
] satisfies PageDocument['blocks'][number]['slides'];

export const defaultBlocks: Block[] = [
  {
    id: 'hero-01', type: 'heroMultimedia', label: 'Hero multimedia', slides: heroSlides,
  },
  {
    id: 'solutions-01', type: 'solutionGrid', label: '¿Qué necesitas?',
    title: '¿Qué necesitas?', description: 'Tres caminos para llegar rápido a la solución correcta.',
    items: [
      { eyebrow: '01', title: 'Producto', text: 'Ya conozco el equipo, referencia o fabricante.' },
      { eyebrow: '02', title: 'Solución', text: 'Necesito tecnología para una especialidad o procedimiento.' },
      { eyebrow: '03', title: 'Soporte', text: 'Necesito mantenimiento, capacitación o asistencia técnica.' },
    ],
  },
  {
    id: 'brands-01', type: 'brandGrid', label: 'Marcas',
    title: 'Tecnología de fabricantes especializados.',
    items: [
      { title: 'GEUDER', text: 'Cirugía oftalmológica' },
      { title: 'OCULAR INSTRUMENTS', text: 'Visualización e instrumental' },
      { title: 'KATENA', text: 'Instrumental microquirúrgico' },
      { title: 'KEELER', text: 'Diagnóstico y óptica' },
      { title: 'KANGHUA', text: 'Diagnóstico oftalmológico' },
    ],
  },
  {
    id: 'service-01', type: 'serviceHighlight', label: 'Servicio técnico',
    title: 'Tu equipo. Nuestro respaldo.',
    description: 'Mantenimiento, reparación, repuestos y capacitación técnica como parte de la experiencia OPIMED.',
    ctaLabel: 'Conocer servicio',
  },
  {
    id: 'news-01', type: 'newsGrid', label: 'Novedades',
    title: 'Tecnología que está cambiando la oftalmología.',
    items: [
      { eyebrow: 'INNOVACIÓN', title: 'Nuevas soluciones', text: 'Presentación de tecnologías y productos destacados.' },
      { eyebrow: 'EVENTOS', title: 'Agenda OPIMED', text: 'Congresos, lanzamientos y encuentros profesionales.' },
      { eyebrow: 'TÉCNICO', title: 'Centro técnico', text: 'Documentación, soporte y recursos para equipos.' },
    ],
  },
  {
    id: 'cta-01', type: 'cta', label: 'Contacto',
    title: '¿Necesitas una solución para tu institución?',
    description: 'Habla con OPIMED y encuentra el equipo, instrumental o servicio adecuado.',
    ctaLabel: 'Hablar con OPIMED',
  },
];

export const defaultPage: PageDocument = {
  id: 'home',
  title: 'Inicio',
  slug: '/',
  status: 'draft',
  updatedAt: new Date().toISOString(),
  blocks: defaultBlocks,
};
