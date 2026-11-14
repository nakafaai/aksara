import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "tandon",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\frac{22}{25}$$",
        },
        {
          correct: false,
          label: "$$\\frac{2}{3}$$",
        },
        {
          correct: false,
          label: "$$\\frac{19}{30}$$",
        },
        {
          correct: true,
          label: "$$\\frac{3}{5}$$",
        },
        {
          correct: false,
          label: "$$\\frac{7}{15}$$",
        },
      ],
    },
  },
};

export default item;
