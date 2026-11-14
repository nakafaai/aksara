import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "stilt-house",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "sleeping mats" },
        { correct: true, label: "the grandmother's loom" },
        { correct: false, label: "the kitchen" },
        { correct: true, label: "a pair of bicycles" },
      ],
    },
  },
};

export default item;
