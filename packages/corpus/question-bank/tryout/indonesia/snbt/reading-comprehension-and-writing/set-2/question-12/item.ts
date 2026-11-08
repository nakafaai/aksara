import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "effective-sentence",
  },
  stimulus: "medicine-delivery",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "lagi",
        },
        {
          correct: false,
          label: "relawan",
        },
        {
          correct: false,
          label: "secara",
        },
        {
          correct: false,
          label: "singkat",
        },
        {
          correct: false,
          label: "aturan",
        },
      ],
    },
  },
};

export default item;
