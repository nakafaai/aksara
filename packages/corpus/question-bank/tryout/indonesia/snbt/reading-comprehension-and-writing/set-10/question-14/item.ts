import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Data di kumpulkan di pusat informasi taman kota dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan dipusat informasi taman kota dan kemudian dibandingkan.",
        },
        {
          correct: false,
          label:
            "Data mengumpulkan di pusat informasi taman kota dan kemudian membandingkan.",
        },
        {
          correct: false,
          label:
            "Data dikumpulkan pada di pusat informasi taman kota lalu di bandingkan.",
        },
        {
          correct: true,
          label:
            "Data dikumpulkan di pusat informasi taman kota dan kemudian dibandingkan.",
        },
      ],
    },
  },
  stimulus: "passage-2",
};

export default item;
