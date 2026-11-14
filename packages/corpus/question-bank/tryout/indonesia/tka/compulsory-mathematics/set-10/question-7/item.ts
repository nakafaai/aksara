import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "functions",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$2\\sqrt{3}$$",
        },
        {
          correct: true,
          label: "$$2\\sqrt{6}$$",
        },
        {
          correct: false,
          label: "$$5$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt{7}$$",
        },
        {
          correct: false,
          label: "$$4\\sqrt{2}$$",
        },
      ],
    },
  },
};

export default item;
