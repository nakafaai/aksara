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
            "Definisi *variabel kontrol* membuktikan bahwa perubahan uji menyebabkan hasil yang tercatat meskipun kondisi pembanding diabaikan.",
        },
        {
          correct: false,
          label:
            "Definisi itu menjadikan *variabel kontrol* pengganti data pengamatan sehingga faktor yang belum diukur tidak lagi membatasi simpulan.",
        },
        {
          correct: true,
          label:
            "Definisi *variabel kontrol* menjelaskan alasan jenis benih, volume air, dan ukuran wadah dijaga sama agar perbandingan pencahayaan lebih wajar.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut memperluas *variabel kontrol* dari percobaan singkat ini ke semua keadaan yang menyerupainya.",
        },
        {
          correct: false,
          label:
            "Istilah *variabel kontrol* dipakai untuk menamai keterbatasan laporan, bukan konsep yang diwakili hasil pengukuran.",
        },
      ],
    },
  },
};

export default item;
