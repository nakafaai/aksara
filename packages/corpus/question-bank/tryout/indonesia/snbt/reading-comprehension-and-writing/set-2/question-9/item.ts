import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "writing",
    topic: "insertion",
  },
  stimulus: "jelantah",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "di antara kalimat (7) dan kalimat (8)",
        },
        {
          correct: false,
          label: "di antara kalimat (8) dan kalimat (9)",
        },
        {
          correct: false,
          label: "di antara kalimat (9) dan kalimat (10)",
        },
        {
          correct: false,
          label: "di antara kalimat (10) dan kalimat (11)",
        },
        {
          correct: false,
          label: "di antara kalimat (11) dan kalimat (12)",
        },
      ],
    },
  },
};

export default item;
