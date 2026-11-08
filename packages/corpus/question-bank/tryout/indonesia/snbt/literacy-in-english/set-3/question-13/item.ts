import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "meat-survey",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Health was not given as a main reason by any of the age groups surveyed.",
        },
        {
          correct: false,
          label:
            "Older respondents were more likely to eat less meat than younger ones.",
        },
        {
          correct: false,
          label:
            "The survey included too few people to say anything reliable about health.",
        },
        {
          correct: false,
          label:
            "Environmental concern was the main reason given by most respondents who cut meat.",
        },
        {
          correct: true,
          label:
            "The group with the highest rate of cutting meat named cost, as prices rose.",
        },
      ],
    },
  },
};

export default item;
