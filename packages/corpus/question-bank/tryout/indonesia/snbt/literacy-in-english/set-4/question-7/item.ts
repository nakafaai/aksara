import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "visitor-fee",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Most visitors do not know that the fee exists until after they arrive.",
        },
        {
          correct: true,
          label:
            "A fee most visitors accept deters few, while a higher one excludes poorer people.",
        },
        {
          correct: false,
          label:
            "Fees are usually collected only from residents, not from day visitors.",
        },
        {
          correct: false,
          label:
            "Visitors can easily avoid paying by arriving late in the evening instead.",
        },
        {
          correct: false,
          label:
            "The fee money is spent on souvenirs rather than on managing the crowds.",
        },
      ],
    },
  },
};

export default item;
