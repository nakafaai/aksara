import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "descriptive",
    topic: "comparison",
  },
  stimulus: "tea-terrace",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The tea bushes give shade, while the silver oaks are picked for tea.",
        },
        {
          correct: false,
          label:
            "The tea bushes grow at the top of the estate, while the silver oaks grow only near the factory.",
        },
        {
          correct: false,
          label:
            "The tea bushes are planted at random, while the silver oaks are planted in rows.",
        },
        {
          correct: true,
          label:
            "The tea bushes are kept low, while the silver oaks grow tall and give shade.",
        },
        {
          correct: false,
          label:
            "The tea bushes lose their leaves, while the silver oaks keep theirs all year.",
        },
      ],
    },
  },
};

export default item;
