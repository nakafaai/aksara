import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "descriptive",
    topic: "explicit-information",
  },
  stimulus: "tea-terrace",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "so that the silver oak trees can grow taller",
        },
        {
          correct: false,
          label: "so that visitors can see the valley from the café",
        },
        { correct: true, label: "so that pickers can reach the top leaves" },
        {
          correct: false,
          label: "so that rainwater can flow into the ditches",
        },
        { correct: false, label: "so that the leaves dry faster on the racks" },
      ],
    },
  },
};

export default item;
