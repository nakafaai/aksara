import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "argument-evaluation",
  },
  stimulus: "hotel-survey",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Only about one guest in seven answered, and the manager's remark suggests that unhappy guests were less likely to answer, so the answers lean towards satisfied guests.",
        },
        {
          correct: false,
          label:
            "Only about one guest in seven answered, so the true figure for all guests must be far below $$92\\%$$.",
        },
        {
          correct: false,
          label:
            "Only about one guest in seven answered, but the manager's remark suggests that unhappy guests complained at the front desk instead, so their views are already counted in the $$92\\%$$.",
        },
        {
          correct: false,
          label:
            "Station's guests answered four times as often as Harbour's, so the $$92\\%$$ is mainly Station's figure and says nothing about Harbour.",
        },
        {
          correct: false,
          label:
            "Harbour's guests rated their stays higher than Station's, so adding the two hotels together pushes the figure up.",
        },
      ],
    },
  },
};

export default item;
