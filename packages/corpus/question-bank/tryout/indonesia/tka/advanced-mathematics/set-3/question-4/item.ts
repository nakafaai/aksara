import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "assembly-workshop",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}1{.}300{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}1{.}400{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}200{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}600{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}1{.}000{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
