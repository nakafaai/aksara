import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Simpulan tersebut pasti benar.",
        },
        {
          isCorrect: false,
          label: "Simpulan tersebut kemungkinan besar benar.",
        },
        {
          isCorrect: true,
          label:
            "Simpulan relevan, tetapi tidak dapat dinilai karena informasi tidak cukup.",
        },
        {
          isCorrect: false,
          label: "Simpulan tersebut pasti salah.",
        },
        {
          isCorrect: false,
          label: "Simpulan tidak relevan dengan informasi yang diberikan.",
        },
      ],
    },
  },
};

export default item;
