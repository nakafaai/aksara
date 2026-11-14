import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "algebra",
    topic: "matrices",
  },
  stimulus: "feed-mix",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "$$\\text{Rp}3{.}800{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}3{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}4{.}250{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}5{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}5{.}400{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
