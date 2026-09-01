import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label:
            "Definisi *hipotesis* membuktikan bahwa perubahan uji menyebabkan hasil yang tercatat meskipun kondisi pembanding diabaikan.",
        },
        {
          isCorrect: true,
          label:
            "Definisi *hipotesis* menempatkan dugaan tentang hubungan suhu dan gas sebagai penjelasan yang diuji oleh data, bukan kesimpulan yang kebal terhadap hasil 20°C dan 50°C.",
        },
        {
          isCorrect: false,
          label:
            "Definisi itu menjadikan *hipotesis* pengganti variabel kontrol sehingga faktor yang belum diukur tidak lagi membatasi simpulan.",
        },
        {
          isCorrect: false,
          label:
            "Definisi tersebut memperluas *hipotesis* dari percobaan singkat ini ke semua keadaan yang menyerupainya.",
        },
        {
          isCorrect: false,
          label:
            "Istilah *hipotesis* dipakai untuk menamai keterbatasan laporan, bukan konsep yang diwakili hasil pengukuran.",
        },
      ],
    },
  },
  stimulusKey: "passage-1",
};

export default item;
