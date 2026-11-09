import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "To advertise employment opportunities at UNESCO.",
        },
        {
          correct: false,
          label: "To argue that culture is UNESCO's only field of work.",
        },
        {
          correct: true,
          label:
            "To explain why UNESCO was created and how its mission guides its current work.",
        },
        {
          correct: false,
          label: "To compare UNESCO with every other United Nations agency.",
        },
        {
          correct: false,
          label: "To criticize Member States for refusing all cooperation.",
        },
      ],
    },
  },
};

export default item;
