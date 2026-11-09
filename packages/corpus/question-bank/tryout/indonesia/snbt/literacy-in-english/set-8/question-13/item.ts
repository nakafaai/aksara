import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "scooter-pilot",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The city did not record how many trips riders made after month 2.",
        },
        {
          correct: false,
          label:
            "The scooters' top speed limit was raised rather than lowered at the start of month 3.",
        },
        {
          correct: true,
          label:
            "Riders' growing experience could also explain the falling injury rate.",
        },
        {
          correct: false,
          label:
            "The pilot ended before any injuries had been reported at all.",
        },
        {
          correct: false,
          label:
            "Average trip length is the only figure the operator measured.",
        },
      ],
    },
  },
};

export default item;
