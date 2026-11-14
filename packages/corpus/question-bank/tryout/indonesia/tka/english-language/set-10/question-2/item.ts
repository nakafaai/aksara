import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "hill-observatory",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "so that the roof can turn more easily" },
        {
          correct: false,
          label: "so that visitors cannot touch the telescope",
        },
        {
          correct: true,
          label: "so that footsteps do not shake the telescope",
        },
        {
          correct: false,
          label: "so that the telescope can be carried outside",
        },
        { correct: false, label: "so that the classroom below stays quiet" },
      ],
    },
  },
};

export default item;
