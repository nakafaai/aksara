import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "data-probability",
    topic: "data",
  },
  stimulus: "hujan",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$220\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$245\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$260\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$280\\text{ mm}$$",
        },
        {
          correct: false,
          label: "$$300\\text{ mm}$$",
        },
      ],
    },
  },
};

export default item;
