import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "knowledge-understanding",
    contentDomain: "geometry-measurement",
    topic: "geometry-objects",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$6\\sqrt{10}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$16\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt{61}\\text{ cm}$$",
        },
        {
          correct: false,
          label: "$$4\\sqrt{13}\\text{ cm}$$",
        },
        {
          correct: true,
          label: "$$6\\sqrt5\\text{ cm}$$",
        },
      ],
    },
  },
};

export default item;
