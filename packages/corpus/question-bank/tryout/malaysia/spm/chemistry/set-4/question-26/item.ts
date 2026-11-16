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
          label: "$$16.7\\%$$, and the dichromate turns from orange to green",
        },
        {
          correct: false,
          label: "$$11.1\\%$$, and the dichromate turns from orange to green",
        },
        {
          correct: true,
          label: "$$66.7\\%$$, and the dichromate turns from orange to green",
        },
        {
          correct: false,
          label: "$$33.4\\%$$, and the dichromate turns from green to orange",
        },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "$$16.7\\%$$, dan dikromat bertukar daripada jingga kepada hijau",
        },
        {
          correct: false,
          label:
            "$$11.1\\%$$, dan dikromat bertukar daripada jingga kepada hijau",
        },
        {
          correct: true,
          label:
            "$$66.7\\%$$, dan dikromat bertukar daripada jingga kepada hijau",
        },
        {
          correct: false,
          label:
            "$$33.4\\%$$, dan dikromat bertukar daripada hijau kepada jingga",
        },
      ],
    },
  },
};

export default item;
