import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "spelling",
  },
  stimulus: "medicine-delivery",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "mengambil",
        },
        {
          correct: true,
          label: "apotik",
        },
        {
          correct: false,
          label: "mengantarkannya",
        },
        {
          correct: false,
          label: "puskesmas",
        },
        {
          correct: false,
          label: "sama",
        },
      ],
    },
  },
};

export default item;
