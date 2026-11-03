import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

const reader = createReader(process.cwd(), keystaticConfig);

export async function getProfil() {
  const profil = await reader.singletons.profil.read();
  if (!profil) throw new Error('File src/content/profil.json tidak ditemukan.');
  return profil;
}

export async function getPengalaman() {
  const all = await reader.collections.pengalaman.all();
  return all
    .map(({ slug, entry }) => ({ slug, ...entry }))
    .sort((a, b) => (a.urutan ?? 99) - (b.urutan ?? 99));
}

export async function getSertifikasi() {
  const all = await reader.collections.sertifikasi.all();
  return all
    .map(({ slug, entry }) => ({ slug, ...entry }))
    .sort((a, b) => (a.urutan ?? 99) - (b.urutan ?? 99));
}

/** Semua projek yang tidak disembunyikan, urut berdasarkan "urutan". */
export async function getProjek() {
  const all = await reader.collections.projek.all();
  return all
    .map(({ slug, entry }) => ({ slug, ...entry }))
    .filter((p) => !p.sembunyikan)
    .sort((a, b) => (a.urutan ?? 99) - (b.urutan ?? 99));
}

export type Projek = Awaited<ReturnType<typeof getProjek>>[number];

/** Pecah teks multi-baris jadi paragraf (dipisah baris kosong). */
export function paragraphs(text: string | null | undefined): string[] {
  return (text ?? '')
    .split(/\n\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function waLink(nomor: string | null | undefined): string | null {
  const digits = (nomor ?? '').replace(/\D/g, '');
  return digits ? `https://wa.me/${digits}` : null;
}
