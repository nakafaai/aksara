import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Data di kumpulkan di lingkungan warga dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan dilingkungan warga dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data mengumpulkan di lingkungan warga dan kemudian membandingkan.",
        },
        {
          correct: true,
          label:
            "Data dikumpulkan di lingkungan warga dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan pada di lingkungan warga lalu di bandingkan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
