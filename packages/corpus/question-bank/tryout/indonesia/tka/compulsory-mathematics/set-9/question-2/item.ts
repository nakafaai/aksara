import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "numbers",
    topic: "real-numbers",
  },
  stimulus: "obat",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "06.00",
        },
        {
          correct: false,
          label: "09.00",
        },
        {
          correct: false,
          label: "12.00",
        },
        {
          correct: true,
          label: "15.00",
        },
        {
          correct: false,
          label: "18.00",
        },
      ],
    },
  },
};

export default item;
