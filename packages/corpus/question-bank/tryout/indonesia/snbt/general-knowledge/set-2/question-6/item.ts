import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "serangga.",
        },
        {
          isCorrect: false,
          label: "hewan kecil.",
        },
        {
          isCorrect: false,
          label: "mangsa kelelawar.",
        },
        {
          isCorrect: false,
          label: "serangga dan hewan kecil.",
        },
        {
          isCorrect: true,
          label: "kelelawar.",
        },
      ],
    },
  },
};

export default item;
