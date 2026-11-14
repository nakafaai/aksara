import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "cetak",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$21$$",
        },
        {
          correct: false,
          label: "$$23$$",
        },
        {
          correct: false,
          label: "$$25$$",
        },
        {
          correct: false,
          label: "$$27$$",
        },
        {
          correct: true,
          label: "$$31$$",
        },
      ],
    },
  },
};

export default item;
