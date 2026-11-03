import { config, collection, singleton, fields } from '@keystatic/core';

/**
 * GANTI dengan "username-github/nama-repo" kamu, contoh: 'luthfanfatih/portofolio'.
 * Dipakai panel admin versi online (di localhost admin langsung edit file di komputermu).
 */
const GITHUB_REPO = 'fanfatih/portofolio';

const urutan = fields.integer({
  label: 'Urutan tampil',
  description: 'Angka kecil tampil lebih dulu (1, 2, 3, ...).',
  defaultValue: 10,
  validation: { min: 0 },
});

/**
 * Di komputer sendiri (npm run dev) admin langsung mengedit file lokal.
 * Di situs online, admin mengedit lewat GitHub.
 * Saat setup awal GitHub App (lihat README), tambahkan PUBLIC_KEYSTATIC_GITHUB=true di file .env.
 */
const pakaiGithub = import.meta.env.PROD || import.meta.env.PUBLIC_KEYSTATIC_GITHUB === 'true';

export default config({
  storage: pakaiGithub
    ? { kind: 'github', repo: GITHUB_REPO as `${string}/${string}` }
    : { kind: 'local' },

  ui: {
    brand: { name: 'Portofolio Luthfan' },
    navigation: {
      Projek: ['projek'],
      'Profil & konten': ['profil', 'pengalaman', 'sertifikasi'],
    },
  },

  singletons: {
    profil: singleton({
      label: 'Profil & kontak',
      path: 'src/content/profil',
      format: { data: 'json' },
      schema: {
        sapaan: fields.text({
          label: 'Kata besar di beranda',
          description: 'Tulisan raksasa di bagian paling atas, misalnya "Halo".',
          defaultValue: 'Halo',
        }),
        nama: fields.text({ label: 'Nama lengkap', defaultValue: 'Luthfan Fatih Al-Islamy' }),
        headline: fields.text({
          label: 'Kalimat perkenalan (di bawah kata besar)',
          multiline: true,
        }),
        foto: fields.image({
          label: 'Foto di beranda',
          description: 'Rasio 4:5 (potret) paling pas. Kompres dulu supaya situs tetap ringan (maks. sekitar 400 KB).',
          directory: 'public/images/profil',
          publicPath: '/images/profil/',
        }),
        fotoHitamPutih: fields.checkbox({
          label: 'Tampilkan foto hitam-putih',
          defaultValue: true,
        }),
        kota: fields.text({ label: 'Kota', defaultValue: 'Bogor' }),
        statistik: fields.array(
          fields.object({
            angka: fields.text({ label: 'Angka', description: 'Contoh: 4+' }),
            keterangan: fields.text({ label: 'Keterangan' }),
          }),
          {
            label: 'Angka-angka di beranda',
            description: 'Isi hanya angka yang benar dan bisa dibuktikan.',
            itemLabel: (props) => `${props.fields.angka.value} ${props.fields.keterangan.value}`,
          }
        ),
        tentangJudul: fields.text({ label: 'Judul bagian Tentang' }),
        tentang: fields.text({
          label: 'Teks Tentang',
          description: 'Pisahkan paragraf dengan satu baris kosong.',
          multiline: true,
        }),
        keahlian: fields.array(
          fields.object({
            judul: fields.text({ label: 'Judul kelompok' }),
            isi: fields.text({ label: 'Isi', multiline: true }),
          }),
          {
            label: 'Kelompok keahlian',
            itemLabel: (props) => props.fields.judul.value,
          }
        ),
        ctaJudul: fields.text({
          label: 'Judul ajakan kerja bareng',
          defaultValue: 'Punya projek konten atau desain? Ayo ngobrol.',
        }),
        email: fields.text({ label: 'Email' }),
        whatsapp: fields.text({
          label: 'Nomor WhatsApp',
          description: 'Format 62xxxxxxxxxx tanpa + atau spasi. Kosongkan kalau tidak mau ditampilkan.',
        }),
        linkedin: fields.url({ label: 'Link LinkedIn' }),
        instagram: fields.url({ label: 'Link Instagram (opsional)' }),
        cv: fields.file({
          label: 'File CV (PDF, opsional)',
          directory: 'public/files',
          publicPath: '/files/',
        }),
        seoJudul: fields.text({
          label: 'Judul situs di Google dan preview link',
          description: 'Idealnya di bawah 60 karakter.',
        }),
        seoDeskripsi: fields.text({
          label: 'Deskripsi situs di Google dan preview link',
          description: 'Idealnya 120 sampai 160 karakter.',
          multiline: true,
        }),
      },
    }),
  },

  collections: {
    projek: collection({
      label: 'Projek',
      path: 'src/content/projek/*',
      slugField: 'judul',
      format: { data: 'json' },
      columns: ['kategori', 'tahun'],
      schema: {
        judul: fields.slug({
          name: { label: 'Judul projek' },
          slug: { label: 'Alamat halaman (otomatis, boleh diubah)' },
        }),
        kategori: fields.select({
          label: 'Kategori',
          options: [
            { label: 'Social Media', value: 'Social Media' },
            { label: 'Konten Video', value: 'Konten Video' },
            { label: 'Desain Grafis', value: 'Desain Grafis' },
            { label: 'Lainnya', value: 'Lainnya' },
          ],
          defaultValue: 'Social Media',
        }),
        tahun: fields.text({ label: 'Tahun', description: 'Contoh: 2025' }),
        klien: fields.text({ label: 'Klien atau instansi (opsional)' }),
        peran: fields.text({ label: 'Peranmu di projek ini (opsional)' }),
        ringkasan: fields.text({
          label: 'Ringkasan singkat',
          description: 'Satu atau dua kalimat untuk kartu di beranda: masalahnya apa, hasilnya apa.',
          multiline: true,
        }),
        cover: fields.image({
          label: 'Gambar sampul',
          description: 'Rasio 4:3. Pakai gambar asli hasil kerjamu.',
          directory: 'public/images/projek',
          publicPath: '/images/projek/',
        }),
        masalah: fields.text({
          label: 'Masalah atau tujuan',
          description: 'Apa yang perlu diselesaikan? Pisahkan paragraf dengan satu baris kosong.',
          multiline: true,
        }),
        proses: fields.text({
          label: 'Proses',
          description: 'Apa yang kamu lakukan? Strategi, alat, langkah.',
          multiline: true,
        }),
        hasil: fields.text({
          label: 'Hasil',
          description: 'Isi angka hanya kalau ada datanya (jangkauan, engagement, penjualan, dll).',
          multiline: true,
        }),
        galeri: fields.array(
          fields.object({
            gambar: fields.image({
              label: 'Gambar',
              directory: 'public/images/projek',
              publicPath: '/images/projek/',
            }),
            keterangan: fields.text({ label: 'Keterangan singkat' }),
          }),
          {
            label: 'Galeri gambar',
            itemLabel: (props) => props.fields.keterangan.value || 'Gambar',
          }
        ),
        tautan: fields.url({ label: 'Tautan hasil (opsional)', description: 'Postingan, video, atau situs.' }),
        teksTautan: fields.text({ label: 'Teks tombol tautan', defaultValue: 'Lihat hasilnya' }),
        unggulan: fields.checkbox({
          label: 'Tampilkan di beranda',
          defaultValue: true,
        }),
        sembunyikan: fields.checkbox({
          label: 'Sembunyikan dari situs (draf)',
          defaultValue: false,
        }),
        urutan,
      },
    }),

    pengalaman: collection({
      label: 'Pengalaman kerja',
      path: 'src/content/pengalaman/*',
      slugField: 'judul',
      format: { data: 'json' },
      columns: ['instansi', 'mulai'],
      schema: {
        judul: fields.slug({
          name: {
            label: 'Judul entri',
            description: 'Hanya untuk daftar di admin, contoh: "BLK UPTD, Instruktur Digital Marketing".',
          },
        }),
        instansi: fields.text({ label: 'Instansi atau tempat kerja' }),
        peran: fields.text({ label: 'Peran' }),
        mulai: fields.text({ label: 'Mulai', description: 'Contoh: Okt 2022' }),
        selesai: fields.text({ label: 'Selesai', description: 'Contoh: Sep 2025, atau "sekarang"' }),
        kota: fields.text({ label: 'Kota', defaultValue: 'Kota Bogor' }),
        tag: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tag keahlian',
          itemLabel: (props) => props.value,
        }),
        urutan,
      },
    }),

    sertifikasi: collection({
      label: 'Sertifikasi',
      path: 'src/content/sertifikasi/*',
      slugField: 'judul',
      format: { data: 'json' },
      columns: ['penerbit', 'tahun'],
      schema: {
        judul: fields.slug({ name: { label: 'Nama sertifikasi' } }),
        penerbit: fields.text({ label: 'Penerbit', description: 'Contoh: BNSP, Google Digital Garage' }),
        tahun: fields.text({ label: 'Tahun' }),
        urutan,
      },
    }),
  },
});
