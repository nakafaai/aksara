import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-2",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "pemeriksaan hasil terhadap acuan agar hasil dapat ditafsirkan secara tepat",
        },
        {
          correct: false,
          label: "menambah jumlah laporan tanpa memeriksa ketepatannya",
        },
        {
          correct: false,
          label: "menghapus semua hasil yang berbeda dari dugaan awal",
        },
        {
          correct: false,
          label:
            "merata-ratakan seluruh pengamatan tanpa memperhitungkan peluang kunjungan",
        },
        {
          correct: false,
          label: "menganggap penilaian ahli selalu benar dan tidak perlu diuji",
        },
      ],
    },
  },
};

export default item;
