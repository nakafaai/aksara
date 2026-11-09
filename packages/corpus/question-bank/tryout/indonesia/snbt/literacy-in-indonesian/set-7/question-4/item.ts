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
            "Definisi *hipotesis* membuktikan bahwa perubahan uji menyebabkan hasil yang tercatat meskipun kondisi pembanding diabaikan.",
        },
        {
          correct: true,
          label:
            "Definisi *hipotesis* menempatkan dugaan tentang hubungan suhu dan gas sebagai penjelasan yang diuji oleh data, bukan kesimpulan yang kebal terhadap hasil $$20^\\circ\\text{C}$$ dan $$50^\\circ\\text{C}$$.",
        },
        {
          correct: false,
          label:
            "Definisi itu menjadikan *hipotesis* pengganti variabel kontrol sehingga faktor yang belum diukur tidak lagi membatasi simpulan.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut memperluas *hipotesis* dari percobaan singkat ini ke semua keadaan yang menyerupainya.",
        },
        {
          correct: false,
          label:
            "Istilah *hipotesis* dipakai untuk menamai keterbatasan laporan, bukan konsep yang diwakili hasil pengukuran.",
        },
      ],
    },
  },
};

export default item;
