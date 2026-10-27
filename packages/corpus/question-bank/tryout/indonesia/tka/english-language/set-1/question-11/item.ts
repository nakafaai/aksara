import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "textual",
    contentDomain: "narrative",
    topic: "explicit-information",
  },
  stimulus: "weather-notebook",
  versions: {
    en: {
      columns: ["Before it was found", "After it was found"],
      kind: "matrix",
      statements: [
        {
          column: 1,
          label: "Mina blamed Arif.",
        },
        {
          column: 2,
          label: "The pages were placed between clean sheets.",
        },
        {
          column: 2,
          label: "A shared digital copy was created.",
        },
      ],
    },
  },
};

export default item;
