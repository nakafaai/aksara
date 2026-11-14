import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "quantitative-reasoning",
    topic: "calendar-cycle",
  },
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Selasa Pon",
        },
        {
          correct: true,
          label: "Selasa Legi",
        },
        {
          correct: false,
          label: "Rabu Pahing",
        },
        {
          correct: false,
          label: "Kamis Pon",
        },
        {
          correct: false,
          label: "Senin Kliwon",
        },
      ],
    },
  },
};

export default item;
