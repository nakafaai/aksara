import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "analysing",
    contentDomain: "form-4",
    topic: "introduction-to-chemistry",
  },
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "The first heating, $$x=6$$" },
        { correct: true, label: "The last two heatings, $$x=7$$" },
        {
          correct: false,
          label:
            "The last two heatings for the salt and the first heating for the water, $$x=6$$",
        },
        { correct: false, label: "The last two heatings, $$x=14$$" },
      ],
    },
    ms: {
      kind: "choice",
      options: [
        { correct: false, label: "Pemanasan pertama, $$x=6$$" },
        { correct: true, label: "Dua pemanasan terakhir, $$x=7$$" },
        {
          correct: false,
          label:
            "Dua pemanasan terakhir bagi garam dan pemanasan pertama bagi air, $$x=6$$",
        },
        { correct: false, label: "Dua pemanasan terakhir, $$x=14$$" },
      ],
    },
  },
};

export default item;
