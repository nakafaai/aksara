import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Data dikumpulkan di lokakarya kompos dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data di kumpulkan di lokakarya kompos dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan didepan lokakarya kompos dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data mengumpulkan di lokakarya kompos dan kemudian membandingkan.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan pada di lokakarya kompos lalu di bandingkan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
