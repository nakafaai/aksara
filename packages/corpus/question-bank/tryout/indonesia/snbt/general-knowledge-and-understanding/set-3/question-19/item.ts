import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "reasoning",
    contentDomain: "paragraph-meaning",
    topic: "application",
  },
  stimulus: "lebah",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Melon",
        },
        {
          correct: false,
          label: "Kopi",
        },
        {
          correct: false,
          label: "Apel",
        },
        {
          correct: true,
          label: "Jagung",
        },
        {
          correct: false,
          label: "Semangka",
        },
      ],
    },
  },
};

export default item;
