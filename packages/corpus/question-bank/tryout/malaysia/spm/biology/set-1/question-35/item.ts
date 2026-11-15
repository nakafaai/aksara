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
          correct: true,
          label: "$$\\tfrac12$$ and $$\\tfrac14$$",
        },
        {
          correct: false,
          label: "$$\\tfrac14$$ and $$\\tfrac14$$",
        },
        {
          correct: false,
          label: "$$\\tfrac12$$ and $$0$$",
        },
        {
          correct: false,
          label: "$$\\tfrac12$$ and $$\\tfrac12$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\tfrac12$$ dan $$\\tfrac14$$",
        },
        {
          correct: false,
          label: "$$\\tfrac14$$ dan $$\\tfrac14$$",
        },
        {
          correct: false,
          label: "$$\\tfrac12$$ dan $$0$$",
        },
        {
          correct: false,
          label: "$$\\tfrac12$$ dan $$\\tfrac12$$",
        },
      ],
    },
  },
};

export default item;
