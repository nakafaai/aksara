import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "railway-time",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Practical needs led companies to agree on a standard before the law did.",
        },
        {
          correct: false,
          label:
            "Governments invented standard time and then forced railways to accept it.",
        },
        {
          correct: false,
          label:
            "Local time was abolished as soon as the first railway timetable appeared.",
        },
        {
          correct: false,
          label:
            "Standard time spread from the United States to Britain after 1883.",
        },
        {
          correct: false,
          label:
            "Private companies might always choose better standards than governments do.",
        },
      ],
    },
  },
};

export default item;
