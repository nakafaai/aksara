import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "application",
  },
  stimulus: "shipping-container",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Phone makers agree on one charging connector so that any charger works with any phone.",
        },
        {
          correct: false,
          label:
            "A company builds a larger factory to meet rising demand for its products.",
        },
        {
          correct: false,
          label: "A bakery hires more workers before the holiday season.",
        },
        {
          correct: false,
          label:
            "A city adds extra buses to its busiest route during rush hour.",
        },
        {
          correct: false,
          label:
            "A publisher translates a popular novel into several languages.",
        },
      ],
    },
  },
};

export default item;
