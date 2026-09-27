import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Simpulan tersebut mungkin benar, tetapi tidak pasti benar.",
        },
        {
          isCorrect: false,
          label: "Simpulan tersebut pasti salah.",
        },
        {
          isCorrect: true,
          label: "Simpulan tersebut pasti benar.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan tersebut tidak relevan dengan informasi yang diberikan.",
        },
        {
          isCorrect: false,
          label:
            "Simpulan tersebut tidak dapat dinilai karena informasi tidak cukup.",
        },
      ],
    },
  },
};

export default item;
