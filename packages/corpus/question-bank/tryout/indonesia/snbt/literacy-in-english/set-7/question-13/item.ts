import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "museum-visits",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The art museum's visitors were mostly school groups, who stayed longer.",
        },
        {
          correct: true,
          label:
            "Some of the rise may come from people who would otherwise have gone there.",
        },
        {
          correct: false,
          label:
            "It proves that the new gallery attracted no new visitors to the city museum.",
        },
        {
          correct: false,
          label:
            "It means that the second period was shorter than the first period.",
        },
        {
          correct: false,
          label:
            "It suggests that the new gallery might have been built too quickly.",
        },
      ],
    },
  },
};

export default item;
