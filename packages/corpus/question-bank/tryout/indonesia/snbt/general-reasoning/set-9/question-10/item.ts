import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: true,
          label: "Simpulan tersebut pasti benar",
        },
        {
          isCorrect: false,
          label: "Simpulan tersebut mungkin benar, tetapi tidak pasti",
        },
        {
          isCorrect: false,
          label: "Simpulan tersebut pasti salah",
        },
        {
          isCorrect: false,
          label: "Simpulan tersebut tidak relevan dengan informasi",
        },
        {
          isCorrect: false,
          label:
            "Simpulan tersebut tidak dapat dinilai dari informasi yang ada",
        },
      ],
    },
  },
};

export default item;
