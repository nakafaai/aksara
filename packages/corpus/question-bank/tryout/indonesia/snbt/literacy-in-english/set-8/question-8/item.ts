import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "author-reasoning",
  },
  stimulus: "cultivated-meat",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "To show that governments have already answered every question about cost and energy",
        },
        {
          correct: false,
          label:
            "To argue that cultivated meat uses more energy than farming does",
        },
        {
          correct: false,
          label:
            "To suggest that regulators never ask questions about traditional foods",
        },
        {
          correct: false,
          label:
            "To admit that the questions about cultivated meat cannot be answered",
        },
        {
          correct: true,
          label:
            "To point out that a ban stops the research that could settle open questions",
        },
      ],
    },
  },
};

export default item;
