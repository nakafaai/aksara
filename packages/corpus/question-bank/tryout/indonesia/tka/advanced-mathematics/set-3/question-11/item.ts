import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "geometry-measurement",
    topic: "vectors",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\sqrt{19}$$",
        },
        {
          correct: false,
          label: "$$\\frac32\\sqrt{13}$$",
        },
        {
          correct: false,
          label: "$$5\\sqrt5$$",
        },
        {
          correct: false,
          label: "$$2\\sqrt{13}$$",
        },
        {
          correct: true,
          label: "$$\\sqrt{13}$$",
        },
      ],
    },
  },
};

export default item;
