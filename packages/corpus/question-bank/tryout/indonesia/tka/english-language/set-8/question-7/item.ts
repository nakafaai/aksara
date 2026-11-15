import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "recount",
    topic: "explicit-information",
  },
  stimulus: "egg-incubator",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "One half",
        },
        {
          correct: false,
          label: "One sixth",
        },
        {
          correct: false,
          label: "Two fifteenths",
        },
        {
          correct: false,
          label: "One fifth",
        },
        {
          correct: true,
          label: "One third",
        },
      ],
    },
  },
};

export default item;
