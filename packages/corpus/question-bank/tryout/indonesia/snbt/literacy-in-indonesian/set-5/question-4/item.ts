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
            "Definisi *indikator* membuktikan bahwa perubahan uji menyebabkan hasil yang tercatat meskipun kondisi pembanding diabaikan.",
        },
        {
          correct: false,
          label:
            "Definisi itu menjadikan *indikator* pengganti variabel kontrol sehingga faktor yang belum diukur tidak lagi membatasi simpulan.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut memperluas *indikator* dari percobaan singkat ini ke semua keadaan yang menyerupainya.",
        },
        {
          correct: true,
          label:
            "Definisi *indikator* menjelaskan bahwa persentase cahaya mewakili kejernihan visual, sehingga ukuran itu belum cukup untuk menyatakan air aman diminum.",
        },
        {
          correct: false,
          label:
            "Istilah *indikator* dipakai untuk menamai keterbatasan laporan, bukan konsep yang diwakili hasil pengukuran.",
        },
      ],
    },
  },
};

export default item;
