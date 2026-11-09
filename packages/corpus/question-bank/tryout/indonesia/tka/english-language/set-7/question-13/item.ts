import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "narrative",
    topic: "prediction",
  },
  stimulus: "missing-key",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "refuse to ask Dito for any help ever again" },
        { correct: true, label: "take Dito's suggestions more seriously" },
        { correct: false, label: "stop riding her bicycle to school" },
        { correct: false, label: "keep all her keys in the fridge on purpose" },
        { correct: false, label: "hide Dito's things to get back at him" },
      ],
    },
  },
};

export default item;
