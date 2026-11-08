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
            "The number of books borrowed during evening hours in the pilot",
        },
        {
          correct: false,
          label:
            "The opinions of evening visitors about the library's opening hours",
        },
        {
          correct: true,
          label:
            "The average number of daytime visitors per weekday in June to August of the previous year, when the library closed at 6 p.m.",
        },
        {
          correct: false,
          label: "The total cost of running the library for the whole year",
        },
        {
          correct: false,
          label: "The number of residents who work until five or six",
        },
      ],
    },
  },
};

export default item;
