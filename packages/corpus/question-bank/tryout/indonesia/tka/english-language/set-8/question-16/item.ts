import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "procedure",
    topic: "explicit-information",
  },
  stimulus: "rain-gauge",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "$$54$$",
        },
        {
          correct: false,
          label: "$$9$$",
        },
        {
          correct: true,
          label: "$$81$$",
        },
        {
          correct: false,
          label: "$$324$$",
        },
        {
          correct: false,
          label: "$$48$$",
        },
      ],
    },
  },
};

export default item;
