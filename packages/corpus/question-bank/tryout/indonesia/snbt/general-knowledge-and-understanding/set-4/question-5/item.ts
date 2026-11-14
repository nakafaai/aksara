import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "paragraph-relation",
  },
  stimulus: "garam",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Paragraf ketiga memberi contoh cara kerja garam yang diuraikan pada paragraf kedua.",
        },
        {
          correct: false,
          label:
            "Paragraf ketiga membantah uraian paragraf kedua bahwa garam mengurangi air bebas di dalam daging.",
        },
        {
          correct: false,
          label:
            "Paragraf ketiga merinci tahap yang berlangsung setelah proses pada paragraf kedua selesai.",
        },
        {
          correct: true,
          label:
            "Paragraf ketiga membatasi simpulan paragraf kedua dengan menunjukkan bahwa garam tidak menyingkirkan semua mikroba.",
        },
        {
          correct: false,
          label:
            "Paragraf ketiga menguraikan syarat yang harus dipenuhi agar proses pada paragraf kedua dapat terjadi.",
        },
      ],
    },
  },
};

export default item;
