import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "explicit-information",
  },
  stimulus: "bridge-count",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$220$$",
        },
        {
          correct: false,
          label: "$$330$$",
        },
        {
          correct: false,
          label: "$$1{,}500$$",
        },
        {
          correct: true,
          label: "$$860$$",
        },
        {
          correct: false,
          label: "$$530$$",
        },
      ],
    },
  },
};

export default item;
