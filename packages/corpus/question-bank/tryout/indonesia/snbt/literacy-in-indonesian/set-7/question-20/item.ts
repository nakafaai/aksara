import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-4",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Pesan Resmi dan Suara Pengunjung: Membaca Batas Arsip Pameran",
        },
        {
          correct: false,
          label: "Buku Tamu sebagai Gambaran Lengkap Lima Kota",
        },
        {
          correct: false,
          label: "Poster Tahun $$1984$$ yang Membuktikan Pameran Inklusif",
        },
        {
          correct: false,
          label: "Menghitung Pendapat Pengunjung tanpa Memeriksa Asal Sumber",
        },
        {
          correct: false,
          label: "Keluhan Akses yang Membatalkan Seluruh Pesan Penyelenggara",
        },
      ],
    },
  },
};

export default item;
