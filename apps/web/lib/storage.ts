import { PageDocument } from './types';
import { defaultPage } from './defaults';

const KEY = 'opimed-studio:v1:page:home';

export function loadPage(): PageDocument {
  if (typeof window === 'undefined') return defaultPage;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultPage;
    return JSON.parse(raw) as PageDocument;
  } catch {
    return defaultPage;
  }
}

export function savePage(page: PageDocument) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(page));
}

export function resetPage() {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(KEY);
}
