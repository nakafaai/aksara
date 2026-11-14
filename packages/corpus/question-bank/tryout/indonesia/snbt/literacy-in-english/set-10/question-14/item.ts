import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "evaluation-appreciation",
    contentDomain: "informational-text",
    topic: "research-design",
  },
  stimulus: "subscription-churn",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: false,
          label:
            "Lumen's total revenue in July to September compared with its revenue in April to June",
        },
        {
          correct: false,
          label:
            "The number of July to September sign-ups who joined through the company's advertising",
        },
        {
          correct: false,
          label:
            "The churn rates of rival streaming services that did not raise their prices in July",
        },
        {
          correct: true,
          label:
            "How many of the July to September cancellations came from trial accounts and how many from subscribers who had paid before July",
        },
        {
          correct: false,
          label:
            "The number of subscribers who were still on a free trial at the end of December",
        },
      ],
    },
  },
};

export default item;
