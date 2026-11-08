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
          label: "$$12$$ dan $$60^\\circ$$",
        },
        {
          correct: true,
          label: "$$-12$$ dan $$120^\\circ$$",
        },
        {
          correct: false,
          label: "$$-12$$ dan $$150^\\circ$$",
        },
        {
          correct: false,
          label: "$$-24$$ dan $$180^\\circ$$",
        },
        {
          correct: false,
          label: "$$24$$ dan $$0^\\circ$$",
        },
      ],
    },
  },
};

export default item;
