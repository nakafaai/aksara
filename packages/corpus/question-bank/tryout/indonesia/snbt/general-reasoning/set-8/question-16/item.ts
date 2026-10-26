import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Simpulan tersebut pasti benar.",
        },
        {
          correct: false,
          label: "Simpulan tersebut kemungkinan besar benar.",
        },
        {
          correct: true,
          label:
            "Simpulan relevan, tetapi tidak dapat dinilai karena informasi tidak cukup.",
        },
        {
          correct: false,
          label: "Simpulan tersebut pasti salah.",
        },
        {
          correct: false,
          label: "Simpulan tidak relevan dengan informasi yang diberikan.",
        },
      ],
    },
  },
};

export default item;
