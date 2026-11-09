import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "To prove that private offices are perfect for every task",
        },
        {
          correct: false,
          label: "To advertise wearable sensors to office managers",
        },
        {
          correct: false,
          label: "To show that electronic communication should be banned",
        },
        {
          correct: true,
          label:
            "To challenge a one-size-fits-all assumption and support context-based decisions",
        },
        {
          correct: false,
          label: "To argue that workplace evidence is unnecessary",
        },
      ],
    },
  },
};

export default item;
