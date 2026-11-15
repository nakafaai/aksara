import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "explicit-information",
  },
  stimulus: "fire-drill",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$14$$",
        },
        {
          correct: true,
          label: "$$16$$",
        },
        {
          correct: false,
          label: "$$10$$",
        },
        {
          correct: false,
          label: "$$8$$",
        },
        {
          correct: false,
          label: "$$18$$",
        },
      ],
    },
  },
};

export default item;
