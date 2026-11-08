import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "hydroponic-farm",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\text{Rp}7{.}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\text{Rp}8{.}000{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\text{Rp}9{.}600{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\text{Rp}11{.}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\text{Rp}12{.}000{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
