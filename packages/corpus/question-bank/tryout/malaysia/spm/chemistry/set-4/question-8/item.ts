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
          label: "0.016 mol dm⁻³, and the diluted solution has pH 12",
        },
        {
          correct: false,
          label: "0.40 mol dm⁻³, and the diluted solution has pH 13",
        },
        {
          correct: false,
          label: "0.40 mol dm⁻³, and the diluted solution has pH 2",
        },
        {
          correct: true,
          label: "0.40 mol dm⁻³, and the diluted solution has pH 12",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "0.016 mol dm⁻³, dan larutan cair mempunyai pH 12",
        },
        {
          correct: false,
          label: "0.40 mol dm⁻³, dan larutan cair mempunyai pH 13",
        },
        {
          correct: false,
          label: "0.40 mol dm⁻³, dan larutan cair mempunyai pH 2",
        },
        {
          correct: true,
          label: "0.40 mol dm⁻³, dan larutan cair mempunyai pH 12",
        },
      ],
    },
  },
};

export default item;
