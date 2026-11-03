# Portofolio Luthfan Fatih

Situs portofolio statis (Astro) dengan panel admin (Keystatic) di `/keystatic`.
Semua konten (profil, projek, pengalaman, sertifikasi) disimpan sebagai file di folder `src/content`,
jadi tidak ada database dan tidak ada biaya hosting.

## Isi project

```
src/content/          ← SEMUA konten (diedit lewat panel admin)
  profil.json         ← nama, foto, tentang, kontak, SEO
  projek/             ← satu file per projek
  pengalaman/         ← satu file per pengalaman kerja
  sertifikasi/        ← satu file per sertifikasi
public/images/        ← gambar yang kamu upload lewat admin
src/pages/            ← halaman: beranda, /projek, /projek/[slug], 404
src/styles/global.css ← semua gaya (warna, font, jarak ada di bagian :root)
keystatic.config.ts   ← definisi form panel admin
```

## 1. Jalankan di komputer

Butuh Node.js 22 ke atas (https://nodejs.org).

```bash
npm install
npm run dev
```

- Situs: http://localhost:4321
- Panel admin: http://localhost:4321/keystatic (tanpa login, langsung edit file lokal)

Tambah projek: **Projek → Add**, isi form, **Create**. Filenya muncul di `src/content/projek/`.

## 2. Taruh di GitHub

1. Buat repo baru di GitHub (boleh private), misalnya `portofolio`.
2. Di folder project:

```bash
git init
git add .
git commit -m "Portofolio pertama"
git branch -M main
git remote add origin https://github.com/USERNAME/portofolio.git
git push -u origin main
```

3. Buka `keystatic.config.ts`, ganti `GITHUB_REPO` jadi `'USERNAME/portofolio'`, lalu commit dan push lagi.

## 3. Deploy gratis di Vercel

1. Daftar di https://vercel.com dengan akun GitHub.
2. **Add New → Project**, pilih repo `portofolio`, **Deploy**. Vercel mengenali Astro otomatis.
3. Situsmu sudah online di alamat `xxx.vercel.app`.

Setiap kali ada commit baru di GitHub, Vercel build ulang otomatis (sekitar 1 menit).

## 4. Aktifkan panel admin online (Keystatic Cloud, gratis)

Cara paling mudah. Tidak perlu setup lokal dan tidak ada variabel rahasia. Gratis sampai 3 pengguna per team.

1. Buka https://keystatic.cloud dan daftar dengan akun GitHub.
2. Buat **Team** (nama bebas), lalu **Create project** dan hubungkan ke repo `portofolio`. Setujui aplikasi GitHub Keystatic kalau diminta.
3. Di halaman project, salin nama project dalam bentuk `nama-team/nama-project`.
4. Buka `keystatic.config.ts`, isi `KEYSTATIC_CLOUD_PROJECT` dengan nama itu, lalu commit dan push (boleh langsung lewat editor web GitHub).
5. Tunggu Vercel selesai deploy, buka `https://alamat-situsmu/keystatic`, dan login.

Cara alternatif tanpa layanan pihak ketiga (GitHub App buatan sendiri) ada di dokumentasi Keystatic: https://keystatic.com/docs/github-mode

## 5. Pasang domain luthfanfatih.my.id

1. Beli domain di registrar pilihanmu.
2. Di Vercel: **Project → Settings → Domains → Add**, ketik `luthfanfatih.my.id`.
3. Vercel menampilkan record DNS yang harus dipasang. Salin persis dari layar Vercel ke pengaturan DNS di registrar (atau di Cloudflare kalau nameserver-nya dipindah ke sana).
4. Tunggu propagasi (beberapa menit sampai beberapa jam). SSL aktif otomatis.
5. Kalau domain finalnya beda, ganti `site` di `astro.config.mjs` dan alamat sitemap di `public/robots.txt`.

## Sebelum diumumkan

- [ ] Ganti tiga projek `[Contoh]` dengan projek asli (atau hapus). Isi: masalah, proses, hasil, gambar asli.
- [ ] Upload foto di **Profil & kontak**. Rasio 4:5, kompres dulu (sekitar 400 KB). Cek hasilnya di HP.
- [ ] Cek semua angka di beranda. Hanya pakai angka yang bisa kamu buktikan.
- [ ] Kosongkan nomor WhatsApp di profil kalau tidak mau ditampilkan di situs publik.
- [ ] Isi link Instagram dan file CV (opsional).
- [ ] Kirim link ke WhatsApp dan LinkedIn untuk cek tampilan preview (gambar `public/og.png`).

## Mengubah tampilan

- Warna aksen, font, dan jarak: bagian `:root` di `src/styles/global.css`.
- Susunan halaman: file di `src/pages/` dan `src/layouts/Base.astro`.
- Mau tambah kolom di form admin: `keystatic.config.ts`, lalu pakai datanya di halaman.

## Catatan

- Gambar yang diupload tersimpan di repo (`public/images`). Kompres dulu supaya situs tetap cepat dan repo tidak membengkak.
- Edit lewat admin online memicu build ulang, jadi perubahan baru tampil sekitar 1 menit kemudian.
- Paket Hobby Vercel gratis untuk penggunaan pribadi non-komersial. Kalau nanti situs ini dipakai untuk bisnis, cek ketentuan terbarunya atau pindah hosting.
