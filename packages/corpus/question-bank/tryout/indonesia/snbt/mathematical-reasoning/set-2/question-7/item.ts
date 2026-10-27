import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}24{.}750{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}25{.}000{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}26{.}250{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}28{.}000{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}32{.}750{.}000{,}00$$",
        },
      ],
    },
  },
};

export default item;
