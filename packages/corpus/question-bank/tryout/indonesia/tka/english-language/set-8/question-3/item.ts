import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "classification",
  },
  stimulus: "train-station",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: true, label: "lanterns once used to signal to drivers" },
        { correct: false, label: "wooden benches from the waiting room" },
        { correct: false, label: "the ticket window with brass bars" },
        { correct: true, label: "conductors' caps" },
      ],
    },
  },
};

export default item;
