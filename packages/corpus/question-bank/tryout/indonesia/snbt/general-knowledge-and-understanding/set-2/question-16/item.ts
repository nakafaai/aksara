import type { QuestionItem } from "@nakafa/aksara-contracts/question/item";

const item: QuestionItem = {
  responses: {
    id: {
      kind: "single-choice",
      options: [
        {
          isCorrect: false,
          label: "gondrong berantakan.",
        },
        {
          isCorrect: false,
          label: "pipinya kasar.",
        },
        {
          isCorrect: false,
          label: "lingkaran hitam.",
        },
        {
          isCorrect: true,
          label: "tubuhnya tampak makin ramping.",
        },
        {
          isCorrect: false,
          label: "bercukur.",
        },
      ],
    },
  },
};

export default item;
