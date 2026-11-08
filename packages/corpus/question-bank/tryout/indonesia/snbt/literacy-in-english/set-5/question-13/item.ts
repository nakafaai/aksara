import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "screens-sleep",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Using screens after 8 p.m. is the main cause of sleepiness in morning lessons.",
        },
        {
          correct: false,
          label:
            "Students who sleep less use screens because they find it hard to fall asleep.",
        },
        {
          correct: false,
          label:
            "Switching off screens at 9 p.m. would give every student eight hours of sleep.",
        },
        {
          correct: true,
          label:
            "More evening screen time goes with less sleep, but the survey cannot show why.",
        },
        {
          correct: false,
          label:
            "Evening screen time probably has no connection with how long students sleep.",
        },
      ],
    },
  },
};

export default item;
