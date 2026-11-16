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
          label: "$$+2$$ to $$+2.5$$, $$0.080\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label: "$$+2$$ to $$+2.5$$, $$0.040\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$+4$$ to $$+5$$, $$0.040\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$+2$$ to $$+2.5$$, $$0.020\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$+2$$ kepada $$+2.5$$, $$0.080\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label: "$$+2$$ kepada $$+2.5$$, $$0.040\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$+4$$ kepada $$+5$$, $$0.040\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label: "$$+2$$ kepada $$+2.5$$, $$0.020\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
