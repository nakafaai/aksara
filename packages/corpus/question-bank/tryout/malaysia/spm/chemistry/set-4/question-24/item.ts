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
            "The zinc electrode loses $$0.65\\text{ g}$$, the copper electrode gains $$0.64\\text{ g}$$, and the copper(II) ions fall to $$0.49\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "The zinc electrode loses $$0.65\\text{ g}$$, the copper electrode gains $$0.64\\text{ g}$$, and the copper(II) ions stay at $$0.50\\text{ mol dm}^{-3}$$ because the salt bridge replaces them",
        },
        {
          correct: false,
          label:
            "The copper electrode loses $$0.64\\text{ g}$$, the zinc electrode gains $$0.65\\text{ g}$$, and the copper(II) ions rise to $$0.60\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "The zinc electrode loses $$0.65\\text{ g}$$, the copper electrode gains $$0.64\\text{ g}$$, and the copper(II) ions fall to $$0.40\\text{ mol dm}^{-3}$$",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Elektrod zink kehilangan $$0.65\\text{ g}$$, elektrod kuprum bertambah $$0.64\\text{ g}$$, dan ion kuprum(II) berkurang kepada $$0.49\\text{ mol dm}^{-3}$$",
        },
        {
          correct: false,
          label:
            "Elektrod zink kehilangan $$0.65\\text{ g}$$, elektrod kuprum bertambah $$0.64\\text{ g}$$, dan ion kuprum(II) kekal $$0.50\\text{ mol dm}^{-3}$$ kerana titian garam menggantikannya",
        },
        {
          correct: false,
          label:
            "Elektrod kuprum kehilangan $$0.64\\text{ g}$$, elektrod zink bertambah $$0.65\\text{ g}$$, dan ion kuprum(II) bertambah kepada $$0.60\\text{ mol dm}^{-3}$$",
        },
        {
          correct: true,
          label:
            "Elektrod zink kehilangan $$0.65\\text{ g}$$, elektrod kuprum bertambah $$0.64\\text{ g}$$, dan ion kuprum(II) berkurang kepada $$0.40\\text{ mol dm}^{-3}$$",
        },
      ],
    },
  },
};

export default item;
