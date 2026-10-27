import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$\\text{Rp}67{.}500{.}000{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}69{.}187{.}500{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}69{.}375{.}000{,}00$$",
        },
        {
          correct: true,
          label: "$$\\text{Rp}67{.}687{.}500{,}00$$",
        },
        {
          correct: false,
          label: "$$\\text{Rp}67{.}312{.}500{,}00$$",
        },
      ],
    },
  },
};

export default item;
