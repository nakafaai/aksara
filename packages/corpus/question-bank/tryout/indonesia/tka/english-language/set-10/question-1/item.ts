import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "main-idea-purpose",
  },
  stimulus: "hill-observatory",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "how a small observatory is laid out and used by its club and visitors",
        },
        { correct: false, label: "how to build a simple telescope at home" },
        {
          correct: false,
          label: "the history of astronomy in the town of Sukaluhur",
        },
        {
          correct: false,
          label: "why the Moon looks different from night to night",
        },
        {
          correct: false,
          label: "one visitor's first night looking through a telescope",
        },
      ],
    },
  },
};

export default item;
