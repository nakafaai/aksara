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
            "Definisi *daya generalisasi* membuktikan bahwa perubahan uji menyebabkan hasil yang tercatat meskipun kondisi pembanding diabaikan.",
        },
        {
          correct: false,
          label:
            "Definisi itu menjadikan *daya generalisasi* pengganti variabel kontrol sehingga faktor yang belum diukur tidak lagi membatasi simpulan.",
        },
        {
          correct: false,
          label:
            "Definisi tersebut memperluas *daya generalisasi* dari percobaan singkat ini ke semua keadaan yang menyerupainya.",
        },
        {
          correct: false,
          label:
            "Istilah *daya generalisasi* menyatakan bahwa hasil simulasi tidak berguna sehingga pengujian pada kondisi lain tidak diperlukan.",
        },
        {
          correct: true,
          label:
            "Definisi *daya generalisasi* menjelaskan alasan hasil pada simulasi ini belum dapat langsung diterapkan pada hari berawan atau kondisi angin yang berbeda.",
        },
      ],
    },
  },
};

export default item;
