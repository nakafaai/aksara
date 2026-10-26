import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Data dikumpulkan di ruang latihan musik dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data di kumpulkan di ruang latihan musik dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan diruang latihan musik dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data mengumpulkan di ruang latihan musik dan kemudian membandingkan.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan pada di ruang latihan musik lalu di bandingkan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
