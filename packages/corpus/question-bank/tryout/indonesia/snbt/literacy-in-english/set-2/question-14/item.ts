import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "library-hours",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The number of books borrowed during evening hours throughout the pilot",
        },
        {
          correct: false,
          label:
            "The opinions of evening visitors about the library's opening hours",
        },
        {
          correct: true,
          label:
            "Daytime visits last June to August, when the library still closed at 6 p.m.",
        },
        {
          correct: false,
          label:
            "The total cost of running the library for the whole of the previous year",
        },
        {
          correct: false,
          label:
            "The number of residents who work until five or six on weekdays",
        },
      ],
    },
  },
};

export default item;
