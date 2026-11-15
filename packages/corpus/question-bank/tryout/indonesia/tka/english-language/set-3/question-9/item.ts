import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "recount",
    topic: "sequence",
  },
  stimulus: "relay-ride",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label: "Rina's chain came off.",
        },
        {
          correct: false,
          label: "Bagas stopped to wave a cat off the road.",
        },
        {
          correct: true,
          label: "The narrator put a foot down at the corner by the fountain.",
        },
        {
          correct: false,
          label: "Yusuf rode his seventh lap.",
        },
        {
          correct: true,
          label: "Dimas began the lap that did not count.",
        },
      ],
    },
  },
};

export default item;
