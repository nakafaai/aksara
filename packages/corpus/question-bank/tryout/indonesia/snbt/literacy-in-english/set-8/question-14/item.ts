import type { ItemSource } from "#corpus/question-bank/item";

const item: ItemSource = {
  blueprint: {
    cognitiveLevel: "inferential",
    contentDomain: "informational-text",
    topic: "data-interpretation",
  },
  stimulus: "hotel-survey",
  versions: {
    en: {
      kind: "choice",
      options: [
        {
          correct: true,
          label:
            "Station's guests were four times as likely as Harbour's guests to answer the survey.",
        },
        {
          correct: true,
          label: "The $$92\\%$$ is a share of answers, not a share of guests.",
        },
        {
          correct: false,
          label:
            "Harbour's result rests on more answers than Station's result.",
        },
        {
          correct: true,
          label:
            "If every guest who did not answer had been unhappy, about $$13\\%$$ of guests would have rated their stay good or excellent.",
        },
        {
          correct: false,
          label: "Station had fewer guests than Harbour last year.",
        },
      ],
    },
  },
};

export default item;
