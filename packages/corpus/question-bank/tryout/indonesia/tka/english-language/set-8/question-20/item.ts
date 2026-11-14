import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "procedure",
    topic: "text-fit",
  },
  stimulus: "fried-rice",
  versions: {
    en: {
      kind: "choice",
      options: [
        { correct: false, label: "Cook a fresh pot of rice in a rice cooker." },
        { correct: false, label: "Serve the eggs on a separate plate." },
        {
          correct: true,
          label: "Scramble the eggs together with the garlic and shallots.",
        },
        { correct: false, label: "Add the cucumber slices to the wok." },
        { correct: false, label: "Rinse the wok with cold water." },
      ],
    },
  },
};

export default item;
