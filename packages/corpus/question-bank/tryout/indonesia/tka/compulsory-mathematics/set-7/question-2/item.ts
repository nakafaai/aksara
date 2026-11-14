import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "bunyi",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$31$$",
        },
        {
          correct: false,
          label: "$$35$$",
        },
        {
          correct: true,
          label: "$$37$$",
        },
        {
          correct: false,
          label: "$$38$$",
        },
        {
          correct: false,
          label: "$$39$$",
        },
      ],
    },
  },
};

export default item;
