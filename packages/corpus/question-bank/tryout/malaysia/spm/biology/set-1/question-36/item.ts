import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "inheritance",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\tfrac12$$",
        },
        {
          correct: false,
          label: "$$\\tfrac14$$",
        },
        {
          correct: false,
          label: "$$\\tfrac34$$",
        },
        {
          correct: true,
          label: "$$\\tfrac23$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\tfrac12$$",
        },
        {
          correct: false,
          label: "$$\\tfrac14$$",
        },
        {
          correct: false,
          label: "$$\\tfrac34$$",
        },
        {
          correct: true,
          label: "$$\\tfrac23$$",
        },
      ],
    },
  },
};

export default item;
