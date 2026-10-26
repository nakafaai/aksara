import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "passage-1",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Definisi *transpirasi* membuktikan bahwa seluruh penurunan massa pasti berupa uap air yang keluar melalui stomata.",
        },
        {
          correct: false,
          label:
            "Definisi itu menjadikan *transpirasi* pengganti variabel kontrol sehingga faktor yang belum diukur tidak lagi membatasi simpulan.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut memperluas *transpirasi* dari percobaan singkat ini ke semua keadaan yang menyerupainya.",
        },
        {
          correct: false,
          label:
            "Istilah *transpirasi* dipakai untuk menamai keterbatasan laporan, bukan konsep yang diwakili hasil pengukuran.",
        },
        {
          correct: true,
          label:
            "Definisi *transpirasi* menghubungkan kehilangan massa dengan perpindahan uap air yang sedang dipelajari, tetapi perbandingan perlakuan tetap diperlukan untuk menafsirkan hasilnya.",
        },
      ],
    },
  },
};

export default item;
