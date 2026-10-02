import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "Kata _diuji_ pada kalimat (2).",
        },
        {
          isCorrect: false,
          label: "Kata _membantu_ pada kalimat (3).",
        },
        {
          isCorrect: false,
          label: "Kata _memungkinkan_ pada kalimat (4).",
        },
        {
          isCorrect: true,
          label: "Kata _menghasilkan_ pada kalimat (8).",
        },
        {
          isCorrect: false,
          label: "Kata _mengancam_ pada kalimat (9).",
        },
      ],
    },
  },
};

export default item;
