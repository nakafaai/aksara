import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Definisi *transpirasi* membuktikan bahwa seluruh penurunan massa pasti berupa uap air yang keluar melalui stomata.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menjadikan *transpirasi* pengganti variabel kontrol sehingga faktor yang belum diukur tidak lagi membatasi simpulan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut memperluas *transpirasi* dari percobaan singkat ini ke semua keadaan yang menyerupainya.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *transpirasi* dipakai untuk menamai keterbatasan laporan, bukan konsep yang diwakili hasil pengukuran.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *transpirasi* menghubungkan kehilangan massa dengan perpindahan uap air yang sedang dipelajari, tetapi perbandingan perlakuan tetap diperlukan untuk menafsirkan hasilnya.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
