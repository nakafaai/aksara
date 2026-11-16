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
          label:
            "$$\\text{FeS}$$, giving $$0.96\\text{ dm}^3$$ of sulfur dioxide",
        },
        {
          correct: false,
          label:
            "$$\\text{Fe}_2\\text{S}_3$$, giving $$1.44\\text{ dm}^3$$ of sulfur dioxide",
        },
        {
          correct: false,
          label:
            "$$\\text{FeS}_2$$, giving $$0.96\\text{ dm}^3$$ of sulfur dioxide",
        },
        {
          correct: true,
          label:
            "$$\\text{FeS}_2$$, giving $$1.92\\text{ dm}^3$$ of sulfur dioxide",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{FeS}$$, menghasilkan $$0.96\\text{ dm}^3$$ sulfur dioksida",
        },
        {
          correct: false,
          label:
            "$$\\text{Fe}_2\\text{S}_3$$, menghasilkan $$1.44\\text{ dm}^3$$ sulfur dioksida",
        },
        {
          correct: false,
          label:
            "$$\\text{FeS}_2$$, menghasilkan $$0.96\\text{ dm}^3$$ sulfur dioksida",
        },
        {
          correct: true,
          label:
            "$$\\text{FeS}_2$$, menghasilkan $$1.92\\text{ dm}^3$$ sulfur dioksida",
        },
      ],
    },
  },
};

export default item;
