import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label:
            "Pesan Resmi dan Suara Pengunjung: Membaca Batas Arsip Pameran",
        },
        {
          isCorrect: false,
          label: "Buku Tamu sebagai Gambaran Lengkap Lima Kota",
        },
        {
          isCorrect: false,
          label: "Poster Tahun 1984 yang Membuktikan Pameran Inklusif",
        },
        {
          isCorrect: false,
          label: "Menghitung Pendapat Pengunjung tanpa Memeriksa Asal Sumber",
        },
        {
          isCorrect: false,
          label: "Keluhan Akses yang Membatalkan Seluruh Pesan Penyelenggara",
        },
      ],
    },
  },
  stimulusKey: "passage-4",
};

export default item;
