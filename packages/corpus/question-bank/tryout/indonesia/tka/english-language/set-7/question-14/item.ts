import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "explicit-information",
  },
  stimulus: "missing-key",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "She searched her desk drawer." },
        { correct: false, label: "She checked the fridge." },
        { correct: true, label: "She set two alarms." },
        {
          correct: true,
          label: "She asked her father to drive her in the morning.",
        },
      ],
    },
  },
};

export default item;
