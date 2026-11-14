import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "pottery-village",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "They crack." },
        { correct: false, label: "They turn a deep reddish brown." },
        { correct: false, label: "They become too hard to shape." },
        { correct: false, label: "They collapse on the wheel." },
        { correct: false, label: "They dent more easily." },
      ],
    },
  },
};

export default item;
