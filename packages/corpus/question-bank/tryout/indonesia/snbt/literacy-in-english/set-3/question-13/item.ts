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
            "Health was not given as a reason by any group of respondents.",
        },
        {
          correct: false,
          label:
            "Older respondents were more likely to eat less meat than younger ones.",
        },
        {
          correct: false,
          label:
            "The survey included too few people to say anything about health.",
        },
        {
          correct: false,
          label:
            "Environmental concern was the main reason for most respondents.",
        },
        {
          correct: true,
          label:
            "The group most likely to cut meat cited cost, and prices rose that year.",
        },
      ],
    },
  },
};

export default item;
