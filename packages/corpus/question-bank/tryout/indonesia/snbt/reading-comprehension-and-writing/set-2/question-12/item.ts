import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "setelah kalimat $$4$$.",
        },
        {
          correct: false,
          label: "sebelum kalimat $$1$$.",
        },
        {
          correct: false,
          label: "setelah kalimat $$1$$.",
        },
        {
          correct: false,
          label: "setelah kalimat $$2$$.",
        },
        {
          correct: false,
          label: "setelah kalimat $$3$$.",
        },
      ],
    },
  },
};

export default item;
