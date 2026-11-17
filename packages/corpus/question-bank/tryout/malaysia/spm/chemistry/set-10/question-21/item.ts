import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$+7$$ to $$+3$$, $$0.0960\\text{ mol dm}^{-3}$$, $$96.0\\%$$",
        },
        {
          correct: true,
          label:
            "$$+6$$ to $$+3$$, $$0.0960\\text{ mol dm}^{-3}$$, $$96.0\\%$$",
        },
        {
          correct: false,
          label:
            "$$+6$$ to $$+3$$, $$0.0160\\text{ mol dm}^{-3}$$, $$16.0\\%$$",
        },
        {
          correct: false,
          label:
            "$$+6$$ to $$+3$$, $$0.0960\\text{ mol dm}^{-3}$$, $$9.60\\%$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$+7$$ kepada $$+3$$, $$0.0960\\text{ mol dm}^{-3}$$, $$96.0\\%$$",
        },
        {
          correct: true,
          label:
            "$$+6$$ kepada $$+3$$, $$0.0960\\text{ mol dm}^{-3}$$, $$96.0\\%$$",
        },
        {
          correct: false,
          label:
            "$$+6$$ kepada $$+3$$, $$0.0160\\text{ mol dm}^{-3}$$, $$16.0\\%$$",
        },
        {
          correct: false,
          label:
            "$$+6$$ kepada $$+3$$, $$0.0960\\text{ mol dm}^{-3}$$, $$9.60\\%$$",
        },
      ],
    },
  },
};

export default item;
