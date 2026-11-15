import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "recount",
    topic: "text-fit",
  },
  stimulus: "egg-incubator",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "I read the chart quickly and copied only the numbers into my notebook.",
        },
        {
          correct: false,
          label: 'I wrote "Monday: day 0" on the first line of my record.',
        },
        {
          correct: true,
          label:
            "I meant to read the chart again properly later, but I never did.",
        },
        {
          correct: false,
          label:
            "Bu Ratna checked my record every morning and corrected the day numbers.",
        },
        {
          correct: false,
          label:
            "All fifteen eggs were still developing at the first candling.",
        },
      ],
    },
  },
};

export default item;
