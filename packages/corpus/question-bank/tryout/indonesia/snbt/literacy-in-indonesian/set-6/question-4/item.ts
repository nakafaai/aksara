import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Definisi *periode* membuktikan bahwa perubahan uji menyebabkan hasil yang tercatat meskipun kondisi pembanding diabaikan.",
        },
        {
          correct: false,
          label:
            "Definisi itu menjadikan *periode* pengganti variabel kontrol sehingga faktor yang belum diukur tidak lagi membatasi simpulan.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut memperluas *periode* dari percobaan singkat ini ke semua keadaan yang menyerupainya.",
        },
        {
          correct: false,
          label:
            "Istilah *periode* dipakai untuk menamai keterbatasan laporan, bukan konsep yang diwakili hasil pengukuran.",
        },
        {
          correct: true,
          label:
            "Definisi *periode* menjelaskan mengapa waktu sepuluh ayunan perlu dibagi sepuluh agar setiap nilai menyatakan waktu satu ayunan lengkap.",
        },
      ],
    },
  },
  stimulus: "passage-1",
};

export default item;
