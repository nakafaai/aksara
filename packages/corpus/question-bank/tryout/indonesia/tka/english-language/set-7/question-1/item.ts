import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "main-idea-purpose",
  },
  stimulus: "pottery-village",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label: "how to make a water jar on a wheel that is turned by foot",
        },
        { correct: false, label: "why younger potters prefer electric wheels" },
        {
          correct: false,
          label: "the history of the river that runs past the village",
        },
        {
          correct: true,
          label:
            "how a village is organized around making pottery from its red clay",
        },
        { correct: false, label: "a visitor's first attempt to make a pot" },
      ],
    },
  },
};

export default item;
