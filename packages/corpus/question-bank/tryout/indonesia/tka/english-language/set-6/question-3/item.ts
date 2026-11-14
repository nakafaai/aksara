import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "tea-terrace",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "the shallow ditches along each terrace" },
        { correct: false, label: "the narrow paths between the rows" },
        { correct: true, label: "the fallen leaves of the silver oak trees" },
        { correct: false, label: "the rows of windows in the factory" },
      ],
    },
  },
};

export default item;
