export type MediaType = 'image' | 'video';

export type HeroMedia = {
  type: MediaType;
  src: string;
  poster?: string;
};

export type HeroSlide = {
  id: string;
  brand: string;
  product: string;
  eyebrow: string;
  title: string;
  description: string;
  desktop: HeroMedia;
  mobile: HeroMedia;
  ctaLabel: string;
  ctaHref: string;
  imageDurationMs?: number;
};

export type BlockType = 'heroMultimedia' | 'solutionGrid' | 'brandGrid' | 'serviceHighlight' | 'newsGrid' | 'cta';

export type Block = {
  id: string;
  type: BlockType;
  label: string;
  hidden?: boolean;
  slides?: HeroSlide[];
  title?: string;
  description?: string;
  items?: { title: string; text: string; eyebrow?: string }[];
  ctaLabel?: string;
};

export type PageDocument = {
  id: string;
  title: string;
  slug: string;
  status: 'draft' | 'published';
  updatedAt: string;
  blocks: Block[];
};
