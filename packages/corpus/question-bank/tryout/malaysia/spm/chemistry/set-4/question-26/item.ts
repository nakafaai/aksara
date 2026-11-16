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
          label: "0.0167 mol dm⁻³, and the solution turns from orange to green",
        },
        {
          correct: false,
          label: "0.100 mol dm⁻³, and the solution turns from green to orange",
        },
        {
          correct: true,
          label: "0.100 mol dm⁻³, and the solution turns from orange to green",
        },
        {
          correct: false,
          label: "0.600 mol dm⁻³, and the solution turns from orange to green",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "0.0167 mol dm⁻³, dan larutan bertukar daripada jingga kepada hijau",
        },
        {
          correct: false,
          label:
            "0.100 mol dm⁻³, dan larutan bertukar daripada hijau kepada jingga",
        },
        {
          correct: true,
          label:
            "0.100 mol dm⁻³, dan larutan bertukar daripada jingga kepada hijau",
        },
        {
          correct: false,
          label:
            "0.600 mol dm⁻³, dan larutan bertukar daripada jingga kepada hijau",
        },
      ],
    },
  },
};

export default item;
