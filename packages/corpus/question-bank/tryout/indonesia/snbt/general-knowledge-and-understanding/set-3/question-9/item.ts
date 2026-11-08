import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "sentence-meaning",
    topic: "sentence-function",
  },
  stimulus: "tsunami",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Menegaskan bahwa peringatan resmi tetap diperlukan karena tsunami tidak selalu didahului surutnya air laut.",
        },
        {
          correct: false,
          label:
            "Membuktikan bahwa surutnya air laut tidak berkaitan dengan tsunami.",
        },
        {
          correct: false,
          label:
            "Menyarankan agar warga mendekati pantai ketika air laut surut.",
        },
        {
          correct: false,
          label:
            "Menjelaskan cara lembaga resmi mengukur tinggi gelombang tsunami.",
        },
        {
          correct: false,
          label:
            "Mengulang isi kalimat (6) tentang kecepatan gelombang di laut lepas.",
        },
      ],
    },
  },
};

export default item;
