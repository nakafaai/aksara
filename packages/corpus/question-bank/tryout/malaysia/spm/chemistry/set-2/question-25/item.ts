import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "applying",
    contentDomain: "form-5",
    topic: "redox-equilibrium",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "The copper electrode gains $$0.96\\text{ g}$$, and the zinc ions reach $$0.40\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "The copper electrode gains $$0.96\\text{ g}$$, and the zinc ions reach $$0.30\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "The copper electrode gains $$1.92\\text{ g}$$, and the zinc ions reach $$0.70\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "The copper electrode gains $$0.96\\text{ g}$$, and the zinc ions stay at $$0.10\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Elektrod kuprum bertambah $$0.96\\text{ g}$$, dan ion zink mencapai $$0.40\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Elektrod kuprum bertambah $$0.96\\text{ g}$$, dan ion zink mencapai $$0.30\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Elektrod kuprum bertambah $$1.92\\text{ g}$$, dan ion zink mencapai $$0.70\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Elektrod kuprum bertambah $$0.96\\text{ g}$$, dan ion zink kekal $$0.10\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
