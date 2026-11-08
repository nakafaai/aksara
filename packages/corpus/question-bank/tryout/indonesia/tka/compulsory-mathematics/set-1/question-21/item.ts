import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "coffee-sales",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$11\\,\\%$$",
        },
        {
          correct: true,
          label: "sekitar $$36{,}7\\,\\%$$",
        },
        {
          correct: false,
          label: "$$40\\,\\%$$",
        },
        {
          correct: false,
          label: "sekitar $$63{,}3\\,\\%$$",
        },
        {
          correct: false,
          label: "sekitar $$66{,}7\\,\\%$$",
        },
      ],
    },
  },
};

export default item;
