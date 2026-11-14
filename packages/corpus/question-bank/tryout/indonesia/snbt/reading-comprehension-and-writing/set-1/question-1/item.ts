import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "insertion",
  },
  stimulus: "lumbung",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "di antara kalimat (2) dan (3)",
        },
        {
          correct: false,
          label: "di antara kalimat (3) dan (4)",
        },
        {
          correct: false,
          label: "di antara kalimat (6) dan (7)",
        },
        {
          correct: true,
          label: "di antara kalimat (7) dan (8)",
        },
        {
          correct: false,
          label: "di antara kalimat (10) dan (11)",
        },
      ],
    },
  },
};

export default item;
