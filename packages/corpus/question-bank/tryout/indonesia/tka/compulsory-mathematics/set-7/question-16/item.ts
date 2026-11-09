import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "measurement",
  },
  stimulus: "ice-cream",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$37{,}68\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$56{,}52\\text{ cm}^3$$",
        },
        {
          correct: true,
          label: "$$113{,}04\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$339{,}12\\text{ cm}^3$$",
        },
        {
          correct: false,
          label: "$$452{,}16\\text{ cm}^3$$",
        },
      ],
    },
  },
};

export default item;
