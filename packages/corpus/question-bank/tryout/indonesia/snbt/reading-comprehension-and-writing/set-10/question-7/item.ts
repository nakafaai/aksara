import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "application",
    contentDomain: "writing",
    topic: "punctuation",
  },
  stimulus: "screen-printing",
  versions: {
    id: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Sablon dengan cat berbahan air, lebih mahal tetapi hasilnya tidak berbau dan aman bagi kulit.",
        },
        {
          correct: false,
          label:
            "Sablon dengan cat berbahan air lebih mahal tetapi, hasilnya tidak berbau dan aman bagi kulit.",
        },
        {
          correct: false,
          label:
            "Sablon dengan cat berbahan air lebih mahal, tetapi, hasilnya tidak berbau dan aman bagi kulit.",
        },
        {
          correct: false,
          label:
            "Sablon dengan cat berbahan air lebih mahal tetapi hasilnya tidak berbau, dan aman bagi kulit.",
        },
        {
          correct: true,
          label:
            "Sablon dengan cat berbahan air lebih mahal, tetapi hasilnya tidak berbau dan aman bagi kulit.",
        },
      ],
    },
  },
};

export default item;
