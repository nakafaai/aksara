import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Data di kumpulkan di stasiun dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label: "Data dikumpulkan distasiun dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label: "Data mengumpulkan di stasiun dan kemudian membandingkan.",
        },
        {
          correct: false,
          label: "Data dikumpulkan pada di stasiun lalu di bandingkan.",
        },
        {
          correct: true,
          label: "Data dikumpulkan di stasiun dan kemudian dibandingkan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
