import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  stimulus: "night-bus",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Naik bus A pukul 21.54 dan tiba di Halte Kampus pukul 22.37",
        },
        {
          correct: false,
          label:
            "Naik bus A pukul 21.54 dan tiba di Halte Kampus pukul 23.07",
        },
        {
          correct: false,
          label:
            "Naik bus A pukul 22.12 dan tiba di Halte Kampus pukul 22.52",
        },
        {
          correct: true,
          label:
            "Naik bus A pukul 22.12 dan tiba di Halte Kampus pukul 23.07",
        },
        {
          correct: false,
          label:
            "Naik bus A pukul 22.48 dan tiba di Halte Kampus pukul 23.37",
        },
      ],
    },
  },
};

export default item;
