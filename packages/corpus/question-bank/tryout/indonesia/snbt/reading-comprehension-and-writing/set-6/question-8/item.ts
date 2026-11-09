import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "punctuation",
  },
  stimulus: "larva-compost",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Larva yang sudah besar dijual kepada peternak ikan ayam, dan bebek sebagai pakan.",
        },
        {
          correct: false,
          label:
            "Larva yang sudah besar, dijual kepada peternak ikan, ayam, dan bebek sebagai pakan.",
        },
        {
          correct: false,
          label:
            "Larva yang sudah besar dijual kepada peternak: ikan, ayam, dan bebek sebagai pakan.",
        },
        {
          correct: false,
          label:
            "Larva yang sudah besar dijual kepada peternak ikan, ayam dan, bebek sebagai pakan.",
        },
        {
          correct: true,
          label:
            "Larva yang sudah besar dijual kepada peternak ikan, ayam, dan bebek sebagai pakan.",
        },
      ],
    },
  },
};

export default item;
