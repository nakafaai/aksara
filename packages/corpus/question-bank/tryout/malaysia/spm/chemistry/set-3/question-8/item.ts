import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "periodic-table",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{MCl}_2$$, $$0.24\\text{ dm}^3$$ of chlorine, and $$0.86\\text{ g}$$ of hydroxide",
        },
        {
          correct: false,
          label:
            "$$\\text{MCl}_3$$, $$0.72\\text{ dm}^3$$ of chlorine, and $$1.03\\text{ g}$$ of hydroxide",
        },
        {
          correct: false,
          label:
            "$$\\text{MCl}_3$$, $$0.36\\text{ dm}^3$$ of chlorine, and $$0.86\\text{ g}$$ of hydroxide",
        },
        {
          correct: true,
          label:
            "$$\\text{MCl}_3$$, $$0.36\\text{ dm}^3$$ of chlorine, and $$1.03\\text{ g}$$ of hydroxide",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$\\text{MCl}_2$$, $$0.24\\text{ dm}^3$$ klorin, dan $$0.86\\text{ g}$$ hidroksida",
        },
        {
          correct: false,
          label:
            "$$\\text{MCl}_3$$, $$0.72\\text{ dm}^3$$ klorin, dan $$1.03\\text{ g}$$ hidroksida",
        },
        {
          correct: false,
          label:
            "$$\\text{MCl}_3$$, $$0.36\\text{ dm}^3$$ klorin, dan $$0.86\\text{ g}$$ hidroksida",
        },
        {
          correct: true,
          label:
            "$$\\text{MCl}_3$$, $$0.36\\text{ dm}^3$$ klorin, dan $$1.03\\text{ g}$$ hidroksida",
        },
      ],
    },
  },
};

export default item;
