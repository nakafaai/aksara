import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Simpulan tersebut mungkin benar, tetapi tidak pasti benar.",
        },
        {
          correct: false,
          label: "Simpulan tersebut pasti salah.",
        },
        {
          correct: true,
          label: "Simpulan tersebut pasti benar.",
        },
        {
          correct: false,
          label:
            "Simpulan tersebut tidak relevan dengan informasi yang diberikan.",
        },
        {
          correct: false,
          label:
            "Simpulan tersebut tidak dapat dinilai karena informasi tidak cukup.",
        },
      ],
    },
  },
};

export default item;
