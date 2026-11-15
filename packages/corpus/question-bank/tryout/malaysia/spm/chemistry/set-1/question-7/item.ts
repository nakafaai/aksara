import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "mole-concept",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Fe}_3\\text{O}_4$$ and $$0.72\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{Fe}_3\\text{O}_2$$ and $$0.48\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$\\text{Fe}_3\\text{O}_4$$ and $$0.96\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{Fe}_4\\text{O}_3$$ and $$0.72\\text{ dm}^3$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Fe}_3\\text{O}_4$$ dan $$0.72\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{Fe}_3\\text{O}_2$$ dan $$0.48\\text{ dm}^3$$",
        },
        {
          correct: true,
          label: "$$\\text{Fe}_3\\text{O}_4$$ dan $$0.96\\text{ dm}^3$$",
        },
        {
          correct: false,
          label: "$$\\text{Fe}_4\\text{O}_3$$ dan $$0.72\\text{ dm}^3$$",
        },
      ],
    },
  },
};

export default item;
