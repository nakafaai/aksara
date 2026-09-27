import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "hewan yang dimangsa.",
        },
        {
          isCorrect: false,
          label: "hewan kecil yang dimakan oleh hewan lainnya.",
        },
        {
          isCorrect: false,
          label: "serangga kecil.",
        },
        {
          isCorrect: true,
          label: "hewan pemangsa hewan lainnya.",
        },
        {
          isCorrect: false,
          label: "serangga dan hewan kecil lainnya.",
        },
      ],
    },
  },
};

export default item;
