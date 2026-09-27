import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "perubahan cepat.",
        },
        {
          isCorrect: true,
          label: "kicauan burung.",
        },
        {
          isCorrect: false,
          label: "perawatan cermat.",
        },
        {
          isCorrect: false,
          label: "bernyanyi nyaring.",
        },
        {
          isCorrect: false,
          label: "pencucian lembut.",
        },
      ],
    },
  },
};

export default item;
