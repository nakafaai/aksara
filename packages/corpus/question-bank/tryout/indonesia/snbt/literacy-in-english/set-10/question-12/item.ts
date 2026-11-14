import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "conclusion",
  },
  stimulus: "subscription-churn",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "The price rise caused most of the extra cancellations in July to September.",
        },
        {
          correct: true,
          label:
            "Some $$90$$ thousand of the subscribers counted at the end of September had not yet paid anything.",
        },
        {
          correct: false,
          label:
            "Most of the people who took the free trial in July to September had cancelled by the end of December.",
        },
        {
          correct: true,
          label:
            "The chief executive's figure of $$100{,}000$$ counts people on a free trial as well as paying customers.",
        },
        {
          correct: false,
          label:
            "Without the free trial, Lumen would have lost subscribers in July to September.",
        },
      ],
    },
  },
};

export default item;
