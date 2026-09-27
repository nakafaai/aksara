import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "mengganti *menyediakan* dengan *disediakan*.",
        },
        {
          isCorrect: false,
          label: "menghilangkan kata *juga*.",
        },
        {
          isCorrect: false,
          label: "mengganti *tolok ukur* dengan *perkiraan*.",
        },
        {
          isCorrect: false,
          label: "menambahkan kata *yang* sebelum *terkini*.",
        },
        {
          isCorrect: true,
          label: "menghilangkan kata *mengenai* pada awal kalimat.",
        },
      ],
    },
  },
};

export default item;
