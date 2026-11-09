import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "screens-sleep",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Students who used screens the most also tended to fall asleep the latest.",
        },
        {
          correct: false,
          label:
            "Almost every student in the survey owned a smartphone or a laptop.",
        },
        {
          correct: false,
          label:
            "Students who slept less also had lower marks in morning lessons.",
        },
        {
          correct: false,
          label:
            "Students who switched off screens at 9 p.m. reported feeling more rested.",
        },
        {
          correct: true,
          label:
            "In a controlled trial, students who cut evening screens slept no more than others.",
        },
      ],
    },
  },
};

export default item;
