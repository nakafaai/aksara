import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "outline",
  },
  stimulus: "missing-key",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "Sari searches her bag and every pocket of her jacket.",
        },
        { correct: false, label: "Dito asks whether Sari checked the fridge." },
        {
          correct: false,
          label: "Sari asks her father to drive her to school.",
        },
        {
          correct: false,
          label: "Sari sets two alarms and goes to bed angry.",
        },
        {
          correct: true,
          label:
            "Sari finds the key next to the eggs and rides her bicycle to school after all.",
        },
      ],
    },
  },
};

export default item;
